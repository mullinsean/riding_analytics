from os import path
import pprint
import json
import sys
import math
import Polygon

def loadBoundaries( path, numRidings ) :
  
  ridingBoundaries = {}
  
  for ridingID in range( 1, numRidings + 1 ):
  
    boundaryFileName = path + 'ridingMapBoundaryData_' + str( ridingID ) + '.json'
  
    with open( boundaryFileName, 'r') as f:
      jsonBoundary = json.load(f)
      
    f.close()
    
    p = Polygon.Polygon()
    i = 0
    while i < len( jsonBoundary['coords']):
      p.addContour( jsonBoundary['coords'][i], jsonBoundary['contours'][i] )
      i = i + 1
     
    ridingBoundaries.update( { ridingID : p } )

  return ridingBoundaries
  
def doPolysOverlap( poly1, poly2, tolerance ):

  # First, check if they overlap  
  
  if not poly1.overlaps( poly2 ):
    return False
    
  # Now, calculate area of overlap to detect edge/adjacency cases.
    
  p = poly1 & poly2
  
  if p.area() < tolerance:
    return False
  
  #print "Area: ", p.area()
  
  return True
    

def loadRidingMatrix( path ):

  ridingMatrix = {}

  matrixFileName = path + 'redistributionList.json'
  
  with open( matrixFileName, 'r') as f:
    jsonFile = json.load(f)
      
  f.close()
  
  for i in jsonFile:
    ridingMatrix.update( { int(i) : jsonFile[i] } )
  
  return ridingMatrix

  
def loadPollBoundaries( path, ridingID ):
    
  inputFile = path + 'ridingMapData_' + str( ridingID ) + '.json'

  with open(inputFile, 'r') as f:
    riding = json.load(f)
    f.close()
    
  pollList = {}
  for p in riding['polls']:
    poly = Polygon.Polygon()
    
    i = 0
    while i < len( p['coords'] ):
      poly.addContour( p['coords'][i], p['contours'][i] )
      i += 1
      
    pollList.update( { int( p['poll_number'] ) : poly } ) 
    
  
      
  return pollList
  
  
def assignPoll( poll, ridingMap, ridingBoundaries ):

  ridingList = []
  
  for i in ridingMap:
    if poll.overlaps( ridingBoundaries[i] ):
      ridingList.append( i )
  
  if len( ridingList ) == 1:
    return ridingList[0]
    
  largestArea = 0
  riding = 0
  
  for i in ridingList:
    p = poll & ridingBoundaries[i]
    area = p.area()
    if area > largestArea:
      largestArea = area
      riding = i
  
  return riding

  
def assignPollsToRiding( path, mappingList, ridingBoundaries, pollList ):

  pollMapping = {}

  for riding in pollList:
  
    ridingMap = mappingList[riding]
    
    pollMapping.update( { riding : {} } )
    
    for poll in pollList[riding]:
      pollMapping[riding].update( { poll : assignPoll( pollList[riding][poll], ridingMap, ridingBoundaries ) } )
  
    print "Riding", riding, "-->", len( pollList[riding] ), "polls mapped."
    
  outputFileName = path + 'redistributedPollMapping.json'                                                          
                                                          
  with open(outputFileName, 'w') as f:
    json.dump(pollMapping, f)
    f.close()
      
  print len( pollList ), "ridings successfully parsed."

###### 
#
#  Main
    
    
rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2013/"

path = rootPath + dataPath

print "Loading redistribution mappings..."

ridingMappingList = loadRidingMatrix( path )

print "Loading riding boundaries..."

ridingBoundaries = loadBoundaries( path, 121 )


print "Loading poll boundaries and converting to polygons..."

pollLists = {}

for i in range( 1, 108 ):  
  pollLists.update( { i : loadPollBoundaries( rootPath + "data/Ont2011/", i ) } )

print "Allocating polls to ridings..."

assignPollsToRiding( path, ridingMappingList, ridingBoundaries, pollLists )



