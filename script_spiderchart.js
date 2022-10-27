var spiderchart_svg =  d3.select("#spiderchart")
  .style("width", width)
  .style("height", height)
  .attr("x", 850)
  //.attr("transform", "translate(600, -505)")


console.log(width)

let spiderchart_border = spiderchart_svg.append("g")
                .append("rect")
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("y", 25)
                .attr("width", width*0.6)
                .attr("height", height-25)

var temp_holder_2 = spiderchart_svg.append("text")
                    .text('<Spider/Radar Chart>')
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .attr("dx", spiderchart_border.attr("width")/2)
                    .attr("dy", spiderchart_border.attr("height")/2)

console.log(spiderchart_border.attr("width"))
