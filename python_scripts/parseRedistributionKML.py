from pykml import parser
from os import path
from operator import itemgetter
import json
from pprint import pprint
import sys


def splitCoords( coords ):
  c = []
  words = coords.split();

  for w in words:
    ww = w.split(',')
    wx = [float(ww[1]),float(ww[0])]
    c.append(wx)
  return c
  

def parseData( riding, element ):

  for e in element.iter( "{http://earth.google.com/kml/2.2}SimpleData" ):
    el_name = e.get('name')
    if el_name == "FEDNUM":                     
      riding['ridingID'] = e.text[2:]
      while( riding['ridingID'][:1] == "0" ):       # Delete leading zeros
        riding['ridingID'] = riding['ridingID'][1:]
    if el_name == "ED_NAMEE" :
      riding['ridingName'] = e.text.encode( "ascii", "replace" ).replace( '?', '-' )


  return riding


def parsePolygon( riding, element ):

  if 'coords' not in riding:
    riding.update({ 'coords' : [] })
    
  if 'contours' not in riding:
    riding.update({ 'contours' : [] })
 
  for e in element.iter( "{http://earth.google.com/kml/2.2}outerBoundaryIs", "{http://earth.google.com/kml/2.2}innerBoundaryIs" ):
    if e.tag == "{http://earth.google.com/kml/2.2}outerBoundaryIs":
      for ee in e.iter("{http://earth.google.com/kml/2.2}coordinates"):
        riding['coords'].append( splitCoords(ee.text) )
        riding['contours'].append( 0 )                                             # 0 for a solid contour, 1 for a hole.
    if e.tag == "{http://earth.google.com/kml/2.2}innerBoundaryIs":
      for ee in e.iter("{http://earth.google.com/kml/2.2}coordinates"):
        riding['coords'].append( splitCoords(ee.text) )
        riding['contours'].append( 1 )                                             # 0 for a solid contour, 1 for a hole.

  return riding


def extractKML( path ) :  
  
    kmlFileName = 'OntFederalRedistribution.kml'

    with open(kmlFileName, 'r') as f:
      doc = parser.parse(f)

    ridingList = []
    
    
    for element in doc.iter("{http://earth.google.com/kml/2.2}Placemark"):
     
      riding = {}
      
      for e in element.iter("{http://earth.google.com/kml/2.2}ExtendedData", "{http://earth.google.com/kml/2.2}Polygon" ):
        
        if e.tag == "{http://earth.google.com/kml/2.2}ExtendedData" :
          parseData( riding, e )
        
        if e.tag == "{http://earth.google.com/kml/2.2}Polygon":
          parsePolygon( riding, e )
      
      ridingList.append( riding.copy())      
     
    f.close()
    
    # Dump one file with all riding boundaries.
        
    outputFile = path + 'OntRedistributionRidings.json'

    with open(outputFile, 'w') as f:
      json.dump(ridingList, f, ensure_ascii = False)
      f.close()
      
      
    # Now, let's dump individual riding boundary files.
      
    for i in range( 0, len( ridingList )):
      outputFile = path + 'ridingMapBoundaryData_' + str(ridingList[i]['ridingID']) + '.json'
    
      with open(outputFile, 'w') as f:
        json.dump(ridingList[i], f, ensure_ascii = False)
        f.close()
        
    # Finally, we output a file with a JSON list of riding names and IDs.
    
    ridingNames = {};
  
    for i in range( 0, len( ridingList )):    
      ridingNames.update( { int( ridingList[i]['ridingID'] ) : ridingList[i]['ridingName'] } ) 
  
    ridingNames = sorted( ridingNames.items(), key=itemgetter(0))

    outputFileName = path + 'ridingNames.json'                                                          
                                                          
    with open(outputFileName, 'w') as f:
      json.dump(ridingNames, f, ensure_ascii = False)
      f.close()
      
    print len( ridingList ), "ridings successfully parsed."

    return True
    
    
###### 
#
#  Main
    
    
rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2011/redistribution/"

path = rootPath + dataPath

extractKML( path )

	  

		
