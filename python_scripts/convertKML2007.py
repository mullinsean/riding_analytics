import os

rootPath = "/Mullin Files/Code/riding_analytics/"
dataPath = "data/Ont2007/"

path = rootPath + dataPath

inputFile = "EO_107PD.shp"

for ridingID in range( 1, 108 ):

  outputFile = "ridingMapData_" + str( ridingID ) + ".kml"
  sqlStr = "SELECT * FROM EO_107PD, WHERE ED_ID=" + str(ridingID)

  cmdStr = "ogr2ogr -f KML " + outputFile + " " + inputFile + " -sql \"" + sqlStr + "\""

  os.system( cmdStr )
  
  print "Converted riding #", ridingID, " to .kml"


inputFile = "EO_107ED_2011_06_02.shp"

for ridingID in range( 1, 108 ):

  outputFile = "ridingBoundary_" + str( ridingID ) + ".kml"
  sqlStr = "SELECT * FROM EO_107ED_2011_06_02, WHERE ED_ID=" + str(ridingID)

  cmdStr = "ogr2ogr -f KML " + outputFile + " " + inputFile + " -sql \"" + sqlStr + "\""

  os.system( cmdStr )
  
  print "Converted riding boundard #", ridingID, " to .kml"  
  