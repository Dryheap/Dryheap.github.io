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

    var playersuccess_svg =  d3.select("#playersuccess_viz1")
      .style("width", dimensions.width * .5)
      .style("height", dimensions.height)
      .attr("y", 850)

    console.log(dimensions.width)

    let playersuccess_border = playersuccess_svg.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width * .7)
                    .attr("height", dimensions.height-25)
                    .attr("y", "100")

    var title = playersuccess_svg.append("text") 
                    .text('Player Success') 
                    .attr("text-anchor", "middle") 
                    .style("font-size", '24px') 
                    .attr("dy", 20)
                    .attr("dx", playersuccess_border.attr("width") / 2);

    var temp_holder = playersuccess_svg.append("text")
                        .text('<Visualization 3>')
                        .attr("text-anchor", "middle")
                        .style("font-size", "12px")
                        .attr("dx", playersuccess_border.attr("width")/2)
                        .attr("dy", playersuccess_border.attr("height")/2)

    console.log(playersuccess_border.attr("width"))

  }
)
