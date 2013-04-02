var ridingNameList = [[1, "AJAX-PICKERING"], [2, "ALGOMA-MANITOULIN"], [3, "ANCASTER-DUNDAS-FLAMBOROUGH-WESTDALE"], [4, "BARRIE"], [5, "BEACHES-EAST YORK"], [6, "BRAMALEA-GORE-MALTON"], [7, "BRAMPTON-SPRINGDALE"], [8, "BRAMPTON WEST"], [9, "BRANT"], [10, "BRUCE-GREY-OWEN SOUND"], [11, "BURLINGTON"], [12, "CAMBRIDGE"], [13, "CARLETON-MISSISSIPPI MILLS"], [14, "CHATHAM-KENT-ESSEX"], [15, "DAVENPORT"], [16, "DON VALLEY EAST"], [17, "DON VALLEY WEST"], [18, "DUFFERIN-CALEDON"], [19, "DURHAM"], [20, "EGLINTON-LAWRENCE"], [21, "ELGIN-MIDDLESEX-LONDON"], [22, "ESSEX"], [23, "ETOBICOKE CENTRE"], [24, "ETOBICOKE-LAKESHORE"], [25, "ETOBICOKE NORTH"], [26, "GLENGARRY-PRESCOTT-RUSSELL"], [27, "GUELPH"], [28, "HALDIMAND-NORFOLK"], [29, "HALIBURTON-KAWARTHA LAKES-BROCK"], [30, "HALTON"], [31, "HAMILTON CENTRE"], [32, "HAMILTON EAST-STONEY CREEK"], [33, "HAMILTON MOUNTAIN"], [34, "HURON-BRUCE"], [35, "KENORA-RAINY RIVER"], [36, "KINGSTON AND THE ISLANDS"], [37, "KITCHENER CENTRE"], [38, "KITCHENER-CONESTOGA"], [39, "KITCHENER-WATERLOO"], [40, "LAMBTON-KENT-MIDDLESEX"], [41, "LANARK-FRONTENAC-LENNOX AND ADDINGTON"], [42, "LEEDS-GRENVILLE"], [43, "LONDON-FANSHAWE"], [44, "LONDON NORTH CENTRE"], [45, "LONDON WEST"], [46, "MARKHAM-UNIONVILLE"], [47, "MISSISSAUGA-BRAMPTON SOUTH"], [48, "MISSISSAUGA EAST-COOKSVILLE"], [49, "MISSISSAUGA-ERINDALE"], [50, "MISSISSAUGA SOUTH"], [51, "MISSISSAUGA-STREETSVILLE"], [52, "NEPEAN-CARLETON"], [53, "NEWMARKET-AURORA"], [54, "NIAGARA FALLS"], [55, "NIAGARA WEST-GLANBROOK"], [56, "NICKEL BELT "], [57, "NIPISSING"], [58, "NORTHUMBERLAND-QUINTE WEST"], [59, "OAK RIDGES-MARKHAM"], [60, "OAKVILLE"], [61, "OSHAWA"], [62, "OTTAWA CENTRE"], [63, "OTTAWA-ORLÉANS"], [64, "OTTAWA SOUTH"], [65, "OTTAWA-VANIER"], [66, "OTTAWA WEST-NEPEAN"], [67, "OXFORD"], [68, "PARKDALE-HIGH PARK"], [69, "PARRY SOUND-MUSKOKA"], [70, "PERTH-WELLINGTON"], [71, "PETERBOROUGH"], [72, "PICKERING-SCARBOROUGH EAST"], [73, "PRINCE EDWARD-HASTINGS"], [74, "RENFREW-NIPISSING-PEMBROKE"], [75, "RICHMOND HILL"], [76, "ST. CATHARINES"], [77, "ST. PAUL'S"], [78, "SARNIA-LAMBTON"], [79, "SAULT STE. MARIE"], [80, "SCARBOROUGH-AGINCOURT"], [81, "SCARBOROUGH CENTRE"], [82, "SCARBOROUGH-GUILDWOOD"], [83, "SCARBOROUGH-ROUGE RIVER"], [84, "SCARBOROUGH SOUTHWEST"], [85, "SIMCOE-GREY"], [86, "SIMCOE NORTH"], [87, "STORMONT-DUNDAS-SOUTH GLENGARRY "], [88, "SUDBURY"], [89, "THORNHILL"], [90, "THUNDER BAY-ATIKOKAN"], [91, "THUNDER BAY-SUPERIOR NORTH"], [92, "TIMISKAMING-COCHRANE"], [93, "TIMMINS-JAMES BAY"], [94, "TORONTO CENTRE"], [95, "TORONTO-DANFORTH"], [96, "TRINITY-SPADINA"], [97, "VAUGHAN"], [98, "WELLAND"], [99, "WELLINGTON-HALTON HILLS"], [100, "WHITBY-OSHAWA"], [101, "WILLOWDALE"], [102, "WINDSOR-TECUMSEH"], [103, "WINDSOR WEST"], [104, "YORK CENTRE"], [105, "YORK-SIMCOE"], [106, "YORK SOUTH-WESTON"], [107, "YORK WEST"]];

var adjacencyMatrix = {"1": [19, 59, 72, 83, 100], "2": [10, 56, 69, 79, 91, 93], "3": [9, 11, 12, 28, 30, 31, 33, 55, 99], "4": [85, 86, 105], "5": [16, 17, 84, 95], "6": [7, 18, 25, 47, 97], "7": [6, 8, 18, 47], "8": [7, 18, 47, 51, 99], "9": [3, 12, 28, 67], "10": [2, 18, 34, 70, 85], "11": [3, 30, 32, 60], "12": [3, 9, 37, 38, 67, 99], "13": [41, 52, 66, 74], "14": [21, 22, 40], "15": [20, 68, 77, 96, 106], "16": [5, 17, 80, 81, 84, 101], "17": [5, 16, 20, 77, 94, 95, 101], "18": [6, 7, 8, 10, 59, 70, 85, 97, 99], "19": [1, 29, 58, 59, 61, 100, 105], "20": [15, 17, 77, 101, 104, 106], "21": [14, 28, 40, 43, 45, 67, 70], "22": [14, 40, 102, 103], "23": [24, 25, 47, 48, 68, 106], "24": [23, 48, 50, 68], "25": [6, 23, 47, 97, 106, 107], "26": [52, 63, 87], "27": [99], "28": [3, 9, 21, 55, 67, 98], "29": [19, 57, 58, 69, 71, 73, 74, 86, 105], "30": [3, 11, 49, 51, 60, 99], "31": [3, 32, 33], "32": [11, 31, 33, 55], "33": [3, 31, 32, 55], "34": [10, 40, 70], "35": [90, 91, 93], "36": [41, 42], "37": [12, 38, 39], "38": [12, 37, 39, 67, 70, 99], "39": [37, 38], "40": [14, 21, 22, 34, 43, 44, 45, 70, 78], "41": [13, 36, 42, 52, 73, 74], "42": [36, 41, 52, 87], "43": [21, 40, 44, 45], "44": [40, 43, 45], "45": [21, 40, 43, 44], "46": [59, 75, 80, 83, 89, 101], "47": [6, 7, 8, 23, 25, 48, 49, 51], "48": [23, 24, 47, 49, 50], "49": [30, 47, 48, 50, 51, 60], "50": [24, 48, 49, 60], "51": [8, 30, 47, 49, 99], "52": [13, 26, 41, 42, 63, 64, 66, 87], "53": [59, 105], "54": [76, 98], "55": [3, 28, 32, 33, 76, 98], "56": [2, 69, 88, 92, 93], "57": [29, 69, 74, 92], "58": [19, 29, 71, 73], "59": [1, 18, 19, 46, 53, 75, 83, 85, 97, 105], "60": [11, 30, 49, 50], "61": [19, 100], "62": [64, 65, 66], "63": [26, 52, 64, 65], "64": [52, 62, 63, 65, 66], "65": [62, 63, 64], "66": [13, 52, 62, 64], "67": [9, 12, 21, 28, 38, 70], "68": [15, 23, 24, 96, 106], "69": [2, 29, 56, 57, 86, 92], "70": [10, 18, 21, 34, 38, 40, 67, 99], "71": [29, 58, 73], "72": [1, 82, 83], "73": [29, 41, 58, 71, 74], "74": [13, 29, 41, 57, 73], "75": [46, 59, 89, 97], "76": [54, 55, 98], "77": [15, 17, 20, 94, 96], "78": [40], "79": [2], "80": [16, 46, 81, 83, 101], "81": [16, 80, 82, 83, 84], "82": [72, 81, 83, 84], "83": [1, 46, 59, 72, 80, 81, 82], "84": [5, 16, 81, 82], "85": [4, 10, 18, 59, 86, 105], "86": [4, 29, 69, 85, 105], "87": [26, 42, 52], "88": [56], "89": [46, 75, 97, 101, 104, 107], "90": [35, 91], "91": [2, 35, 90, 93], "92": [56, 57, 69, 93], "93": [2, 35, 56, 91, 92], "94": [17, 77, 95, 96], "95": [5, 17, 94, 96], "96": [15, 68, 77, 94, 95], "97": [6, 18, 25, 59, 75, 89, 107], "98": [28, 54, 55, 76], "99": [3, 8, 12, 18, 27, 30, 38, 51, 70], "100": [1, 19, 61], "101": [16, 17, 20, 46, 80, 89, 104], "102": [22, 103], "103": [22, 102], "104": [20, 89, 101, 106, 107], "105": [4, 19, 29, 53, 59, 85, 86], "106": [15, 20, 23, 25, 68, 104, 107], "107": [25, 89, 97, 104, 106]};
	
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
      
      numAdjacent = adjacencyMatrix[this.get('rID')].length;
      
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