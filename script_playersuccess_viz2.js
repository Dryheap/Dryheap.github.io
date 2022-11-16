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

    var svg_2 =  d3.select("#playersuccess_viz2")
      .style("width", dimensions.width*0.3)
      .style("height", dimensions.height)
      .attr("x", 850)
      //.attr("transform", "translate(-400,0)")

    console.log(dimensions.width)

    let border_3 = svg_2.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width*0.7)
                    .attr("height", dimensions.height-25)

    var title = svg_2.append("text") 
                    .text('Player Success') 
                    .attr("text-anchor", "middle") 
                    .style("font-size", '24px') 
                    .attr("dy", 20)
                    .attr("dx", border_3.attr("width") / 2);

    var temp_holder_2 = svg_2.append("text")
                        .text('<Visualization 2>')
                        .attr("text-anchor", "middle")
                        .style("font-size", "12px")
                        .attr("dx", border_3.attr("width")/2)
                        .attr("dy", border_3.attr("height")/2)

    console.log(border_3.attr("width"))

  }
)