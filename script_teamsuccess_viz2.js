
  var dimensions = {
    width: 700,
    height: 600,
    margin:{
        top: 60,
        bottom: 70,
        right: 10,
        left: 100
    }
  }
  var svg_2 =  d3.select("#teamsuccess_viz2")
    .style("width", dimensions.width)
    .style("height", dimensions.height)
    .attr("x", 950)
    //.attr("transform", "translate(300,155)")
  
  
  let teamviz2_border = svg_2.append("g")
                .append("rect")
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("y", 25)
                .attr("width", dimensions.width*0.6)
                .attr("height", dimensions.height-25)
  
  var title = svg_2.append("text") 
                .text("Temp") 
                .attr("text-anchor", "middle") 
                .style("font-size", '24px') 
                .attr("dy", 20)
                .attr("dx", teamviz2_border.attr("width") / 2);



function setTeam_TeamViz2(team) {
  console.log("CALLED setTeam")
  d3.csv("nba_adv_data.csv").then(

    function(dataset) {

      var dimensions = {
        width: 700,
        height: 600,
        margin:{
            top: 60,
            bottom: 70,
            right: 10,
            left: 100
        }
      }

        
      svg_2 =  d3.select("#teamsuccess_viz2")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .attr("x", 950)
        //.attr("transform", "translate(300,155)")

      svg_2.selectAll("*").remove()

      console.log(team)

      teamviz2_border = svg_2.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width*0.6)
                    .attr("height", dimensions.height-25)

    
    title = svg_2.append("text") 
                    .text(team) 
                    .attr("text-anchor", "middle") 
                    .style("font-size", '24px') 
                    .attr("dy", 20)
                    .attr("dx", teamviz2_border.attr("width") / 2);
    }
  )
}
