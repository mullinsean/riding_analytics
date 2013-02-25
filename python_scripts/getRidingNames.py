from os import path
from operator import itemgetter
from pprint import pprint
import json
import csv
import pickle

   
    
###### 
#
#  Main
    
      
    
rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2011/"

path = "" #rootPath + dataPath

electFileName = path + "Ontario2011Results.pkl"
    
with open(electFileName, 'rb') as f:
  electResults = pickle.load(f)
  f.close()

ridingNames = {};
  
for r in electResults['ridings'] :    
  ridingNames.update( { int( r ) : electResults['ridings'][r]['ridingName'] } ) 
  
ridingNames = sorted( ridingNames.items(), key=itemgetter(0))

outputFileName = path + 'ridingNames.json'                                                          
                                                          
with open(outputFileName, 'w') as f:
  json.dump(ridingNames, f, ensure_ascii = False)
  f.close()
  













