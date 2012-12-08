     function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(47, -79),
          zoom: 8,
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