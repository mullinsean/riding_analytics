from os import path
from operator import itemgetter
import json
import csv
import pickle


def csvToDict( csvData ):
  hD = []
  
  headerRow = csvData[0]
  
  for i in range(0, len(headerRow)):
    hD.append( headerRow[i] )
    
  dict = []
  entry = {}
   
  for n in range( 1, len( csvData )):
    line = csvData[n]   
    for i in range( 0, len( line )):
      entry[hD[i]] = line[i]
    dict.append( entry.copy() )
    
  return dict


 

f1 = open('CandidateListOnt2011.csv','r')
reader = csv.reader(f1,delimiter=',')

csvData = []
for row in reader:
  csvData.append( row )
  
f1.close()

candidateList = csvToDict( csvData )

electionResults = {}


# Clean up the data.
#
#  1) Convert votes to integers
#  2) Remove the (duplicate) french riding names

for entry in candidateList:
  entry['VOTES'] = int(entry['VOTES'])
  
  n = entry['RIDING_NAME'].find( "/" )
  if n != -1 :
    entry['RIDING_NAME'] = entry['RIDING_NAME'][:n-1]  


# Create a dictionary of results with Riding IDs as our key.  
#
# 

ridings = {}

for entry in candidateList:
  if( ridings.get(entry['RIDING_ID']) == None ):
    ridings[entry['RIDING_ID']] = { "ridingName" : entry['RIDING_NAME'], "incumbent" : None }
 
  # Incumbents are designated by a leading "* " at the beginning of the 'CANDIDATE' field
 
  if( entry['CANDIDATE'][:1] == "*" ):
    ridings[entry['RIDING_ID']]["incumbent"] = entry['PARTY']
    entry['CANDIDATE'] = entry['CANDIDATE'][2:]
  
  if( ridings[entry['RIDING_ID']].get( "results" ) == None ) :
    ridings[entry['RIDING_ID']].update( { "results" : { entry['PARTY'] : { 'votes' : entry['VOTES'], 
                                                                           'candidateLastName' : entry['CANDIDATE'].split()[-1],
                                                                           'candidateFirstNames' : " ".join( entry['CANDIDATE'].split()[:-1]) }}})
  else :
    ridings[entry['RIDING_ID']]['results'].update( { entry['PARTY'] : { 'votes' : entry['VOTES'], 
                                                                        'candidateLastName' : entry['CANDIDATE'].split()[-1],
                                                                        'candidateFirstNames' : " ".join( entry['CANDIDATE'].split()[:-1]) }})
                                                                        
                                                                        
                                                                        
# Let's crunch some results:
#
# 1) Winners in each riding
# 2) Margin of victory for winner
# 3) Percentage of vote by party in riding


for key, riding in ridings.iteritems():
  totalVotes = 0
  winningVotes = 0
  secondPlaceVotes = 0
  
  for party in riding['results'] :
    totalVotes += riding['results'][party]['votes']
  
    if riding['results'][party]['votes'] > winningVotes :
      secondPlaceVotes = winningVotes
      winningVotes = riding['results'][party]['votes']
      riding['winner'] = party
    elif riding['results'][party]['votes'] > secondPlaceVotes :
      secondPlaceVotes = riding['results'][party]['votes']
     
  riding['totalVotes'] = totalVotes
  riding['margin'] = winningVotes - secondPlaceVotes
  riding['numCandidates'] = len( riding['results'] )
 
  for party in riding['results'] :
    riding['results'][party].update( { "percentage" : round( float( riding['results'][party]['votes']) * 100 / float( riding['totalVotes']), 2 ) } )
    
    


# Calculate some aggregate results     
    
electionResults['numRidings'] = len( ridings )
electionResults['numCandidates'] = len( candidateList )
    
mainParties = ["L", "PC", "GP", "ND"]
parties = set( c['PARTY'] for c in candidateList )

electionResults['aggregateResults'] = {}
electionResults['totalVotes'] = 0


for p in parties:
  electionResults['aggregateResults'].update( { p : { 'votes' : 0, 'percentage' : 0 }} )

for candidate in candidateList:
  electionResults['aggregateResults'][candidate['PARTY']]['votes'] += candidate['VOTES']
  electionResults['totalVotes'] += candidate['VOTES']

for p in parties:
  electionResults['aggregateResults'][p]['percentage'] = round( float( electionResults['aggregateResults'][p]['votes'] ) * 100 / float( electionResults['totalVotes']), 2)

  
results = sorted( electionResults['aggregateResults'].items(), key=itemgetter(1), reverse=True)

# Now, let's dump the whole thing to JSON

electionResults['ridings'] = ridings
electionResults['mainParties'] = mainParties  
    
with open('Ontario2011Results.json', 'w') as f:
  json.dump(electionResults, f, ensure_ascii = False)
  f.close()

with open('Ontario2011Results.pkl', 'wb') as f:
  pickle.dump(electionResults, f)
  f.close()
  
  
print "Done. Processed", len(candidateList), "candidates and", len( ridings ), "ridings."
  
  







  
