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

    var temp_holder = svg.append("text")
                        .text('<Visualization 1>')
                        .attr("text-anchor", "middle")
                        .style("font-size", "12px")
                        .attr("dx", border.attr("width")/2)
                        .attr("dy", border.attr("height")/2)
    console.log(border.attr("width"))

  }

)
