import Color from './colors.js';
  
  var dimensions = {
    width: 1400,
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
                .attr("dx", teamviz2_border.attr("width") / 2)


// must use "window.<func_name>" to make module function visible to other modules
window.setTeam_TeamViz2_Set = function(teams, teamColor) {
  console.log("CALLED setTeam_Set: " + teamColor)
  d3.csv("nba_adv_data.csv").then(

    function(dataset) {




      var dimensions = {
        width: 1400,
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


      teamviz2_border = svg_2.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width*0.6)
                    .attr("height", dimensions.height-25)

    
    title = svg_2.append("text") 
                    .text("Teams") // TODO: Change 
                    .attr("text-anchor", "middle") 
                    .style("font-size", '24px') 
                    .attr("dy", 20)
                    .attr("dx", teamviz2_border.attr("width") / 2);

    
    
    // ----------------------------------------------------------------------------------------
    // Radar Chart funny business
    // ----------------------------------------------------------------------------------------

    let features = ["DRB%","ORB%","STL%","AST%","TRB%","BLK%"]; // the features we wish to investigate (must match headers)

    // preparing the data
    let teamAverages = []


    // getting the points for each team
    teams.forEach (function(value) {
      var point = []
      var count = 0
      dataset.forEach(function(d) { // player-by-player data manipulation
        if (d["Tm"] == value) {
            features.forEach(f => isNaN(point[f]) ? point[f] = (parseFloat(d[f])/100) : point[f] += (parseFloat(d[f])/100)) // sum feature if team is the same as selected
            count++
        }
      })
      //features.forEach(f => point[f] = point[f] / count) // point is now an average
      features.forEach(f => point[f] = point[f] / count)
      console.log(count)
      teamAverages.push(point) // push the entire point (point contains all features averaged)
    })


    // converts polar coordinates to svg coordinates
    function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": 300 + x, "y": 300 - y};
    }


    // initially prepare radarchart
    let radialScale = d3.scaleLinear()
                        .domain([0,0.2]) // change
                        .range([0,250]); // change
    let ticks = [0.025,0.05,0.1,0.125,0.15] // will change based on data
    

    // make a circle for each tick
    ticks.forEach(t =>
        svg_2.append("circle")
        .attr("cx", 300 + dimensions.margin.left)
        .attr("cy", 300)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t))
    )

    // add text for each circle
    ticks.forEach(t =>
        svg_2.append("text")
        .attr("x", 305 + dimensions.margin.left)
        .attr("y", 300 - radialScale(t))
        .text(t.toString())
    )

    // place labels for the features
    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        let line_coordinate = angleToCoordinate(angle, 0.15);
        let label_coordinate = angleToCoordinate(angle, 0.175);
    
        //draw axis line
        svg_2.append("line")
        .attr("x1", 300 + dimensions.margin.left)
        .attr("y1", 300)
        .attr("x2", line_coordinate.x + dimensions.margin.left)
        .attr("y2", line_coordinate.y)
        .attr("stroke","black");
    
        //draw axis label
        svg_2.append("text")
        .attr("x", label_coordinate.x + dimensions.margin.left)
        .attr("y", label_coordinate.y)
        .text(ft_name);
    }

    // preparing lines and colors
    let line = d3.line()
                .x(d => d.x + dimensions.margin.left)
                .y(d => d.y);
    let colors = ["darkorange", "gray", "navy"];


    // TEMP TESTING
    function getPathCoordinates(data_point){
        let coordinates = [];
        for (var i = 0; i < features.length; i++) {
            let ft_name = features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
            coordinates.push(angleToCoordinate(angle, data_point[ft_name])); // was data_point[i]
        }
        return coordinates;
    }

      // draw the radar chart lines given data
      for (var i = 0; i < teams.size; i++) {
        let d = teamAverages[i]
        let teamName = Array.from(teams)[i]
        console.log("From set: " + teamName)
        let color = Color[teamName]["colors"][Color[teamName]["mainColor"]]["hex"];
        let coordinates = getPathCoordinates(d)
    
        //draw the path element
        svg_2.append("path")
            .datum(coordinates)
            .attr("x", dimensions.margin.left)
            .attr("d",line)
            .attr("stroke-width", 3)
            .attr("stroke", color)
            .attr("fill", color)
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.65);

      }

    }
  )
}


