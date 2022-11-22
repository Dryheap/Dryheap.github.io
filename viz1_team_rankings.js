import Color from './colors.js';

d3.csv("nba_adv_data.csv").then(

  function(dataset) {


    var dimensions = {
      width: 1000,
      height: 700,
      margin:{
          top: 60,
          bottom: 20,
          right: 30,
          left: 80
      }
  }

  console.log(Color["ATL"]["mainColor"])

    var svg =  d3.select("#viz1_team_rankings")
      .style("width", dimensions.width)
      .style("height", dimensions.height)
      //.attr("transform", "translate(400, 100)")

    var title = svg.append("text") 
                  .text('Games Won') 
                  .attr("text-anchor", "middle") 
                  .style("font-size", '24px') 
                  .attr("dy", 20)
                  .attr("dx", dimensions.width / 2);

    let border = svg.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height)


    // This is where the fun begins

    dataset.sort(function(a, b) {
      return b.TeamWins - a.TeamWins;
    });

    // get True Shooting Percent, etc
    // change the below to get the different values needed to be grouped together
    // can be altered to be the teams
    // TODO: Subgroups are for column headers
    var subgroups = dataset.columns.slice(29,30) // usage: slice(<start_column>, <end_column>) -> will return all data for those columns
    //var subgroups = d3.map(dataset, function(d){return(d["Tm"])})


    // get team info
    // this currently is used for the upper-level groupings
    // can be altered to be True Shooting Percentage, etc
    var teams = d3.map(dataset, function(d){return(d["Tm"])})


    // X-axis
    var x = d3.scaleBand()
      .domain(teams)
      .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
      .padding([0.2])

    svg.append("g")
      .attr("transform", "translate(0," + (dimensions.height - dimensions.margin.bottom) + ")")
      .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 70])
      .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top]);

    svg.append("g")
      .call(d3.axisLeft(y));

    // x-axis Subgroup Positions
    var xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05])

    // choose color
    var color = "#38c9b4"

    // draw the graph
    /*var graph = svg.append("g")
                    .selectAll("g")
                    // Enter in data = loop group per group
                    .data(dataset)
                    .enter()
                    .append("g")
                      .attr("transform", function(d) { return "translate(" + x(d.Tm) + ",0)";})
                    .selectAll("rect")
                    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
                    .enter().append("rect")
                      .attr("x", function(d) { return xSubgroup(d.key); })
                      .attr("y", function(d) { return y(d.value); })
                      .attr("width", xSubgroup.bandwidth())
                      .attr("height", function(d) { return dimensions.height - dimensions.margin.bottom - y(d.value); })
                      .attr("fill", function(d) { return color; })*/

    var graph = svg.append("g")
                      .selectAll("g")
                      // Enter in data = loop group per group
                      .data(dataset)
                      .enter()
                      .append("g")
                        .attr("transform", function(d) { return "translate(" + x(d.Tm) + ",0)";}) // places the bar into correct x-position
                      .selectAll("rect")
                      // below console log prints out every player's name
                      .data(function(d) { console.log(d.Player); return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
                      .enter().append("rect")
                        .attr("x", function(d) { return xSubgroup(d.key); })
                        .attr("y", function(d) { return y(d.value); })
                        .attr("width", xSubgroup.bandwidth())
                        .attr("height", function(d) { return dimensions.height - dimensions.margin.bottom - y(d.value); })
                        .attr("fill", function(d) { 
                          // console.log("d.value is " + d.value); 
                          // R: why does d.value return "Tm" and doing something like d.Player return "undefined"?
                          return color; 
                        })
                      // adding mouseover and mousout styling and tooltip
                      .on("mouseover", function() {
                        d3.select(this)
                          .attr("fill", "yellow")
                          // .attr("stroke", "black")
                          // .attr("stroke-width", "1.2")
                      })
                      .on("mouseout", function() {
                        d3.select(this)
                          .attr("fill", "#38c9b4")
                          // .attr("stroke", "none")
                      })
                      // on-click actions and styling
                      .on("click", function() {
                        d3.select(this)
                          // .attr("fill", "#38c9b4")
                          // .attr("stroke", this.color + "#222222")
                          .attr("stroke", "black")
                          .attr("stroke-width", "2")
                      })


    graph.append("text")
          .text(function(d) { return d.Tm; })
          .attr("x", function(d){
              return x(d) + x.bandwidth()/2;
          })
          .attr("y", function(d){
              return y(d) - 5;
          })
          .attr("font-family" , "sans-serif")
          .attr("font-size" , "14px")
          .attr("fill" , "black")
          .attr("text-anchor", "middle");


  var yAxisGen = d3.axisLeft().scale(y)
  var yAxis = svg.append("g")
                .call(yAxisGen)
                .style("transform", `translateX(${dimensions.margin.left}px)`)


  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .text("Games Won")
    .attr("transform", "translate(40, 300) rotate(-90)")

  

  }

)
