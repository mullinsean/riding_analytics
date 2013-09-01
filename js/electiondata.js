(function() {
  
  var root = this;  
  var ElectionData = root.ElectionData = {};
  
  
  // One info window for the entire application.
  
  var infoWindowObj = new google.maps.InfoWindow();
  
  var partyGradients = 
  {
    "ND" : ["#FFCF9F", "#FFBB77", "#FFA74F", "#FF9327", "#FF7F00"],
    "PC" : ["#9F9FFF", "#7777FF", "#4F4FFF", "#2727FF", "#0000FF"],
    "L" :  ["#FF9F9F", "#FF7777", "#FF4F4F", "#FF2727", "#FF0000"], 
    "GP" : ["#9FC59F", "#77AD77", "#4F954F", "#277D27", "#006600"]
  };
  
  var turnoutGradients = ["#BFCCBF", "#9FB29F", "#7F997F", "#5F7F5F", "#3F663F", "#1F4C1F", "#003300"];
  
  
  var colorChooser = function( party, percentage )
  {
    var gradients = [35, 40, 50, 60];
    
    var i;
   
    // NOTE: Fix case where Green party or other candidate wins poll.
    
    if( party == "" ) {
      return "#777777";
    }
    
    if( party != "ND" && party != "PC" && party != "L" && party != "GP") {
      return "#FF00FF";
    }
    
    for( i = 0; i < gradients.length - 1; i++ ) {
      if( percentage < gradients[i] ) {
        return partyGradients[party][i];
      }
    }
    
    return partyGradients[party][i];
  };
  
  var turnoutColorChooser = function( percentage )
  {
    var gradients = [20,30,35,40,50,60];
    
      for( i = 0; i < gradients.length - 1; i++ ) {
      if( percentage < gradients[i] ) {
        return turnoutGradients[i];
      }
    }
    
    return turnoutGradients[i];  
  }
  
  
  
  google.maps.Polygon.prototype.getBounds = function() {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;        
    for (var i = 0; i < paths.getLength(); i++) {
        path = paths.getAt(i);
        for (var ii = 0; ii < path.getLength(); ii++) {
            bounds.extend(path.getAt(ii));
        }
    }
    return bounds;
  };

  
  
  
  //////////////////////////////////////////////////////////////////////////////////////////
  // Poll object definition.
  
  ElectionData.Poll = function( pollData, pollResults ) {
  
   pollData.hasOwnProperty( "poll_number" ) ? this.pollNumber = parseInt( pollData.poll_number ) : this.pollNumber = 0;
  
   pollData.hasOwnProperty( "coords" ) ? this.coords = pollData.coords : this.coords = [];
   
   this.gMapsObj = null;
   this.gPoly = null;
   this.infoWindowObj = null;
   
   this.pollResults = pollResults;
   
   console.log( "Poll Number: " + this.pollNumber + " No Poll: " + this.noPoll() );
     
   if( this.noPoll() == false ) {
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
    fillOpacity: 0.6
   }; 
      
  };
  
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
	     
		 var str = "<B>Poll #" + poll.pollNumber + "</B><br><br>";
         
         for( i in poll.pollResults ) {
           if( poll.pollResults.hasOwnProperty( i ) ) {
             if( i == "placeName" ||  i == "pollLocation"  ) {
               str += "<b>" + poll.pollResults[i] + "</b><br>";
             }
             else if ( i == "electors"  ){
               str += "Electors: " + poll.pollResults[i] + "<br>";
             
             }
             else if ( i == "percentTurnout" ){
               str += "<br>Turnout: " + poll.pollResults[i] + "%<br>";
             
             }
             else if ( i == "validVotes" ){
               str += "Votes cast: " + poll.pollResults[i] + "<br>";
             
             }
           }
         }
         
         if( !poll.noPoll() ) {
           str += "<br><br><B>Results:</B><br><br>";
           str += "<table border='1'><tr><td>Party</td><td>Votes</td><td>%</td></tr>";
           
           for( i = 0; i < poll.pollResults.candidates.length; i++ ) {
             str += "<tr><td>" + poll.pollResults.candidates[i].party + "</td><td>" + poll.pollResults.candidates[i].votes + "</td><td>" + poll.pollResults.candidates[i].percentage + "%</td></tr>";
           }
           str += "</table>";
           
         }
         else {
           str += poll.pollResults.noPollMessage + "<br>";
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
  
  ElectionData.Poll.prototype.noPoll = function() {
    if( !this.hasOwnProperty( "pollResults" ) || this.pollResults == null ) {
      return true;
    }
    else {
      return this.pollResults.noPoll;
    }
  };  
  
  ElectionData.Poll.prototype.getWinner = function() {
    if( !this.hasOwnProperty( "pollResults" )) {
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
  
  ElectionData.Poll.prototype.setFillOption = function( fillOption ) {
    if( fillOption == "party" ) {
      if( this.noPoll() == false ) {
        var colour = colorChooser( this.pollResults.winner, this.pollResults.candidates[0].percentage );
      }
      else {
        var colour = "#777777";
      }    
      this.setFillColor( colour );
    }
    else if( fillOption == "turnout" ) {
      if( this.noPoll() == false ) {
        var colour = turnoutColorChooser( this.pollResults.percentTurnout );
      }
      else {
        var colour = "#777777";
      }    
      this.setFillColor( colour );        
    }
    return this;
  }; 
    
  
  ElectionData.Poll.prototype.show = function() {
  
     if( this.gMapsObj != null && this.gPoly != null )
	   this.gPoly.setMap( this.gMapsObj );
     return this;
  };
  
  ElectionData.Poll.prototype.hide = function() {
     if( infoWindowObj != null ) {
       infoWindowObj.close();
     }
     this.gPoly.setMap( null );
     return this;
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  // Riding object definition.
  
  ElectionData.Riding = function( ridingResults, boundaryData ) {
 
   this.electionYear = 2011;
   this.electionType = "provincial";
  
   this.ridingResults = ridingResults;
   
   this.pollList = {};
   
   this.gPoly = null;
   
   this.polyOpts = {
    paths: [[]],
    strokeColor: "#000000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#5F7F5F",
    fillOpacity: 0.0,
    zIndex: 10,
    clickable: false,
   }; 
   
   this.ridingCoords = boundaryData.coords;
   
   return this;
  };
   

  ElectionData.Riding.prototype.addPollData = function( ridingData ) {

     ridingData.hasOwnProperty( "name" ) ? this.ridingName = ridingData.name : this.ridingName = "";
     ridingData.hasOwnProperty( "id" ) ? this.ridingID = ridingData.id : this.ridingID = 0;
     ridingData.hasOwnProperty( "num_polls" ) ? this.numPolls = ridingData.num_polls : this.numPolls = 0;
  
     this.pollList = {};
     
     var i;
     
     for( i = 0; i < this.numPolls; i++ ) {
       console.log( "Index: " + i + ", Poll Num: " + ridingData.polls[i].poll_number );
       if( this.ridingResults.polls.hasOwnProperty( ridingData.polls[i].poll_number )) {
         console.log( "Adding: " + ridingData.polls[i].poll_number );
         this.pollList[ridingData.polls[i].poll_number] = new ElectionData.Poll(ridingData.polls[i], this.ridingResults.polls[ridingData.polls[i].poll_number] );
       }
       else {
         console.log( "No results data for: " + ridingData.polls[i].poll_number );
         this.pollList[ridingData.polls[i].poll_number] = new ElectionData.Poll(ridingData.polls[i], null );
      }
     }
     return this;
  };
  
  
  ElectionData.Riding.prototype.initMap = function( map ) {
     this.gMapsObj = map;
	 
	 var i, j;
	 for( i = 0; i < this.ridingCoords.length; i++ ) {
       this.polyOpts.paths[i] = [];
       for( j = 0; j < this.ridingCoords[i].length; j++ ) {
	     this.polyOpts.paths[i].push( new google.maps.LatLng(this.ridingCoords[i][j][0], this.ridingCoords[i][j][1]));
       }
     }
     
     this.gPoly = new google.maps.Polygon( this.polyOpts );
     
     if( this.pollList ) {
       for( i in this.pollList ) {
         this.pollList[i].initMap( this.gMapsObj );
       }
     }
   
     return this;
  };
  
  ElectionData.Riding.prototype.closeMap = function() {
    
    this.hidePolls();
    this.gPoly.setMap( null );
    
    return this;

  };
  
  
  
  ElectionData.Riding.prototype.showBoundary = function() {
     if( this.gMapsObj != null && this.gPoly != null ) {
       this.gPoly.setMap( this.gMapsObj );
     }
     
     return this;
  };
  
  ElectionData.Riding.prototype.hideBoundary = function() {
     this.gPoly.setMap( null );
     return this;
  };
  
  ElectionData.Riding.prototype.zoomToFit = function() {
     if( this.gMapsObj != null && this.gPoly != null ) {
       this.gMapsObj.fitBounds( this.gPoly.getBounds());
     }
     return this;  
  };
  
  ElectionData.Riding.prototype.setFillOption = function( fillOption ) {
  
    var i;
    for( i in this.pollList ) {
      this.pollList[i].setFillOption( fillOption );
    }
    return this;
  };
  
  ElectionData.Riding.prototype.setDisplayOptions = function( displayOptions ) {
  
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

  
  ElectionData.Riding.prototype.showPolls = function() {
  
    var i;
    for( i in this.pollList ) {
      this.pollList[i].show();
    }

    return this;
  };
  
  ElectionData.Riding.prototype.hidePolls = function() {
  
    var i;
    for( i in this.pollList ) {
      this.pollList[i].hide();
    }
	
    return this;
  };  

  ElectionData.Riding.prototype.showPoll = function( n ) {
  
    if( this.pollList.hasOwnProperty( n )) {
      this.pollList[n].show();
    }
	
    return this;
  };  

  ElectionData.Riding.prototype.hidePoll = function( n ) {
  
    if( this.pollList.hasOwnProperty( n )) {
      this.pollList[n].hide();
    }
	
    return this;
  };  
  
})();

  
  


