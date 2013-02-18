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
    #while e.iter() 
    #ff = e.find( "{http://www.opengis.net/kml/2.2}coordinates" )
    #print ff.text
      #pol['coords'] = split_coords(element.text)

  return pol


  
  
kml_file = path.join('./', 'RNP.kml')

with open(kml_file) as f:
  doc = parser.parse(f)
  
poll_list = []  
pol = {}

for element in doc.iter("{http://www.opengis.net/kml/2.2}ExtendedData", "{http://www.opengis.net/kml/2.2}Polygon"):
    if element.tag == "{http://www.opengis.net/kml/2.2}ExtendedData":
      parseData( pol, element )
    elif element.tag == "{http://www.opengis.net/kml/2.2}Polygon":
      parsePolygon( pol, element )
      poll_list.append( pol.copy())

 
riding = {}  
riding['name'] = "Renfrew-Nipissing-Pembroke"
riding['id'] = 74
riding['num_polls'] = len(poll_list)
riding['polls'] = poll_list


print json.dumps(riding)

with open('RNP.json', 'w') as f:
  json.dump(riding, f)
  f.close()


	  

		
