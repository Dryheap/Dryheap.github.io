var svg_2 =  d3.select("#teamsuccess_viz2")
  .style("width", width*0.7)
  .style("height", height)
  .attr("x", 850)
  .attr("transform", "translate(300,155)")

console.log(width)

let border_2 = svg_2.append("g")
                .append("rect")
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("y", 25)
                .attr("width", width*0.6)
                .attr("height", height-25)

var title = svg_2.append("text") 
                .text('Player Success') 
                .attr("text-anchor", "middle") 
                .style("font-size", '24px') 
                .attr("dy", 20)
                .attr("dx", border_2.attr("width") / 2);

var temp_holder_2 = svg_2.append("text")
                    .text('<Visualization 2>')
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .attr("dx", border_2.attr("width")/2)
                    .attr("dy", border_2.attr("height")/2)

console.log(border_2.attr("width"))
