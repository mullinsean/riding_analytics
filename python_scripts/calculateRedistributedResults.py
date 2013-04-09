from os import path
import pprint
import json
import csv
import sys
import math
   

def loadPollMappings( path ):

  pollMappings = {}

  matrixFileName = path + 'redistributedPollMapping.json'
  
  with open( matrixFileName, 'r') as f:
    pollMappings = json.load(f)
      
  f.close()
  
  return pollMappings
  
def loadPollResults( path ):

  pollResults = {}
  
  for i in range( 1, 108 ):
    ridingFileName = path + 'Ont2011_' + str( i ) + '.json'
    
    print "Riding", i
    
    with open( ridingFileName, 'r') as f:
      riding = json.load(f, encoding="latin-1")
  
    f.close()
  
    pollResults.update( { i : riding['polls'] } ) 
  
  return pollResults
  
def addVotes( poll, ridingResults ):

  if 'candidates' not in poll:
    return 
    
  for vote in poll['candidates'] :
    if vote['party'] not in ridingResults :
      ridingResults.update( { vote['party'] : 0 } )
    ridingResults[vote['party']] += vote['votes']
    
def checkInPollMapping( ridingID, pollID, pollMappingList ):

  if ridingID < 1 or ridingID > 107:
    return False
    
  if str(pollID) not in pollMappingList[str(ridingID)] :
    return False
    
  if pollMappingList[str(ridingID)][str(pollID)] == 0 :
    return False
    
  return True
  
def sumPoll( poll ):
  
  total = 0
  
  pollVotes = {}
  addVotes( poll, pollVotes )
  
  for i in pollVotes.keys():
    total += pollVotes[i]

  return total

def calculateRedistributedResults( pollResults, pollMappingList ):

  redistributedResults = {} 
  
  for i in range( 1, 122 ):
    redistributedResults.update( { i : {} } )
    
  ridingAllocations = {}
  advanceVotes = {}
  totalAdvanceVotes = {}
  
  for i in range( 1, 108 ):   
  
    ridingAllocations.update( { i : {} })
    advanceVotes.update( { i : {} } )
    totalAdvanceVotes.update( { i : 0 } )
  
    print "Riding", i
  
    for j in pollResults[i].keys():
      if checkInPollMapping( i, j, pollMappingList ):
        addVotes( pollResults[i][j], redistributedResults[pollMappingList[str(i)][str(j)]] )
        if pollMappingList[str(i)][str(j)] not in ridingAllocations[i] :
          ridingAllocations[i].update( { pollMappingList[str(i)][str(j)] : 0 } )
        ridingAllocations[i][pollMappingList[str(i)][str(j)]] += sumPoll( pollResults[i][j] )
      elif j[:3] == "ADV" :
        addVotes( pollResults[i][j], advanceVotes[i] )

    for j in advanceVotes[i].keys() :
      totalAdvanceVotes[i] += advanceVotes[i][j]
      
  # Now, calculate % of votes to each redistributed riding and allocate share of advance votes accordingly
  
  for i in range( 1, 108 ):
    totalVotes = 0
    
    for j in ridingAllocations[i].keys():
      totalVotes += ridingAllocations[i][j]
      
    for j in ridingAllocations[i].keys():
      ridingAllocations[i][j] = float( ridingAllocations[i][j] ) / float ( totalVotes )
      
      for party in redistributedResults[j].keys():
        if party in advanceVotes[i]:
          redistributedResults[j][party] += int( float( advanceVotes[i][party] ) * ridingAllocations[i][j] )
        
  return redistributedResults
  
def outputResults( path, redistributedResults ):

  ridingNames = {}

  fileName = path + 'redistribution/ridingNames.json'
  
  with open( fileName, 'r') as f:
    ridingNames = json.load(f)
      
  f.close()
  
  outputList = []
  
  headings = set()
  headings.add('Riding')
  
 
  for i in redistributedResults:
    tempDict = {}
    tempDict.update( { "Riding" : ridingNames[i-1][1] } )
    tempDict.update( redistributedResults[i] )
    outputList.append( tempDict.copy())
    for j in redistributedResults[i].keys():
      headings.add( j )
    
  fieldnames = headings
  
  test_file = open('test2.csv','wb')
  
  csvwriter = csv.DictWriter(test_file, delimiter=',', fieldnames=fieldnames)
  
  csvwriter.writerow(dict((fn,fn) for fn in fieldnames))
  
  for row in outputList:
    csvwriter.writerow(row)
  test_file.close()
  


# TO FIX:

  # - Poll being mapped to riding 0 (eg: Riding 30, Poll 290 --> 0 )
  # - Polls with maps but no results (eg: Riding 25, Poll 706 )
  # - How to apportion advanced poll results  (DONE)
  
 


###### 
#
#  Main
    
    
rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2011/"

path = rootPath + dataPath

print "Loading redistribution poll mappings..."

pollMappingList = loadPollMappings( path )

print "Loading 2011 poll results"

pollResults = loadPollResults( path )

print "Recalculating results..."

redistributedResults = calculateRedistributedResults( pollResults, pollMappingList )

print "Outputting results..."

outputResults( path, redistributedResults )





