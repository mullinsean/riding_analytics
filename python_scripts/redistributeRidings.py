from os import path
import json
import sys
import math
import Polygon

def loadBoundaries( path, numRidings ) :
  
  ridingBoundaries = []
  
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
     
    ridingBoundaries.append( p )

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
    

  
  
    
  


    
  


def buildRedistributionMatrix( path ):

  oldRidingBoundaries = loadBoundaries( path, 107 )

  newRidingBoundaries = loadBoundaries( path + "redistribution/", 121 )
    
    
  redistributionList = {}
  
  for i in range( 0, 107 ):
 
    redistributionList.update( { i+1 : [] } ) 

    sys.stdout.write( "Riding: " + str(i+1) + " --> ")
        
    
    for j in range( 0, 121 ):
      if( doPolysOverlap( oldRidingBoundaries[i], newRidingBoundaries[j], 0.0001 )):
        redistributionList[i+1].append( j+1 )
        sys.stdout.write( str( j+1 ) + ", " )
    
    sys.stdout.write( "\n" )
    
  
  
  with open( path + "redistributionList.json", 'w') as f:
    json.dump(redistributionList, f, ensure_ascii = True)
    f.close()
    
  reversedRedistributionList = {}
    
  for i in range( 0, 121 ):
    reversedRedistributionList.update( {i+1 : [] } )

  for i in range( 1, 108 ):
    for j in redistributionList[i]:
      reversedRedistributionList[j].append( i )
      
  with open( path + "reversedRedistributionList.json", 'w') as f:
    json.dump(reversedRedistributionList, f, ensure_ascii = True)
    f.close()
    
      
     
    
  
    
    

  return True





###### 
#
#  Main
    
    
rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2011/"

path = rootPath + dataPath

buildRedistributionMatrix( path )
