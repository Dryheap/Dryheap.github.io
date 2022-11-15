var width = 1000
var height= 500

var svg =  d3.select("#teamsuccess_viz1")
  .style("width", width)
  .style("height", height)
  .attr("transform", "translate(400, 100)")

var title = svg.append("text") 
              .text('Team Success') 
              .attr("text-anchor", "middle") 
              .style("font-size", '24px') 
              .attr("dy", 20)
              .attr("dx", width / 2);

let border = svg.append("g")
                .append("rect")
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("y", 25)
                .attr("width", width)
                .attr("height", height-25)

var temp_holder = svg.append("text")
                    .text('<Visualization 1>')
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .attr("dx", border.attr("width")/2)
                    .attr("dy", border.attr("height")/2)
console.log(border.attr("width"))
