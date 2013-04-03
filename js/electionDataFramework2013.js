/*var ridingNameList = [[1, "Ajax"], [2, "Algoma-Manitoulin-Kapuskasing"], [3, "Ancaster"], [4, "Aurora-Richmond Hill"], [5, "Barrie-Innisfil"], [6, "Barrie-Oro-Springwater"], [7, "Bay of Quinte"], [8, "Beaches-East York"], [9, "Brampton Centre"], [10, "Brampton East"], [11, "Brampton North"], [12, "Brampton South"], [13, "Brampton West"], [14, "Brant"], [15, "Bruce-Grey-Owen Sound"], [16, "Burlington"], [17, "Cambridge"], [18, "Chatham-Kent-Leamington"], [19, "Davenport"], [20, "Don Valley East"], [21, "Don Valley North"], [22, "Don Valley West"], [23, "Dufferin-Caledon"], [24, "Eglinton-Lawrence"], [25, "Elgin-Middlesex-London"], [26, "Essex"], [27, "Etobicoke Centre"], [28, "Etobicoke-Lakeshore"], [29, "Etobicoke North"], [30, "Flamborough-Glanbrook"], [31, "Glengarry-Prescott-Russell"], [32, "Guelph"], [33, "Haldimand-Norfolk"], [34, "Haliburton-Kawartha Lakes-Brock"], [35, "Hamilton Centre"], [36, "Hamilton East-Stoney Creek"], [37, "Hamilton Mountain"], [38, "Hastings-Lennox and Addington"], [39, "Huron-Bruce"], [40, "Kanata-Carleton"], [41, "Kenora"], [42, "King-Vaughan"], [43, "Kingston and the Islands"], [44, "Kitchener Centre"], [45, "Kitchener-Conestoga"], [46, "Kitchener South-Hespeler"], [47, "Lambton-Kent-Middlesex"], [48, "Lanark-Frontenac"], [49, "Leeds-Grenville"], [50, "London-Fanshawe"], [51, "London North Centre"], [52, "London West"], [53, "Markham-Stouffville"], [54, "Markham-Thornhill"], [55, "Markham-Unionville"], [56, "Milton"], [57, "Mississauga Centre"], [58, "Mississauga East-Cooksville"], [59, "Mississauga-Erin Mills"], [60, "Mississauga North"], [61, "Mississauga South"], [62, "Mississauga West-Streetsville"], [63, "Nepean"], [64, "Newmarket-Aurora"], [65, "Niagara Centre"], [66, "Niagara Falls"], [67, "Niagara West"], [68, "Nickel Belt"], [69, "Nipissing-Timiskaming"], [70, "Northumberland-Pine Ridge"], [71, "Oakville North-Burlington"], [72, "Oakville South"], [73, "Oshawa"], [74, "Oshawa-Durham"], [75, "Ottawa Centre"], [76, "Ottawa-Orl-ans"], [77, "Ottawa South"], [78, "Ottawa-Vanier"], [79, "Ottawa West-Nepean"], [80, "Oxford"], [81, "Parkdale-High Park"], [82, "Parry Sound-Muskoka"], [83, "Perth-Wellington"], [84, "Peterborough"], [85, "Pickering-Uxbridge"], [86, "Renfrew-Pembroke"], [87, "Richmond Hill"], [88, "Rideau-Carleton"], [89, "St. Catharines"], [90, "St. Paul's"], [91, "Sarnia-Lambton"], [92, "Sault Ste. Marie"], [93, "Scarborough-Agincourt"], [94, "Scarborough Centre"], [95, "Scarborough East"], [96, "Scarborough-Rouge"], [97, "Scarborough Southwest"], [98, "Scarborough-Wexford"], [99, "Simcoe-Grey"], [100, "Simcoe North"], [101, "Spadina-Fort York"], [102, "Stormont-Dundas-South Glengarry"], [103, "Sudbury"], [104, "Thunder Bay-Rainy River"], [105, "Thunder Bay-Superior North"], [106, "Timmins-James Bay"], [107, "Toronto Centre"], [108, "Toronto-Danforth"], [109, "University-Rosedale"], [110, "Vaughan-Thornhill-Markham"], [111, "Vaughan-Woodbridge"], [112, "Waterloo"], [113, "Wellington-Halton Hills"], [114, "Whitby"], [115, "Willowdale"], [116, "Windsor-Tecumseh"], [117, "Windsor West"], [118, "York Centre"], [119, "York-Simcoe"], [120, "York South-Weston"], [121, "York West"]];*/

var ridingNameList = [[1, "AJAX-PICKERING"], [2, "ALGOMA-MANITOULIN"], [3, "ANCASTER-DUNDAS-FLAMBOROUGH-WESTDALE"], [4, "BARRIE"], [5, "BEACHES-EAST YORK"], [6, "BRAMALEA-GORE-MALTON"], [7, "BRAMPTON-SPRINGDALE"], [8, "BRAMPTON WEST"], [9, "BRANT"], [10, "BRUCE-GREY-OWEN SOUND"], [11, "BURLINGTON"], [12, "CAMBRIDGE"], [13, "CARLETON-MISSISSIPPI MILLS"], [14, "CHATHAM-KENT-ESSEX"], [15, "DAVENPORT"], [16, "DON VALLEY EAST"], [17, "DON VALLEY WEST"], [18, "DUFFERIN-CALEDON"], [19, "DURHAM"], [20, "EGLINTON-LAWRENCE"], [21, "ELGIN-MIDDLESEX-LONDON"], [22, "ESSEX"], [23, "ETOBICOKE CENTRE"], [24, "ETOBICOKE-LAKESHORE"], [25, "ETOBICOKE NORTH"], [26, "GLENGARRY-PRESCOTT-RUSSELL"], [27, "GUELPH"], [28, "HALDIMAND-NORFOLK"], [29, "HALIBURTON-KAWARTHA LAKES-BROCK"], [30, "HALTON"], [31, "HAMILTON CENTRE"], [32, "HAMILTON EAST-STONEY CREEK"], [33, "HAMILTON MOUNTAIN"], [34, "HURON-BRUCE"], [35, "KENORA-RAINY RIVER"], [36, "KINGSTON AND THE ISLANDS"], [37, "KITCHENER CENTRE"], [38, "KITCHENER-CONESTOGA"], [39, "KITCHENER-WATERLOO"], [40, "LAMBTON-KENT-MIDDLESEX"], [41, "LANARK-FRONTENAC-LENNOX AND ADDINGTON"], [42, "LEEDS-GRENVILLE"], [43, "LONDON-FANSHAWE"], [44, "LONDON NORTH CENTRE"], [45, "LONDON WEST"], [46, "MARKHAM-UNIONVILLE"], [47, "MISSISSAUGA-BRAMPTON SOUTH"], [48, "MISSISSAUGA EAST-COOKSVILLE"], [49, "MISSISSAUGA-ERINDALE"], [50, "MISSISSAUGA SOUTH"], [51, "MISSISSAUGA-STREETSVILLE"], [52, "NEPEAN-CARLETON"], [53, "NEWMARKET-AURORA"], [54, "NIAGARA FALLS"], [55, "NIAGARA WEST-GLANBROOK"], [56, "NICKEL BELT "], [57, "NIPISSING"], [58, "NORTHUMBERLAND-QUINTE WEST"], [59, "OAK RIDGES-MARKHAM"], [60, "OAKVILLE"], [61, "OSHAWA"], [62, "OTTAWA CENTRE"], [63, "OTTAWA-ORLÉANS"], [64, "OTTAWA SOUTH"], [65, "OTTAWA-VANIER"], [66, "OTTAWA WEST-NEPEAN"], [67, "OXFORD"], [68, "PARKDALE-HIGH PARK"], [69, "PARRY SOUND-MUSKOKA"], [70, "PERTH-WELLINGTON"], [71, "PETERBOROUGH"], [72, "PICKERING-SCARBOROUGH EAST"], [73, "PRINCE EDWARD-HASTINGS"], [74, "RENFREW-NIPISSING-PEMBROKE"], [75, "RICHMOND HILL"], [76, "ST. CATHARINES"], [77, "ST. PAUL'S"], [78, "SARNIA-LAMBTON"], [79, "SAULT STE. MARIE"], [80, "SCARBOROUGH-AGINCOURT"], [81, "SCARBOROUGH CENTRE"], [82, "SCARBOROUGH-GUILDWOOD"], [83, "SCARBOROUGH-ROUGE RIVER"], [84, "SCARBOROUGH SOUTHWEST"], [85, "SIMCOE-GREY"], [86, "SIMCOE NORTH"], [87, "STORMONT-DUNDAS-SOUTH GLENGARRY "], [88, "SUDBURY"], [89, "THORNHILL"], [90, "THUNDER BAY-ATIKOKAN"], [91, "THUNDER BAY-SUPERIOR NORTH"], [92, "TIMISKAMING-COCHRANE"], [93, "TIMMINS-JAMES BAY"], [94, "TORONTO CENTRE"], [95, "TORONTO-DANFORTH"], [96, "TRINITY-SPADINA"], [97, "VAUGHAN"], [98, "WELLAND"], [99, "WELLINGTON-HALTON HILLS"], [100, "WHITBY-OSHAWA"], [101, "WILLOWDALE"], [102, "WINDSOR-TECUMSEH"], [103, "WINDSOR WEST"], [104, "YORK CENTRE"], [105, "YORK-SIMCOE"], [106, "YORK SOUTH-WESTON"], [107, "YORK WEST"]];

var adjacencyMatrix = {"1": [1, 85], "2": [2, 15, 68, 92, 105, 106], "3": [3, 30], "4": [5, 6], "5": [8], "6": [9, 10, 11, 60], "7": [9, 10, 11], "8": [12, 13], "9": [14, 17, 80], "10": [15, 39, 83], "11": [16], "12": [17, 46], "13": [40, 48, 88], "14": [18], "15": [19], "16": [20, 21], "17": [20, 22], "18": [23], "19": [70, 74, 85], "20": [24], "21": [25, 50], "22": [18, 26], "23": [27, 29], "24": [27, 28], "25": [29], "26": [31, 76], "27": [32], "28": [14, 33], "29": [34, 38, 69, 82, 84, 86], "30": [56, 59, 62, 71], "31": [3, 35], "32": [35, 36], "33": [3, 30, 37], "34": [39], "35": [41, 104, 105, 106], "36": [43, 48], "37": [44, 45, 46], "38": [45, 46], "39": [44, 45, 112], "40": [18, 25, 47], "41": [38, 48, 49, 86], "42": [48, 49], "43": [50], "44": [50, 51], "45": [51, 52], "46": [53, 54, 55], "47": [9, 12, 57, 58, 60, 62], "48": [57, 58], "49": [57, 59, 61], "50": [61], "51": [57, 60, 62], "52": [40, 63, 76, 88], "53": [4, 64], "54": [66], "55": [30, 67], "56": [2, 68, 103, 106], "57": [68, 69, 82], "58": [7, 70], "59": [4, 42, 53, 55], "60": [72], "61": [73, 74], "62": [75], "63": [76, 78], "64": [77], "65": [78], "66": [79], "67": [80], "68": [81], "69": [34, 68, 82, 100], "70": [83], "71": [70, 84], "72": [85, 95, 96], "73": [7, 34, 38, 84], "74": [38, 48, 69, 86], "75": [4, 87], "76": [67, 89], "77": [22, 90], "78": [91], "79": [92], "80": [93, 98], "81": [94, 98], "82": [94, 95], "83": [93, 96], "84": [97], "85": [6, 99, 119], "86": [6, 82, 100], "87": [31, 49, 102], "88": [68, 103], "89": [54, 87, 110], "90": [41, 104, 105], "91": [2, 41, 104, 105, 106], "92": [68, 69, 106], "93": [2, 105, 106], "94": [101, 107, 109], "95": [108], "96": [101, 109], "97": [42, 111], "98": [65, 67], "99": [113], "100": [73, 74, 114], "101": [21, 115], "102": [116], "103": [117], "104": [115, 118], "105": [5, 64, 119], "106": [120], "107": [121]};
	
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
      
        fileStr = "https://frogcakeskierscuba.s3.amazonaws.com/ontario" + this.get('electionYear') + "/redistribution/ridingMapBoundaryData_" + adjacencyMatrix[this.get('rID')][i] + ".json";
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
      
      for( i = 0; i < ridingNameList.length; i++ ) {
        $('#ridingNumber').append( "<option value='" + ridingNameList[i][0] + "'>" + ridingNameList[i][0] + ". " + ridingNameList[i][1] + "</option>" );
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
      var displayOptions = {
	     strokeColor : "#0000FF"
	  };
	 
	  riding.setDisplayOptions( displayOptions );
     
      riding.showBoundary();
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