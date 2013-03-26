var ridingNameList = [[1, "AJAX-PICKERING"], [2, "ALGOMA-MANITOULIN"], [3, "ANCASTER-DUNDAS-FLAMBOROUGH-WESTDALE"], [4, "BARRIE"], [5, "BEACHES-EAST YORK"], [6, "BRAMALEA-GORE-MALTON"], [7, "BRAMPTON-SPRINGDALE"], [8, "BRAMPTON WEST"], [9, "BRANT"], [10, "BRUCE-GREY-OWEN SOUND"], [11, "BURLINGTON"], [12, "CAMBRIDGE"], [13, "CARLETON-MISSISSIPPI MILLS"], [14, "CHATHAM-KENT-ESSEX"], [15, "DAVENPORT"], [16, "DON VALLEY EAST"], [17, "DON VALLEY WEST"], [18, "DUFFERIN-CALEDON"], [19, "DURHAM"], [20, "EGLINTON-LAWRENCE"], [21, "ELGIN-MIDDLESEX-LONDON"], [22, "ESSEX"], [23, "ETOBICOKE CENTRE"], [24, "ETOBICOKE-LAKESHORE"], [25, "ETOBICOKE NORTH"], [26, "GLENGARRY-PRESCOTT-RUSSELL"], [27, "GUELPH"], [28, "HALDIMAND-NORFOLK"], [29, "HALIBURTON-KAWARTHA LAKES-BROCK"], [30, "HALTON"], [31, "HAMILTON CENTRE"], [32, "HAMILTON EAST-STONEY CREEK"], [33, "HAMILTON MOUNTAIN"], [34, "HURON-BRUCE"], [35, "KENORA-RAINY RIVER"], [36, "KINGSTON AND THE ISLANDS"], [37, "KITCHENER CENTRE"], [38, "KITCHENER-CONESTOGA"], [39, "KITCHENER-WATERLOO"], [40, "LAMBTON-KENT-MIDDLESEX"], [41, "LANARK-FRONTENAC-LENNOX AND ADDINGTON"], [42, "LEEDS-GRENVILLE"], [43, "LONDON-FANSHAWE"], [44, "LONDON NORTH CENTRE"], [45, "LONDON WEST"], [46, "MARKHAM-UNIONVILLE"], [47, "MISSISSAUGA-BRAMPTON SOUTH"], [48, "MISSISSAUGA EAST-COOKSVILLE"], [49, "MISSISSAUGA-ERINDALE"], [50, "MISSISSAUGA SOUTH"], [51, "MISSISSAUGA-STREETSVILLE"], [52, "NEPEAN-CARLETON"], [53, "NEWMARKET-AURORA"], [54, "NIAGARA FALLS"], [55, "NIAGARA WEST-GLANBROOK"], [56, "NICKEL BELT "], [57, "NIPISSING"], [58, "NORTHUMBERLAND-QUINTE WEST"], [59, "OAK RIDGES-MARKHAM"], [60, "OAKVILLE"], [61, "OSHAWA"], [62, "OTTAWA CENTRE"], [63, "OTTAWA-ORLÉANS"], [64, "OTTAWA SOUTH"], [65, "OTTAWA-VANIER"], [66, "OTTAWA WEST-NEPEAN"], [67, "OXFORD"], [68, "PARKDALE-HIGH PARK"], [69, "PARRY SOUND-MUSKOKA"], [70, "PERTH-WELLINGTON"], [71, "PETERBOROUGH"], [72, "PICKERING-SCARBOROUGH EAST"], [73, "PRINCE EDWARD-HASTINGS"], [74, "RENFREW-NIPISSING-PEMBROKE"], [75, "RICHMOND HILL"], [76, "ST. CATHARINES"], [77, "ST. PAUL'S"], [78, "SARNIA-LAMBTON"], [79, "SAULT STE. MARIE"], [80, "SCARBOROUGH-AGINCOURT"], [81, "SCARBOROUGH CENTRE"], [82, "SCARBOROUGH-GUILDWOOD"], [83, "SCARBOROUGH-ROUGE RIVER"], [84, "SCARBOROUGH SOUTHWEST"], [85, "SIMCOE-GREY"], [86, "SIMCOE NORTH"], [87, "STORMONT-DUNDAS-SOUTH GLENGARRY "], [88, "SUDBURY"], [89, "THORNHILL"], [90, "THUNDER BAY-ATIKOKAN"], [91, "THUNDER BAY-SUPERIOR NORTH"], [92, "TIMISKAMING-COCHRANE"], [93, "TIMMINS-JAMES BAY"], [94, "TORONTO CENTRE"], [95, "TORONTO-DANFORTH"], [96, "TRINITY-SPADINA"], [97, "VAUGHAN"], [98, "WELLAND"], [99, "WELLINGTON-HALTON HILLS"], [100, "WHITBY-OSHAWA"], [101, "WILLOWDALE"], [102, "WINDSOR-TECUMSEH"], [103, "WINDSOR WEST"], [104, "YORK CENTRE"], [105, "YORK-SIMCOE"], [106, "YORK SOUTH-WESTON"], [107, "YORK WEST"]];

var adjacencyMatrix = {"1": [72, 100, 83, 19, 59], "2": [79, 56, 93, 10, 69, 91], "3": [31, 33, 11, 30, 9, 12, 99, 28, 55], "4": [105, 85, 86], "5": [95, 84, 17, 16], "6": [7, 25, 47, 97], "7": [8, 6, 47], "8": [7, 51, 47, 99], "9": [12, 3, 28, 67], "10": [34, 70, 85, 18], "11": [32, 60, 30, 3], "12": [37, 9, 38, 3, 99, 67], "13": [66, 52, 41, 74], "14": [40, 21], "15": [68, 77, 20, 106, 96], "16": [17, 80, 101, 81, 5, 84], "17": [16, 77, 101, 94, 20, 5, 95], "18": [99, 85, 7, 8, 6, 97, 59], "19": [100, 61, 1, 59, 105], "20": [77, 104, 15, 106, 17, 101], "21": [43, 45, 67, 40, 70, 28, 14], "22": [], "23": [24, 25, 106, 68, 48, 47], "24": [23, 68, 48, 50], "25": [107, 23, 106, 6, 97, 47], "26": [87, 63, 52], "27": [99], "28": [9, 3, 67, 55, 98], "29": [71, 19, 58, 105, 86, 73, 74], "30": [11, 51, 60, 49, 3, 99], "31": [33, 32, 3], "32": [33, 31, 11, 55], "33": [31, 32, 3, 55], "34": [70, 10, 40], "35": [90, 91, 93], "36": [41, 42], "37": [39, 12, 38], "38": [39, 37, 12, 70, 67, 99], "39": [38, 37], "40": [78, 45, 44, 21, 14, 43, 34, 70], "41": [36, 73, 13, 42, 52, 74], "42": [52, 36, 41, 87], "43": [44, 45, 21, 40], "44": [45, 43, 40], "45": [44, 43, 21, 40], "46": [80, 83, 101, 75, 89, 59], "47": [48, 51, 49, 6, 25, 23, 7, 8], "48": [50, 47, 23, 49, 24], "49": [51, 50, 47, 48, 60, 30], "50": [48, 49, 24, 60], "51": [49, 47, 8, 30], "52": [64, 66, 63, 13, 42, 87, 26, 41], "53": [59, 105], "54": [76, 98], "55": [32, 33, 98, 76, 3], "56": [88, 92, 2, 69], "57": [69, 74], "58": [71, 73, 29, 19], "59": [53, 75, 46, 97, 105, 83], "60": [49, 50, 11, 30], "61": [100, 19], "62": [64, 65, 66], "63": [65, 64, 52, 26], "64": [62, 65, 63, 52, 66], "65": [64, 62, 63], "66": [62, 64, 52, 13], "67": [38, 9, 12, 70, 21, 28], "68": [15, 106, 24, 96, 23], "69": [86, 57, 29], "70": [38, 67, 34, 99, 18, 21, 10, 40], "71": [58, 29, 73], "72": [82, 83, 1], "73": [71, 58, 41, 74, 29], "74": [73, 41, 29, 13, 57], "75": [89, 59, 46, 97], "76": [98, 54, 55], "77": [20, 15, 94, 96, 17], "78": [40], "79": [2], "80": [16, 81, 46, 83, 101], "81": [84, 80, 16, 82, 83], "82": [83, 81, 84, 72], "83": [82, 81, 80, 46, 72, 1, 59], "84": [81, 5, 82, 16], "85": [4, 18, 86, 105, 59], "86": [4, 85, 105, 69], "87": [26, 52, 42], "88": [56], "89": [104, 75, 101, 107, 97, 46], "90": [91, 35], "91": [90, 35, 2, 93], "92": [56, 69], "93": [2, 56, 91, 92, 35], "94": [96, 95, 77, 17], "95": [94, 5, 96, 17], "96": [94, 77, 15, 95, 68], "97": [107, 25, 89, 6, 75, 59], "98": [76, 54, 55], "99": [27, 30, 12, 18, 3, 8, 38, 51], "100": [61, 19, 1], "101": [17, 16, 89, 20, 104, 80, 46], "102": [103], "103": [102], "104": [20, 89, 107, 106, 101], "105": [53, 4, 59, 86, 85], "106": [68, 15, 20, 23, 107, 104, 25], "107": [25, 104, 106, 89, 97]};
	
var map;

var ridingData, mapData, boundaryData;
var riding = null;

var adjacentRidings = [];
var numAdjacent = 0;

$( document ).ready(function() {
 
  var Riding = Backbone.Model.extend({
    defaults : {
      rName : "Trinity-Spadina",
      rID : 93,
      electionYear : 2011,
      ridingDataLoaded : false,
      mapDataLoaded : false,
      boundaryDataLoaded : false,
    },
    
    initialize: function() {
      _.bindAll( this, 'ridingChanged', 'ridingLoaded');
    
      this.bind( "change:rID", this.ridingChanged );
      this.bind( "change:electionYear", this.ridingChanged );
      this.bind( "ridingHasLoaded", this.ridingLoaded );
    },
    
    ridingChanged: function() {
      console.log( "Riding number has changed to " + this.get( 'rID' ) );

      var fileStr;
      
      var self = this;
      
      this.set( 'mapDataLoaded', false );
      this.set('ridingDataLoaded', false );
      this.set('boundaryDataLoaded', false );
      
      fileStr = "https://frogcakeskierscuba.s3.amazonaws.com/ontario" + this.get('electionYear') + "/ridingMapData_" + this.get( 'rID' ) + ".json";
      //fileStr = "http://individual.utoronto.ca/seanmullin/testing/ridingMapData_96.json";
      $.getJSON(fileStr, function(data) {
        mapData = data;
        self.set( 'mapDataLoaded', true );
        if( self.get( 'ridingDataLoaded' ) && self.get( 'boundaryDataLoaded' )) {
          self.trigger( 'ridingHasLoaded' );
        }
      });    

      fileStr = "https://frogcakeskierscuba.s3.amazonaws.com/ontario" + this.get('electionYear') + "/Ont" + this.get('electionYear') + "_" + this.get( 'rID' ) + ".json";
      //fileStr = "http://individual.utoronto.ca/seanmullin/testing/Ont2011_96.json";
      $.getJSON(fileStr, function(data) {
        ridingData = data;
        self.set('ridingDataLoaded', true );
        if( self.get( 'mapDataLoaded' ) && self.get( 'boundaryDataLoaded' )) {
          self.trigger( 'ridingHasLoaded' );
        }
      });
      
      fileStr = "https://frogcakeskierscuba.s3.amazonaws.com/ontario" + this.get('electionYear') + "/ridingMapBoundaryData_" + this.get( 'rID' ) + ".json";
      //fileStr = "http://individual.utoronto.ca/seanmullin/testing/ridingMapBoundaryData_96.json";
      $.getJSON(fileStr, function(data) {
        boundaryData = data;
        self.set('boundaryDataLoaded', true );
        if( self.get( 'ridingDataLoaded' ) && self.get( 'mapDataLoaded' )) {
          self.trigger( 'ridingHasLoaded' );
        }
      });
      
      
      var i = 0;
      
      for( i = 0; i < numAdjacent; i++ ) {
        adjacentRidings[i].closeMap();
      }
      
      numAdjacent = 0;//adjacencyMatrix[this.get('rID')].length;
      
      for( i = 0; i < numAdjacent; i++ ) {
      
        fileStr = "https://frogcakeskierscuba.s3.amazonaws.com/ontario" + this.get('electionYear') + "/ridingMapBoundaryData_" + adjacencyMatrix[this.get('rID')][i] + ".json";
        //fileStr = "https://frogcakeskierscuba.s3.amazonaws.com/ontario" + this.get('electionYear') + "/ridingMapBoundaryData_" + i + ".json";
        $.getJSON(fileStr, 
          (function (n) {
            return function(data) {
              adjacentRidings[n] = new ElectionData.Riding( null, data );
              adjacentRidings[n].initMap(map);
              adjacentRidings[n].showBoundary();
              console.log( "Loading boundary for " + n );
            } 
          })(i)
        );
               
        
    
      }
    },
    
    ridingLoaded: function() {
      console.log( "Riding data has now loaded." );
      if( riding ) {
        riding.closeMap();
      }
      riding = new ElectionData.Riding( ridingData, boundaryData );
      riding.addPollData( mapData );
      this.trigger( 'updateRiding' );
    }
    
  });
  
  var RidingView = Backbone.View.extend({
 
    el: $('body'),
    
    events: {
      'change select#ridingNumber': 'changeRiding',
      'change select#election': 'changeRiding',
      'change select#fillType': 'changeShading',
      'click button#button1': 'changeName',
      'click button#hidePanel': 'hidePanel'
    },
    
    initialize: function() {
    
      var i;
      
      _.bindAll( this, 'render', 'changeRiding', 'changeName', 'updateRiding', 'changeShading', 'hidePanel' );
      
      this.model = new Riding();
      
     // Initialize Google Maps;
     
     
      
	  var mapOptions = {
	    center: new google.maps.LatLng(43.639552217043267,-79.378504391148113),
	    zoom: 12,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
      
	  map = new google.maps.Map( $("#map_canvas").get(0), mapOptions);
      
      for( i = 0; i < 107; i++ ) {
        $('#ridingNumber').append( "<option value='" + ridingNameList[i][0] + "'>" + ridingNameList[i][1] + "</option>" );
      }
      
      this.model.on( "updateRiding", this.updateRiding );
      
      this.fillType = "party";
      
      this.render();
    },
    
    render: function() {
      $("#ridingID").val(this.model.get('rID'));
      
      
    },
    
    changeRiding: function() {
      this.model.set( { 'rID' : $('#ridingNumber').val(), 'electionYear' : $('#election').val() } );   // FIX THIS SO WE DON'T CHANGE THE MODEL TWICE!
      console.log( "Changed to " + $('#ridingNumber').val() + " " + $('#election').val());
      this.render();
    },
    
    changeName: function() {
      this.model.set( { 'rName' : "Name: " + $('#ridingID').val() } );
    },
    
    updateRiding: function() {

      riding.initMap( map );
      riding.zoomToFit();
      riding.setFillOption( $('#fillType').val());
      //riding.showBoundary();
      riding.showPolls();
    },
    
    changeShading:  function() {
      console.log( "Here! " + $('#fillType').val() );
      if( riding != null ) {
        riding.setFillOption( $('#fillType').val());
      }
    },
    
    hidePanel: function() {
      $("#side_nav").hide();//"slide", { direction: "left" }, 1000);
    }
    
  });
  
  var ridingView = new RidingView();
});