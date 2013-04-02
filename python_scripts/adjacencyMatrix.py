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
    
    p = Polygon.Polygon()
    i = 0
    while i < len( jsonBoundary['coords']):
      p.addContour( jsonBoundary['coords'][i], jsonBoundary['contours'][i] )
      i = i + 1
     
    ridingBoundaries.append( p )

  return ridingBoundaries
  
def distanceBetweenPoints( point1, point2 ):

  return math.sqrt( ( point1[0] - point2[0] ) ** 2 + ( point1[1] - point2[1] ) ** 2 )
  
  
def pointInBox( x, y, box ):

  # Box is tuple of four floats: xmin, xmax, ymin, ymax
  
  if ( x > box[0] ) and ( x < box[1] ) and ( y > box[2] ) and ( y < box[3] ) :
    return True
  else :
    return False


def boundingBoxOverlap( poly1, poly2 ):

  # Checks to see if the bounding boxes of the two polygons overlap in any way.
  
  overlap = False
  
  box1 = poly1.boundingBox()
  box2 = poly2.boundingBox()
  
  # Bounding box returns tuple of four floats: xmin, xmax, ymin, ymax

  # Check top left
    
  if( pointInBox( box2[0], box2[2], box1 )):
    return True
    
  # Check top right
  
  if( pointInBox( box2[1], box2[2], box1 )):
    return True

  # Check bottom left
  
  if( pointInBox( box2[0], box2[3], box1 )):
    return True

  # Check bottom right
  
  if( pointInBox( box2[1], box2[3], box1 )):
    return True
    
  # Finally, check if box1 is entirely contained within box2.  For this, we just need to check one point
  
  # Check top left
    
  if( pointInBox( box1[0], box1[2], box2 )):
    return True
    
  # Check top right
  
  if( pointInBox( box1[1], box1[2], box2 )):
    return True

  # Check bottom left
  
  if( pointInBox( box1[0], box1[3], box2 )):
    return True

  # Check bottom right
  
  if( pointInBox( box1[1], box1[3], box2 )):
    return True
  
  # Otherwise, we return False
  
  return False
  
  
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
  
  # First, we check if bounding boxes overlap. If not, it's trivial and we return false.    
  
  if not boundingBoxOverlap( poly1, poly2 ):
    return False
  
  # Here, we test if two polygons are adjacent by performing a union on them and seeing if extra contours are created
   
  p = poly1 + poly2
  
  
  if nSolidContours( p ) < nSolidContours( poly1 ) + nSolidContours( poly2 ):
    return True
  else :
    return False
  
  
      


def buildAdjacencyList( path ):

  ridingBoundaries = loadBoundaries( path )     
  
  adjacencyMatrix = []
  
  for i in range( 0, 107 ):
 
    adjacencyMatrix.append( [] )
    
    adjacencyMatrix[i] = [0] * 107          # Initially fill matrix with zeros

    sys.stdout.write( "Riding: " + str(i + 1) + " --> ")
        
    
    for j in range( 0, 107 ):
      if j < i:
        adjacencyMatrix[i][j] = adjacencyMatrix[j][i]    # MATRIX IS SYMETRIC
        if adjacencyMatrix[i][j] == 1:
          sys.stdout.write( str( j+1 ) + ", ")
      elif not i == j:
        if arePolysAdjacent( ridingBoundaries[i], ridingBoundaries[j] ) :
          adjacencyMatrix[i][j] = 1
          sys.stdout.write( str(j+1) + ", " )
    
    sys.stdout.write( "\n" )
    
  adjacencyList = {}
  
  for i in range( 0, 107 ):
  
    adjacencyList.update( { i + 1 : [] } )
  
    for j in range( 0, 107 ):
      if adjacencyMatrix[i][j] == 1 :
        adjacencyList[i+1].append( j + 1 )
  
  with open( path + "adjacencyList.json", 'w') as f:
    json.dump(adjacencyList, f)
    f.close()
     
    
  
    
    

  return True





###### 
#
#  Main
    
    
rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2011/"

path = rootPath + dataPath

buildAdjacencyList( path )
