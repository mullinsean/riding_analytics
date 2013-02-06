(function() {
  
  var root = this;  
  var ElectionData = root.ElectionData = {};
  
  
  
  //////////////////////////////////////////////////////////////////////////////////////////
  // Poll object definition.
  
  ElectionData.Poll = function( pollData ) {
  
   pollData.hasOwnProperty( "poll_number" ) ? this.pollNumber = parseInt( pollData.poll_number ) : this.pollNumber = 0;
  
   pollData.hasOwnProperty( "coords" ) ? this.coords = pollData.coords : this.coords = [];
   
   
   
   this.location = "";
   
   this.gMapsObj = null;
   this.gPoly = null;
   this.results = {};
   
   this.polyOpts = {
    paths: [],
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35
   }; 
      
  };
  
/* ElectionData.Poll.prototype.init = function( pollData ) {
     this.pollNumber = pollData["poll_number"];
	 
	 this.coords = pollData.coords;
	 return this;
  };*/
  
  ElectionData.Poll.prototype.initMap = function( map ) {
     this.gMapsObj = map;
	 
	 var i;
	 for( i = 0; i < this.coords.length; i++ ) {
	     this.polyOpts.paths[i] = new google.maps.LatLng(this.coords[i][0], this.coords[i][1]);
     }
	 
     this.gPoly = new google.maps.Polygon( this.polyOpts );
     return this;
  };
  
  ElectionData.Poll.prototype.getPollNum = function() {
     return this.pollNumber;
  }; 

  ElectionData.Poll.prototype.setDisplayOptions = function( displayOptions ) {
     if( displayOptions.hasOwnProperty( "strokeColor" )) {
	   this.polyOpts.strokeColor = displayOptions.strokeColor;
	 }
     if( displayOptions.hasOwnProperty( "strokeOpacity" )) {
	   this.polyOpts.strokeOpacity = displayOptions.strokeOpacity;
	 }	 
     if( displayOptions.hasOwnProperty( "strokeWeight" )) {
	   this.polyOpts.strokeWeight = displayOptions.strokeWeight;
	 }  
     if( displayOptions.hasOwnProperty( "fillColor" )) {
	   this.polyOpts.fillColor = displayOptions.fillColor;
	 }  
     if( displayOptions.hasOwnProperty( "fillOpacity" )) {
	   this.polyOpts.fillOpacity = displayOptions.fillOpacity;
	 }   
	 
	 if( this.gPoly != null ) {
	   this.gPoly.setOptions( this.polyOpts );
	 }
	 
     return this;
  }; 

  ElectionData.Poll.prototype.setFillColor = function( color ) {
     var displayOptions = {
	   fillColor : color
	 };
	 
	 this.setDisplayOptions( displayOptions );
     return this;
  }; 
  
  ElectionData.Poll.prototype.setLineColor = function( color ) {
     var displayOptions = {
	   strokeColor : color
	 };
	 
	 this.setDisplayOptions( displayOptions );
     return this;
  }; 
  
  ElectionData.Poll.prototype.setOpacity = function( opacity ) {
     var displayOptions = {
	   fillOpacity : opacity
	 };
	 
	 this.setDisplayOptions( displayOptions );
     return this;
  }; 
  
  ElectionData.Poll.prototype.getPollNum = function() {
     return this.pollNumber;
  }; 
    
  
  ElectionData.Poll.prototype.show = function() {
     if( this.gMapsObj != null && this.gPoly != null )
	   this.gPoly.setMap( this.gMapsObj );
     return this;
  };
  
  ElectionData.Poll.prototype.hide = function() {
     this.gPoly.setMap( null );
     return this;
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  // Riding object definition.
  
  ElectionData.Riding = function( ridingData, map ) {
  
   ridingData.hasOwnProperty( "name" ) ? this.ridingName = ridingData.name : this.ridingName = "";
   ridingData.hasOwnProperty( "id" ) ? this.ridingID = ridingData.id : this.ridingID = 0;
   ridingData.hasOwnProperty( "num_polls" ) ? this.numPolls = ridingData.num_polls : this.numPolls = 0;
  
   this.electionYear = 2011;
   this.electionType = "provincial";
   this.ridingCoords = [];
   
   this.pollList = [];
   
   this.gMapsObj = map;
   this.gPoly = null;
   this.results = {};
   
   this.polyOpts = {
    paths: [],
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35
   }; 
   
   var i;
	 for( i = 0; i < this.numPolls; i++ ) {
	   this.pollList[i] = new ElectionData.Poll(ridingData.polls[i] );
	   this.pollList[i].initMap(this.gMapsObj);
	 }
     return this;
  };
  
  ElectionData.Riding.prototype.showPolls = function() {
  
    var i;
    for( i = 0; i < this.numPolls; i++ ) {
      setInterval(this.pollList[i].show(), 100 );
    }
	
    return this;
  };
  
  ElectionData.Riding.prototype.hidePolls = function() {
  
    var i;
    for( i = 0; i < this.numPolls; i++ ) {
      this.pollList[i].hide();
    }
	
    return this;
  };  

  ElectionData.Riding.prototype.showPoll = function( n ) {
  
    var i;
	
	for( i = 0; i < this.numPolls; i++ ) {
	  if( this.pollList[i].pollNumber == n ) {
	    console.log( "Found poll: " + n );
	    this.pollList[i].show();
	  }
    }
	
    return this;
  };  

  ElectionData.Riding.prototype.hidePoll = function( n ) {
  
    var i;
	
    for( i = 0; i < this.numPolls; i++ ) {
	  if( this.pollList[i].pollNumber == n ) {
	    console.log( "Found poll: " + n );
	    this.pollList[i].hide();
	  }
    }
	
    return this;
  };  
  
})();

  
  


