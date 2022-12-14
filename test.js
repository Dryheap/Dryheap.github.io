



// Append a circle
svg.append("circle")
.attr("id", "circleBasicTooltip")
.attr("cx", 400)
.attr("cy", 400)
.attr("r", 40)
.attr("fill", "#69b3a2")

// create a tooltip
var tooltip = d3.select("#viz1_team_rankings")
            .append("div")
              .style("position", "absolute")
              .style("visibility", "hidden")
              .text("I'm a rectangle!");  