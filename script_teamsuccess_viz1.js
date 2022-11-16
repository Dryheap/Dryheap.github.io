d3.csv("nba_adv_data.csv").then(

  function(dataset) {

    var dimensions = {
      width: 1000,
      height: 700,
      margin:{
          top: 60,
          bottom: 70,
          right: 10,
          left: 80
      }
  }

    var svg =  d3.select("#teamsuccess_viz1")
      .style("width", dimensions.width)
      .style("height", dimensions.height)
      //.attr("transform", "translate(400, 100)")

    var title = svg.append("text") 
                  .text('Team Success') 
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
                    .attr("height", dimensions.height-25)


    // This is where the fun begins

    // get True Shooting Percent
    var subgroups = dataset.columns.slice(1)
    console.log(subgroups)

    // get team info
    var teams = d3.map(dataset, function(d){return(d.Tm)}).keys()

    console.log(teams)

    // X-axis
    var x = d3.scaleBand()
      .domain(teams)
      .range([0, dimensions.width])
      .padding([0.2])

    svg.append("g")
      .attr("transform", "translate(0," + dimensions.height + ")")
      .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 40])
      .range([dimensions.height, 0]);

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
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(dataset)
        .enter()
        .append("g")
          .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
          .attr("x", function(d) { return xSubgroup(d.key); })
          .attr("y", function(d) { return y(d.value); })
          .attr("width", xSubgroup.bandwidth())
          .attr("height", function(d) { return height - y(d.value); })
          .attr("fill", function(d) { return color; });

    var temp_holder = svg.append("text")
                        .text('<Visualization 1>')
                        .attr("text-anchor", "middle")
                        .style("font-size", "12px")
                        .attr("dx", border.attr("width")/2)
                        .attr("dy", border.attr("height")/2)
    console.log(border.attr("width"))

  }

)
