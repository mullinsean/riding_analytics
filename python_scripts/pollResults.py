from os import path
from operator import itemgetter
from pprint import pprint
import json
import csv
import pickle


def csvToDict( csvData ):
  hD = []
  
  headerRow = csvData[0]
  
  for i in range(0, len(headerRow)):
    hD.append( headerRow[i] )
    
  dict = []

   
  for n in range( 1, len( csvData )):
    line = csvData[n]   
    entry = {}
    
    if( line[5][:3] == "..." ) :
      entry['noPoll'] = True
      entry['noPollMessage'] = line[5]
      entry['POLL_NUMBER'] = line[2]
      dict.append( entry.copy() )
      print "Poll number", line[2], "was not held."
    elif line[0][:5] != "TOTAL" :
      entry['noPoll'] = False
      entry['noPollMessage'] = ""
      
      for i in range( 0, len( line )):
        entry[hD[i]] = line[i]
      dict.append( entry.copy() )
    
  return dict


def parseHeader( header ):
  # Dump all the column headings into a list
  
  hD = []
  
  for i in range(0, len(header)):
    hD.append( header[i] )
    
  return hD
    
    
    
def parseLine( line, headerData ):
  
  # First, check to see if we have a valid poll
  #
  # - If it starts with "..." we don't.
  # - Also, if it starts with "TOTALS:" we have arrived at the end.
  
  pD = {}
  
  if( line[5][:3] == "...") :
    return pD
    
  for i in range( 0, len( line )):
    pD[headerData[i]] = line[i]
    
  return pD
  
def parsePollData( poll, pollRecord, candidates, addToRecord=False, noPollData=False ) :
   
    if( noPollData == True ):
      pollRecord['noPoll'] = True
      pollRecord['noPollMessage'] = poll['noPollMessage']
      return pollRecord
   
    if( addToRecord == True):    
      addRecord = pollRecord
      pollRecord["rejected"] = int( poll['REJECTED']) + addRecord['rejected'] 
      pollRecord["unmarked"] = int( poll['UNMARKED']) + addRecord['unmarked']
      pollRecord["declined"] = int( poll['DECLINED']) + addRecord['declined']
      pollRecord["validVotes"] = int( poll['VOTER_TURNOUT']) + addRecord['validVotes']
      pollRecord["electors"] = int( poll['ELECTORS']) + addRecord['electors']

      for c in candidates:
        pollRecord['results'][c]['votes'] = int( poll[candidates[c]]) + addRecord['results'][c]['votes']      
      
        if( pollRecord['validVotes'] == 0 ):
          pollRecord['results'][c]["percentage"] = 0.0
        else :
          pollRecord['results'][c]["percentage"] = round( float(pollRecord['results'][c]['votes']) * 100 / float(pollRecord['validVotes']), 2)      
          
        
    else :    
      pollRecord.update( { "noPoll" : poll['noPoll'] }) 
      pollRecord.update( { "noPollMessage" : poll['noPollMessage'] })      
   
      pollRecord.update( { "rural" : poll['RURAL_INDICATOR'] })
      pollRecord.update( { "placeName" : poll['PLACE_NAME'] })
      pollRecord.update( { "pollLocation" : poll['POLL_LOCATION'] })  
  
      # Flag for advance polls  
      pollRecord.update( { "advancePoll" : poll['POLL_NUMBER'][:3] == "ADV" })
      
      pollRecord.update( { "rejected" : int( poll['REJECTED'])})
      pollRecord.update( { "unmarked" : int( poll['UNMARKED'])})
      pollRecord.update( { "declined" : int( poll['DECLINED'])})
      pollRecord.update( { "validVotes" : int( poll['VOTER_TURNOUT'])})
      pollRecord.update( { "electors" : int( poll['ELECTORS'])})    
    
      pollRecord.update( { "results" : {}} )
      
      pollRecord.update( { "candidates" : [] })
      
      for c in candidates:
        if( pollRecord['validVotes'] == 0 ):
          pctVote = 0.0
        else :
          pctVote = round( float(poll[candidates[c]]) * 100 / float(pollRecord['validVotes']), 2)
        
        pollRecord['results'].update( { c : { "votes" : int( poll[candidates[c]]), "percentage" : pctVote }} )
      
        
    return pollRecord
  
def calculatePollData( poll, candidates ) :

  if( poll['noPoll'] == True ):
    return poll

  poll.update( { "candidates" : [] })

  for c in candidates:
    if( poll['validVotes'] == 0 ):
      pctVote = 0.0
    else :
      pctVote = round( float(poll['results'][c]['votes']) * 100 / float(poll['validVotes']), 2)
        
    poll['candidates'].append( { "party" : c, "votes" : poll['results'][c]['votes'], "percentage" : pctVote })
  
  poll['candidates'] = sorted( poll['candidates'], key=itemgetter("votes"), reverse=True)
  
  poll['winner'] = ""
  poll['margin'] = 0
  
  if poll['candidates'][0]['party'] > 0 :
    poll['winner'] = poll['candidates'][0]['party']
    poll['margin'] = poll['candidates'][0]['votes'] - poll['candidates'][1]['votes']
    
    
  if( poll['electors'] != 0 ):
    poll.update( { "percentTurnout" : round( float(poll['validVotes']) 
                                                        * 100 / float(poll['electors']), 2) })
                                                        
#  if( poll['noPoll'] ) :
#    pprint( poll)
    
  return poll
    
  

## First, let's load the aggregate information about the 2011 Ontario Election  
#
#

with open('Ontario2011Results.pkl', 'rb') as f:
  electionResults = pickle.load(f)
  f.close()
  
with open('results_2011_096.csv','r') as f:
  reader = csv.reader(f,delimiter=',')

  csvData = []
  for row in reader:
    csvData.append( row )
  
  f.close()


pollResults = csvToDict( csvData )  
  
ridingData = electionResults['ridings']['96']
ridingData['polls'] = {}


# Now, let's create a dictionary of PARTY <=> CANDIDATE LAST NAME

parties = ridingData['results'].keys()
candidates = {}

for p in parties: 
  candidates.update( { p : ridingData['results'][p]['candidateLastName'] })

# Now, let's clean the data and insert into our ridingData structure
#
# Note: Some polls have more than one entry.  We merge these here into one poll.
  
splitPollSet = set( ['A', 'B', 'C'] )
  
for poll in pollResults:
  if( poll['noPoll'] == False and poll['POLL_NUMBER'][-1] in splitPollSet ):
    pollNumber = poll['POLL_NUMBER'][:-1]
  else :
    pollNumber = poll['POLL_NUMBER']
      
  while( pollNumber[:1] == "0" ):
    pollNumber = pollNumber[1:]
      
  #print pollNumber
  
  if(( pollNumber in ridingData['polls'].keys()) == False ):
    ridingData['polls'].update( { pollNumber : {} } )
    ridingData['polls'][pollNumber] = parsePollData( poll, ridingData['polls'][pollNumber], candidates, noPollData=poll['noPoll'] )
  else :
    ridingData['polls'][pollNumber] = parsePollData( poll, ridingData['polls'][pollNumber], candidates, addToRecord=True )

    
    

   
      
## Now, let's calculate some extra data:

for poll in ridingData['polls'] :
  ridingData['polls'][poll] = calculatePollData( ridingData['polls'][poll], candidates )
  
## Finally, let's drop the extraneous "results" object

for poll in ridingData['polls'] :
  if( ridingData['polls'][poll]['noPoll'] == False ):
    del ridingData['polls'][poll]['results'] 
                                                          

with open('96_Ont2011.json', 'w') as f:
  json.dump(ridingData, f, ensure_ascii = False)
  f.close()
  











