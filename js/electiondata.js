(function() {
  
  var root = this;  
  var ElectionData = root.ElectionData = {};
  
  
  // One info window for the entire application.
  
  var infoWindowObj = new google.maps.InfoWindow();
  
  var partyGradients = 
  {
    "ND" : ["#FBBF8B", "#FAAF6E", "#F99F51", "#F88F34", "#F88017", "#D97014", "#BA6011", "#9B500E"],
    "PC" : ["#7F7FFF", "#5F5FFF", "#3F3FFF", "#1F1FFF", "#0000FF", "#0000CF", "#00009F", "#00006F"],
    "L" :  ["#FF7F7F", "#FF5F5F", "#FF3F3F", "#FF1F1F", "#FF0000", "#CF0000", "#9F0000", "#6F0000"]
  };
  
  var colorChooser = function( party, percentage )
  {
    var gradients = [35, 40, 45, 50, 60, 70, 80];
    var i;
    var returnValue = "";
    
    if( party == "" ) {
      return "#777777";
    }
    
    for( i = 0; i < gradients.length - 1; i++ ) {
      if( percentage < gradients[i] ) {
        return partyGradients[party][i];
      }
    }
    
    return partyGradients[party][i];
  };

  
  
  
  //////////////////////////////////////////////////////////////////////////////////////////
  // Poll object definition.
  
  ElectionData.Poll = function( pollData, pollResults ) {
  
   pollData.hasOwnProperty( "poll_number" ) ? this.pollNumber = parseInt( pollData.poll_number ) : this.pollNumber = 0;
  
   pollData.hasOwnProperty( "coords" ) ? this.coords = pollData.coords : this.coords = [];
   
   if( pollResults == null || pollResults.noPoll == true ) {
     this.noPoll = true;
   } 
   else {
     this.noPoll = false;
   }
   
   this.location = "";
   
   this.gMapsObj = null;
   this.gPoly = null;
   this.infoWindowObj = null;
   
   this.pollResults = pollResults;
   
   console.log( "Poll Number: " + this.pollNumber + " No Poll: " + this.noPoll );
     
   if( this.noPoll == false ) {
     var colour = colorChooser( this.pollResults.winner, this.pollResults.candidates[0].percentage );
   }
   else {
     var colour = "#777777";
   }
   
   this.polyOpts = {
    paths: [[]],
    strokeColor: "#222222",
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: colour,
    fillOpacity: 1.0
   }; 
      
  };
  
/* ElectionData.Poll.prototype.init = function( pollData ) {
     this.pollNumber = pollData["poll_number"];
	 
	 this.coords = pollData.coords;
	 return this;
  };*/
  
  ElectionData.Poll.prototype.initMap = function( map ) {
     this.gMapsObj = map;
	 
	 var i, j;
	 for( i = 0; i < this.coords.length; i++ ) {
         this.polyOpts.paths[i] = [];
       for( j = 0; j < this.coords[i].length; j++ ) {
	     this.polyOpts.paths[i].push( new google.maps.LatLng(this.coords[i][j][0], this.coords[i][j][1]));
       }
     }
	 
     this.gPoly = new google.maps.Polygon( this.polyOpts );
	 
	 // add event listener for the poll
	 
	 (function( poll ) {
	   google.maps.event.addListener( poll.gPoly, 'click', function( e ) { 
	     
		 var str = "Click from poll #" + poll.pollNumber + "<br>";
         
         console.log( poll.pollResults.pollLocation );
         
         for( i in poll.pollResults ) {
           if( poll.pollResults.hasOwnProperty( i ) ) {
             if( i == "placeName" || i == "electors" || i == "validVotes" || i == "pollLocation" || i == "percentTurnout" ) {
               str += i + ": " + poll.pollResults[i] + "<br>";
             }
           }
         }
         
         str += "<br><br><B>Results:</B><br>";
       
         for( i = 0; i < poll.pollResults.candidates.length; i++ ) {
           str += poll.pollResults.candidates[i].party + ": " + poll.pollResults.candidates[i].votes + " (" + poll.pollResults.candidates[i].percentage + "%)<br>";
         }
             
		 
		 infoWindowObj.setContent( str );
		 infoWindowObj.setPosition( e.latLng );
		 infoWindowObj.open( poll.gMapsObj );
		 
		 //poll.setFillColor( "#0000FF" );
		 
	     console.log( "Click from poll #" + poll.pollNumber  ); 
	   });
	 })( this );
	 
     return this;
  };
  
  ElectionData.Poll.prototype.getPollNum = function() {
     return this.pollNumber;
  }; 
  
  ElectionData.Poll.prototype.getWinner = function() {
    if( !this.pollResults ) {
      return "";
    }
    else {
      return this.pollResults.winner;
    }
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
  
  ElectionData.Riding = function( ridingData, ridingResults, map ) {
  
   ridingData.hasOwnProperty( "name" ) ? this.ridingName = ridingData.name : this.ridingName = "";
   ridingData.hasOwnProperty( "id" ) ? this.ridingID = ridingData.id : this.ridingID = 0;
   ridingData.hasOwnProperty( "num_polls" ) ? this.numPolls = ridingData.num_polls : this.numPolls = 0;
  
   this.electionYear = 2011;
   this.electionType = "provincial";
   this.ridingCoords = [];
   
   this.pollList = [];
   
   this.ridingResults = ridingResults;
   
   this.gMapsObj = map;
   this.gPoly = null;
   //this.results = {};
   
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
     if( ridingResults.polls.hasOwnProperty( ridingData.polls[i].poll_number )) {
       console.log( "Adding: " + ridingData.polls[i].poll_number );
       this.pollList[i] = new ElectionData.Poll(ridingData.polls[i], ridingResults.polls[ridingData.polls[i].poll_number] );
	   this.pollList[i].initMap(this.gMapsObj);
     }
     else {
       console.log( "No results data for: " + ridingData.polls[i].poll_number );
       this.pollList[i] = new ElectionData.Poll(ridingData.polls[i], null );
	   this.pollList[i].initMap(this.gMapsObj);            
    }
   }
   return this;
  };
  
  ElectionData.Riding.prototype.showPolls = function() {
  
    var i;
    for( i = 0; i < this.numPolls; i++ ) {
      this.pollList[i].show();
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
	    this.pollList[i].show();
	  }
    }
	
    return this;
  };  

  ElectionData.Riding.prototype.hidePoll = function( n ) {
  
    var i;
	
    for( i = 0; i < this.numPolls; i++ ) {
	  if( this.pollList[i].pollNumber == n ) {
	    this.pollList[i].hide();
	  }
    }
	
    return this;
  };  
  
})();

  
  


