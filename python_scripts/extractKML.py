from pykml import parser
from os import path
from lxml import etree
import json

def split_coords( coords ):
  c = []
  words = coords.split();
  for w in words:
    ww = w.split(',')
    wx = [float(ww[1]),float(ww[0])]
    c.append(wx)
  return c
  

def parseData( pol, element ):
  for e in element.iter( "{http://www.opengis.net/kml/2.2}SimpleData" ):
    el_name = e.get('name')
    if el_name == "POLL_DIV_1":
	  pol['poll_number'] = e.text   
  return pol

def parsePolygon( pol, element ):
  for e in element.iter( "{http://www.opengis.net/kml/2.2}outerBoundaryIs", "{http://www.opengis.net/kml/2.2}innerBoundaryIs" ):
    if e.tag == "{http://www.opengis.net/kml/2.2}outerBoundaryIs":
      for ee in e.iter("{http://www.opengis.net/kml/2.2}coordinates"):
        pol['coords'] = [split_coords(ee.text)]
    if e.tag == "{http://www.opengis.net/kml/2.2}innerBoundaryIs":
      for ee in e.iter("{http://www.opengis.net/kml/2.2}coordinates"):
        pol['coords'].append( split_coords(ee.text) )

  return pol
  

def extractRidingBoundary( ridingID, path ) :

    kmlFileName = path + 'ridingBoundary_' + str( ridingID ) + '.kml'

    with open(kmlFileName, 'r') as bF:
      doc = parser.parse(bF)
      
    print "Opening riding boundary file:", ridingID
    
    boundaryPoly = {}

    for element in doc.iter("{http://www.opengis.net/kml/2.2}Polygon"):
      parsePolygon( boundaryPoly, element )
        
    bF.close()
        
    return boundaryPoly



def extractKML( ridingID, path ) :  
  
    kmlFileName = path + 'ridingMapData_' + str( ridingID ) + '.kml'

    with open(kmlFileName, 'r') as f:
      doc = parser.parse(f)
      
    print "Opening riding map file:", ridingID 
      
    poll_list = []  
    pol = {}

    for element in doc.iter("{http://www.opengis.net/kml/2.2}ExtendedData", "{http://www.opengis.net/kml/2.2}Polygon"):
        if element.tag == "{http://www.opengis.net/kml/2.2}ExtendedData":
          parseData( pol, element )
        elif element.tag == "{http://www.opengis.net/kml/2.2}Polygon":
          parsePolygon( pol, element )
          poll_list.append( pol.copy())

     
    f.close()
    
    riding = {}  
    riding['ridingID'] = ridingID
    riding['num_polls'] = len(poll_list)
    riding['polls'] = poll_list
    
    riding['ridingBoundary'] = extractRidingBoundary( ridingID, path )
    
    outputFile = path + 'ridingMapData_' + str( ridingID ) + '.json'

    with open(outputFile, 'w') as f:
      json.dump(riding, f)
      f.close()
      
    print "Successfully wrote riding map file:", ridingID 

    return True
    
    
###### 
#
#  Main
    
    
rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2011/"

path = rootPath + dataPath

for i in range( 1, 108 ) :    
  extractKML( i, path  )

	  

		
