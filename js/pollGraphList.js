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
      votes : [0.2564,0.5282,0.1692,0.0359]
    },
    
    initialize: function() {
      var i;
      var g = this.get('votes');
      for (i = 0; i < 4; i++ ) {
        g[i] = Math.random();
      }
      this.set("votes", g );
    }
  });
  
  var PollList = Backbone.Collection.extend({
    model : PollChart 
  });
  
  var PollChartView = Backbone.View.extend ({
  
    tagName : "rect",
    
    el: $("svg#pollChart"),
    
    initialize : function() {
      _.bindAll( this, 'render');
      
      this.el = $("svg#pollChart")[0];
      
      
      
      this.bar_h = 10;
      
      this.render();
    },
    
    render : function() {
      var data = this.model.get('votes');
      
      var chart = d3.select(this.el);

      var x = d3.scale.linear()
         .domain([0, 1])
         .range([0, 100]);
         
      var y = d3.scale.ordinal()
         .domain(data)
         .rangeBands([0, 100]);
         
      var color = d3.scale.ordinal()
        .domain([0,1,2,3])
        .range(["rgb(255,102,0)", "rgb(0,0,255)", "rgb(255,0,0)", "rgb(0,255,0)"]);
      
      var b_har = this.bar_h;
      var qbert = this.model.get('yIndex') * 45;
         
      chart.selectAll("rect#poll" + this.model.get('yIndex'))
          .data(data)
        .enter().append("rect")
          .attr("id", "poll" + this.model.get('yIndex'))
          .attr("y", function(d, i) { return i * b_har + qbert; })
          .attr("fill", function(d, i) { return color( i ); } )
          .attr("width", x )
          .attr("height", this.bar_h);
     }
  });
  
  var PollListView = Backbone.View.extend({
    
    
    tagName : "svg",
    
    el: $('#container'),
    
    events : {
      'click button#add': 'addItem'
    },
    
    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem');    
      
      this.chart_x = 200;
      this.chart_y = 500;
      
      this.collection = new PollList();
      this.collection.bind('add', this.appendItem);
      
      this.counter = 0;
      
      this.render();
    },
    
    render: function() {
    
      $(this.el).append("<button id='add'>Add</button>");
      
      var chart = d3.select(this.el).append("svg")
        .attr("class", "chart")
        .attr("width", this.chart_x)
        .attr("height", this.chart_y)
        .attr("id", "pollChart" )
    },

    addItem : function () {
      var poll = new PollChart({
        yIndex : this.counter 
      });
      this.collection.add(poll);
      this.counter++;
    },
    
    appendItem : function( poll ) {
      var pollView = new PollChartView({
        model : poll
      });
      pollView.render();
    
    }
  });

  var pL = new PollListView();
  
  console.log( "Test" );


  



});
