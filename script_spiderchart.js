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

    var spiderchart_svg =  d3.select("#spiderchart")
      .style("width", dimensions.width*0.6)
      .style("height", dimensions.height)
      .attr("x", 850)
      //.attr("transform", "translate(900, -350)")

    console.log(dimensions.width)

    let spiderchart_border = spiderchart_svg.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width*0.6)
                    .attr("height", dimensions.height-25)


    var title = spiderchart_svg.append("text") 
                    .text('Spider Chart') 
                    .attr("text-anchor", "middle") 
                    .style("font-size", '24px') 
                    .attr("dy", 20)
                    .attr("dx", spiderchart_border.attr("width") / 2);


    var temp_holder_2 = spiderchart_svg.append("text")
                        .text('<Spider/Radar Chart>')
                        .attr("text-anchor", "middle")
                        .style("font-size", "12px")
                        .attr("dx", spiderchart_border.attr("width")/2)
                        .attr("dy", spiderchart_border.attr("height")/2)

    console.log(spiderchart_border.attr("width"))

  }
)
