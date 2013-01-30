var map_state = {
  riding : 35096,
  map_type : "party",
  election : "2011_ON",
}
 
 function initialize() {
    alert("Hello1");
	var mapOptions = {
	  center: new google.maps.LatLng(43.65, -79.4),
	  zoom: 13,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),
		mapOptions);
		
	tsLayer = new google.maps.FusionTablesLayer({
	  query: {
		select: 'geometry',
		from: '1_2T1bHEY8HPujn9Se_YpPXMuwIs_kmC1EF7ly_E'
	  },
	  styles: [{
		polygonOptions: {
		  fillColor: '#FF0000',
		  fillOpacity: 0.5
		}
	  },  {
		where: 'NDP_WIN > 0',
		polygonOptions : {
		  fillColor: '#ff9900'
		}
	  }]
	});
	tsLayer.setMap(map);
					
  }
  
function change_map_state( state ) {
  if( state == "party" ) {
     map_state.map_type = state;    
	 tsLayer.setOptions({
		query: {
			select: 'geometry',
			from: '1_2T1bHEY8HPujn9Se_YpPXMuwIs_kmC1EF7ly_E'
		  },
		  styles: [{
			polygonOptions: {
			  fillColor: '#FF0000',
			  fillOpacity: 0.5
			}
		  },  {
			where: 'NDP_WIN > 0',
			polygonOptions : {
			  fillColor: '#ff9900'
			}
		  }]
		});
	}
	else if( state == "turnout" ) {
	  map_state.map_type = state;    
	  tsLayer.setOptions({
		query: {
			select: 'geometry',
			from: '1_2T1bHEY8HPujn9Se_YpPXMuwIs_kmC1EF7ly_E'
		  },
		  styles: [{
			polygonOptions: {
			  fillColor: '#001a00',
			  fillOpacity: 0.5
			}
		  },  {
			where: 'TURNOUT < 0.01',
			polygonOptions : {
			  fillColor: '#ffffff',
			  fillOpacity: 0.01
			}
		  },  {
			where: 'TURNOUT > 0.2',
			polygonOptions : {
			  fillColor: '#006600',
			  fillOpacity: 0.5
			}
		  },  {
			where: 'TURNOUT > 0.35',
			polygonOptions : {
			  fillColor: '#00b200',
			  fillOpacity: 0.5
			}
		  },  {
			where: 'TURNOUT > 0.45',
			polygonOptions : {
			  fillColor: '#00ff00',
			  fillOpacity: 0.5
			}
		  },  {
			where: 'TURNOUT > 0.55',
			polygonOptions : {
			  fillColor: '#4dff4d',
			  fillOpacity: 0.5
			}
		  },  {
			where: 'TURNOUT > 0.65',
			polygonOptions : {
			  fillColor: '#99ff99',
			  fillOpacity: 0.5
			}
		  },  {
			where: 'TURNOUT > 0.80',
			polygonOptions : {
			  fillColor: '#ccffcc',
			  fillOpacity: 0.5
			}
		  }]
		 
		});	
	}
	else if( state == "empty_frame" ) {
	  map_state.map_type = state;    
	  tsLayer.setOptions({
		query: {
			select: 'geometry',
			from: '1_2T1bHEY8HPujn9Se_YpPXMuwIs_kmC1EF7ly_E'
		  },
		  styles: [{
			polygonOptions: {
			  fillColor: '#FFFFFF',
			  fillOpacity: 0.001
			}
		  }]
		});	
	}
}
	  
  function run_test()
  {
  
	document.getElementById("content_window").innerHTML = "Congratulations!";
	
	tsLayer.setOptions({
	query: {
		select: 'geometry',
		from: '1_2T1bHEY8HPujn9Se_YpPXMuwIs_kmC1EF7ly_E'
	  },
	  styles: [{
		polygonOptions: {
		  fillColor: '#FF0000',
		  fillOpacity: 0.5
		}
	  },  {
		where: 'NDP_WIN > 0',
		polygonOptions : {
		  fillColor: '#0000ff'
		}
	  }]
	});
  }