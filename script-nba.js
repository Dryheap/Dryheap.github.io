var width = 500
var height= 500

var svg =  d3.select("#nba")
  .style("width", width)
  .style("height", height)

let border = svg.append("g")
                .append("rect")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("width", 50)
                .attr("height", 50)

  /*
let bound = svg.append("g")
            .attr("transform", `translate(10,0)`)

let link = bound.insert("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 2)
            .selectAll("path")
            .data(root.links()) //TODO: here you have to pass the links generated by your hierarchy
            .join("path")
            .attr("d", d3.linkHorizontal()
                  .x(d => d.y)
                  .y(d => d.x));


console.log(root.descendants());


const node = bound.append("g")
            .selectAll("circle")
            .data(root.descendants()) //TODO: here you have to pass the descendants of your root
            .enter()
            .append("circle")
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 4)
*/