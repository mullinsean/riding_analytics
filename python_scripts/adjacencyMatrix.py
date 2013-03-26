from os import path
import json
import sys
import math
import Polygon

def loadBoundaries( path ) :
  
  ridingBoundaries = []
  
  for ridingID in range( 1, 108 ):
  
    #print ridingID

    boundaryFileName = path + 'ridingMapBoundaryData_' + str( ridingID ) + '.json'
  
    with open( boundaryFileName, 'r') as f:
      jsonBoundary = json.load(f)
      
    f.close()
    
    p = Polygon.Polygon( jsonBoundary['coords'][0] )
    i = 1
    while i < len( jsonBoundary['coords']):
      p.addContour( jsonBoundary['coords'][i], 1 )
      i = i + 1
     
    ridingBoundaries.append( p )

  return ridingBoundaries
  
def distanceBetweenPoints( point1, point2 ):

  return math.sqrt( ( point1[0] - point2[0] ) ** 2 + ( point1[1] - point2[1] ) ** 2 )
  
  
def calculateDistanceMatrix( ridingBoundaries ):

  # First, caculate centers of every boundary polygon

  ridingCenters = []
  
  for i in range( 0, 107 ):
    ridingCenters.append( ridingBoundaries[i].center())

  # Now, we are going to calculate a N x N matrix of the respective distances between all polygon centroids.
  #
  # Note: The matrix will be symmetric along the i=j axis
  
  distanceMatrix = []
  rankingMatrix = []
  
  for i in range( 0, 107 ):
    
    distanceMatrix.append( {} )
    for j in range( 0, 107 ):    
      distanceMatrix[i].update( { j: distanceBetweenPoints( ridingCenters[i], ridingCenters[j] ) })
      
    rankingMatrix.append( sorted( distanceMatrix[i], key=distanceMatrix[i].get ));
      
  return rankingMatrix    
  
  
def nSolidContours( polygon ):
  
  n = 0
  
  for i in range( 0, len( polygon )):
    if polygon.isSolid( i ):
      n += 1
  
  return n

  
def arePolysAdjacent( poly1, poly2 ):
  # Here, we test if two polygons are adjacent by performing a union on them and seeing if extra contours are created
  
  p = poly1 + poly2
  
  if nSolidContours( p ) < nSolidContours( poly1 ) + nSolidContours( poly2 ):
    return True
  else :
    return False
  
  
      


def buildAdjacencyMatrix( path ):

  ridingBoundaries = loadBoundaries( path )
  
  distanceMatrix = calculateDistanceMatrix( ridingBoundaries )
  
  print "TS & TD: ", arePolysAdjacent( ridingBoundaries[95], ridingBoundaries[93] )
  
  print "TS & Sudbury: ", arePolysAdjacent( ridingBoundaries[95], ridingBoundaries[87] )
  
  adjacencyMatrix = {}
  
  for i in range( 0, 107 ):
  
    misses = 20
    j = 1                                    # Start at [1] because [0] is the same polygon

    adjacencyMatrix.update( { i+1 : [] } )
    
    #adjacencyMatrix[i] = [0] * 107          # Initially fill matrix with zeros
    
    print i 
    
    while misses > 0:
      if arePolysAdjacent( ridingBoundaries[i], ridingBoundaries[distanceMatrix[i][j]] ) :
        adjacencyMatrix[i+1].append( distanceMatrix[i][j] + 1 )
        print "**"
      else:
        misses -= 1
        #print distanceMatrix[i][j] + 1
    
      
      j += 1
    
       
  
  print adjacencyMatrix
  
  with open("test.json", 'w') as f:
    json.dump(adjacencyMatrix, f)
    f.close()
     
    
  
    
    

  return True





###### 
#
#  Main
    
    
rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2011/"

path = rootPath + dataPath

buildAdjacencyMatrix( path )