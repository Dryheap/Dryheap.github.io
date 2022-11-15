var geographic_svg =  d3.select("#geographic_viz")
  .style("width", width)
  .style("height", height)
  .attr("x", 850)
  .attr("transform", "translate(400, -300)")  

console.log(width)

let geographic_border = geographic_svg.append("g")
                .append("rect")
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("y", 25)
                .attr("width", width)
                .attr("height", height-25)  


var title = geographic_svg.append("text") 
                          .text('Geographic Chart') 
                          .attr("text-anchor", "middle") 
                          .style("font-size", '24px') 
                          .attr("dy", 20)
                          .attr("dx", border_2.attr("width") / 2);

var temp_holder_2 = geographic_svg.append("text")
                    .text('<Geographic Chart>')
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .attr("dx", geographic_border.attr("width")/2)
                    .attr("dy", geographic_border.attr("height")/2)

console.log(geographic_border.attr("width"))
