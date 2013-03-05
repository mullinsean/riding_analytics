$(function(){

  var seedData = {
    pollNum : "16",
    votes : {
      "ND" : 50,
      "L" : 103,
      "PC" : 33, 
      "GP" : 7
    },
    percentage : {
      "ND" : 0.2564,
      "L" : 0.5282,
      "PC" : 0.1692,
      "GP" : 0.0359
    },
    totalVotes : 195,
    electors : 596,
    turnout : 0.3272,
    isAdvancedPoll : false
  };  

  var PollChart = Backbone.Model.extend({
    defaults: {
      showParties: ["ND", "L", "PC"],
      xOffset : 0,
      yOffset : 0      
    },
    
    initialize: function() {
      this.pollData = seedData;     
    }
  });
  
  var PollChartView = Backbone.View.extend({
    
    
    //tagName : "li";
    
    el: $('#container'),
    
    initialize: function() {
      _.bindAll(this, 'render');    
      
      this.render();
    },
    
    render: function() {
      var chart_x = 200;
      var chart_y = 2000;
      var bar_h = 10;

      //var data = [4, 8, 15, 16, 23, 42];
      
      var data = [
        {"party": "NDP", "vote": 0.45 },
        {"party": "PC", "vote": 0.20 },
        {"party": "LIB", "vote": 0.35 }
      ];

      var chart = d3.select(this.el).append("svg")
           .attr("class", "chart")
           .attr("width", chart_x)
           .attr("height", chart_y)
           
      var x = d3.scale.linear()
         .domain([0, 1])
         .range([0, chart_x]);
         
      var y = d3.scale.ordinal()
         .domain(function( d ) { d.party } )
         .rangeBands([0, chart_y]);
         
      var color = d3.scale.ordinal()
        .domain(["NDP", "PC", "LIB"])
        .range(["rgb(255,102,0)", "rgb(0,0,255)", "rgb(255,0,0)"]);
         
      /*chart.selectAll("line")
          .data(x.ticks(10))
        .enter().append("line")
          .attr("x1", x)
          .attr("x2", x)
          .attr("y1", 0)
          .attr("y2", chart_y)
          .style("stroke", "#ccc");
          
      chart.selectAll(".rule")
         .data(x.ticks(10))
       .enter().append("text")
         .attr("class", "rule")
         .attr("x", x)
         .attr("y", 0)
         .attr("dy", -3)
         .attr("text-anchor", "middle")
         .text(String);*/
       
         
      chart.selectAll("rect")
          .data(data)
        .enter().append("rect")
          .attr("y", function(d, i) { return i * bar_h; })
          .attr("fill", function( d ) { return color( d.party ); })
          .attr("width", function( d, i ) { return x( d.vote ) })
          .attr("height", bar_h);
      
/*      chart.selectAll("rect")
        .on("click", function( d, i ) {
           console.log( "Clicked on party: " + d.party );
         });             */




      
    }
  });

  
  var paw = new PollChartView();
  
  console.log( "Test" );


  



});
