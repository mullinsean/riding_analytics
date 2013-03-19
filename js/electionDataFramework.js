var ridingNameList = [[1, "AJAX-PICKERING"], [2, "ALGOMA-MANITOULIN"], [3, "ANCASTER-DUNDAS-FLAMBOROUGH-WESTDALE"], [4, "BARRIE"], [5, "BEACHES-EAST YORK"], [6, "BRAMALEA-GORE-MALTON"], [7, "BRAMPTON-SPRINGDALE"], [8, "BRAMPTON WEST"], [9, "BRANT"], [10, "BRUCE-GREY-OWEN SOUND"], [11, "BURLINGTON"], [12, "CAMBRIDGE"], [13, "CARLETON-MISSISSIPPI MILLS"], [14, "CHATHAM-KENT-ESSEX"], [15, "DAVENPORT"], [16, "DON VALLEY EAST"], [17, "DON VALLEY WEST"], [18, "DUFFERIN-CALEDON"], [19, "DURHAM"], [20, "EGLINTON-LAWRENCE"], [21, "ELGIN-MIDDLESEX-LONDON"], [22, "ESSEX"], [23, "ETOBICOKE CENTRE"], [24, "ETOBICOKE-LAKESHORE"], [25, "ETOBICOKE NORTH"], [26, "GLENGARRY-PRESCOTT-RUSSELL"], [27, "GUELPH"], [28, "HALDIMAND-NORFOLK"], [29, "HALIBURTON-KAWARTHA LAKES-BROCK"], [30, "HALTON"], [31, "HAMILTON CENTRE"], [32, "HAMILTON EAST-STONEY CREEK"], [33, "HAMILTON MOUNTAIN"], [34, "HURON-BRUCE"], [35, "KENORA-RAINY RIVER"], [36, "KINGSTON AND THE ISLANDS"], [37, "KITCHENER CENTRE"], [38, "KITCHENER-CONESTOGA"], [39, "KITCHENER-WATERLOO"], [40, "LAMBTON-KENT-MIDDLESEX"], [41, "LANARK-FRONTENAC-LENNOX AND ADDINGTON"], [42, "LEEDS-GRENVILLE"], [43, "LONDON-FANSHAWE"], [44, "LONDON NORTH CENTRE"], [45, "LONDON WEST"], [46, "MARKHAM-UNIONVILLE"], [47, "MISSISSAUGA-BRAMPTON SOUTH"], [48, "MISSISSAUGA EAST-COOKSVILLE"], [49, "MISSISSAUGA-ERINDALE"], [50, "MISSISSAUGA SOUTH"], [51, "MISSISSAUGA-STREETSVILLE"], [52, "NEPEAN-CARLETON"], [53, "NEWMARKET-AURORA"], [54, "NIAGARA FALLS"], [55, "NIAGARA WEST-GLANBROOK"], [56, "NICKEL BELT "], [57, "NIPISSING"], [58, "NORTHUMBERLAND-QUINTE WEST"], [59, "OAK RIDGES-MARKHAM"], [60, "OAKVILLE"], [61, "OSHAWA"], [62, "OTTAWA CENTRE"], [63, "OTTAWA-ORLÉANS"], [64, "OTTAWA SOUTH"], [65, "OTTAWA-VANIER"], [66, "OTTAWA WEST-NEPEAN"], [67, "OXFORD"], [68, "PARKDALE-HIGH PARK"], [69, "PARRY SOUND-MUSKOKA"], [70, "PERTH-WELLINGTON"], [71, "PETERBOROUGH"], [72, "PICKERING-SCARBOROUGH EAST"], [73, "PRINCE EDWARD-HASTINGS"], [74, "RENFREW-NIPISSING-PEMBROKE"], [75, "RICHMOND HILL"], [76, "ST. CATHARINES"], [77, "ST. PAUL'S"], [78, "SARNIA-LAMBTON"], [79, "SAULT STE. MARIE"], [80, "SCARBOROUGH-AGINCOURT"], [81, "SCARBOROUGH CENTRE"], [82, "SCARBOROUGH-GUILDWOOD"], [83, "SCARBOROUGH-ROUGE RIVER"], [84, "SCARBOROUGH SOUTHWEST"], [85, "SIMCOE-GREY"], [86, "SIMCOE NORTH"], [87, "STORMONT-DUNDAS-SOUTH GLENGARRY "], [88, "SUDBURY"], [89, "THORNHILL"], [90, "THUNDER BAY-ATIKOKAN"], [91, "THUNDER BAY-SUPERIOR NORTH"], [92, "TIMISKAMING-COCHRANE"], [93, "TIMMINS-JAMES BAY"], [94, "TORONTO CENTRE"], [95, "TORONTO-DANFORTH"], [96, "TRINITY-SPADINA"], [97, "VAUGHAN"], [98, "WELLAND"], [99, "WELLINGTON-HALTON HILLS"], [100, "WHITBY-OSHAWA"], [101, "WILLOWDALE"], [102, "WINDSOR-TECUMSEH"], [103, "WINDSOR WEST"], [104, "YORK CENTRE"], [105, "YORK-SIMCOE"], [106, "YORK SOUTH-WESTON"], [107, "YORK WEST"]];
	
//var map;

var ridingData, mapData;
var riding = null;

$( document ).ready(function() {
 
  var Riding = Backbone.Model.extend({
    defaults : {
      rName : "Trinity-Spadina",
      rID : 93,
      electionYear : 2011,
      ridingDataLoaded : false,
      mapDataLoaded : false,
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
      
      fileStr = "https://frogcakeskierscuba.s3.amazonaws.com/ontario" + this.get('electionYear') + "/ridingMapData_" + this.get( 'rID' ) + ".json";
      //fileStr = "http://individual.utoronto.ca/seanmullin/testing/ridingMapData_96.json";
      $.getJSON(fileStr, function(data) {
        mapData = data;
        self.set( 'mapDataLoaded', true );
        if( self.get( 'ridingDataLoaded' )) {
          self.trigger( 'ridingHasLoaded' );
        }
      });    

      fileStr = "https://frogcakeskierscuba.s3.amazonaws.com/ontario" + this.get('electionYear') + "/Ont" + this.get('electionYear') + "_" + this.get( 'rID' ) + ".json";
      //fileStr = "http://individual.utoronto.ca/seanmullin/testing/Ont2007_96.json";
      $.getJSON(fileStr, function(data) {
        ridingData = data;
        self.set('ridingDataLoaded', true );
        if( self.get( 'mapDataLoaded' )) {
          self.trigger( 'ridingHasLoaded' );
        }
      });
    },
    
    ridingLoaded: function() {
      console.log( "Riding data has now loaded." );
      if( riding ) {
        riding.closeMap();
      }
      riding = new ElectionData.Riding( mapData, ridingData );
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
      
	  this.map = new google.maps.Map( $("#map_canvas").get(0), mapOptions);
      
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
      this.model.set( { 'rID' : $('#ridingNumber').val(), 'electionYear' : $('#election').val() } );
      console.log( "Changed to " + $('#ridingNumber').val() + " " + $('#election').val());
      this.render();
    },
    
    changeName: function() {
      this.model.set( { 'rName' : "Name: " + $('#ridingID').val() } );
    },
    
    updateRiding: function() {

      riding.initMap( this.map );
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