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
   // var features = ["WS", "VORP", "TS%", "BPM", "FG%"]
    var svg_3 =  d3.select("#spiderchart")
    .style("width", dimensions.width*0.6)
    .style("height", dimensions.height)
    .attr("x", 850)

    let playviz2_border = svg_3.append("g")
              .append("rect")
              .attr("stroke-width", 2)
              .attr("stroke", "black")
              .attr("fill", "none")
              .attr("y", 25)
              .attr("width", dimensions.width*0.6)
              .attr("height", dimensions.height-25)

    title2 = svg_3.append("text") 
              .text("Test") 
              .attr("text-anchor", "middle") 
              .style("font-size", '24px') 
              .attr("dy", 20)
              .attr("dx", playviz2_border.attr("width") / 2);
    

  }
)



function setPlayer_TeamViz2(player) {
  console.log("CALLED setTeam")
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

        
      svg_3 =  d3.select("#spiderchart")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .attr("x", 950)
        //.attr("transform", "translate(300,155)")

      svg_3.selectAll("*").remove()


      playviz2_border = svg_3.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width*0.6)
                    .attr("height", dimensions.height-25)

    
    title2 = svg_3.append("text") 
                    .text(player) 
                    .attr("text-anchor", "middle") 
                    .style("font-size", '24px') 
                    .attr("dy", 20)
                    .attr("dx", playviz2_border.attr("width") / 2);

    
    
    // ----------------------------------------------------------------------------------------
    // Radar Chart funny business
    // ----------------------------------------------------------------------------------------

    let features2 = ["DRB%","ORB%","STL%","AST%","TRB%","BLK%"]; // the features we wish to investigate (must match headers)

    // preparing the data
    let playerAverages = []

    var point2 = {}

    //features.forEach(f => point[f] = dataset[f]);
    features2.forEach(function(f) {
        console.log(f)
        var count2 = 0
        point2[f] = 0
        console.log(point2[f])
        dataset.forEach(function(d) { // player-by-player data manipulation
            if (d["Player"] == player) {
                point2[f] += (parseFloat(d[f])/100) // sum feature if team is the same as selected
                count2++
            }
        })
        point2[f] = point2[f] / count2
        playerAverages.push(point2[f]);
        console.log(playerAverages)
    })


    // converts polar coordinates to svg coordinates
    function angleToCoordinate(angle2, val){
        let x = Math.cos(angle2) * radialScale2(val);
        let y = Math.sin(angle2) * radialScale2(val);
        return {"x": 300 + x, "y": 300 - y};
    }


    // initially prepare radarchart
    let radialScale2 = d3.scaleLinear()
                        .domain([0,0.4]) // change
                        .range([0,175]); // change
    let ticks2 = [0.1,0.2,0.3,0.4,0.5] // will change based on data
    

    // make a circle for each tick
    ticks2.forEach(t =>
        svg_3.append("circle")
        .attr("cx", 300 + dimensions.margin.left)
        .attr("cy", 300)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale2(t))
    )

    // add text for each circle
    ticks2.forEach(t =>
        svg_3.append("text")
        .attr("x", 305 + dimensions.margin.left)
        .attr("y", 300 - radialScale2(t))
        .text(t.toString())
    )

    // place labels for the features
    for (var i = 0; i < features2.length; i++) {
        let ft_name2 = features2[i];
        let angle2 = (Math.PI / 2) + (2 * Math.PI * i / features2.length);
        let line_coordinate2 = angleToCoordinate(angle2, 0.5);
        let label_coordinate2 = angleToCoordinate(angle2, 0.525);
    
        //draw axis line
        svg_3.append("line")
        .attr("x1", 300 + dimensions.margin.left)
        .attr("y1", 300)
        .attr("x2", line_coordinate2.x + dimensions.margin.left)
        .attr("y2", line_coordinate2.y)
        .attr("stroke","black");
    
        //draw axis label
        svg_3.append("text")
        .attr("x", label_coordinate2.x + dimensions.margin.left)
        .attr("y", label_coordinate2.y)
        .text(ft_name2);
    }

    // preparing lines and colors
    let line2 = d3.line()
                .x(d => d.x + dimensions.margin.left)
                .y(d => d.y);
    let colors = ["darkorange", "gray", "navy"];


    // TEMP TESTING
    function getPathCoordinates(data_point){
        console.log("Pathcoordinates: " + data_point)
        let coordinates2 = [];
        for (var i = 0; i < features2.length; i++){
            let ft_name2 = features2[i];
            let angle2 = (Math.PI / 2) + (2 * Math.PI * i / features2.length);
            coordinates2.push(angleToCoordinate(angle2, data_point[i]));
        }
        return coordinates2;
    }

    // draw the radar chart lines given data
        console.log("==========================" + i + "===================")
        console.log(playerAverages)
        let d = playerAverages;
        console.log(d)
        let color = colors[0];
        console.log(color)
        let coordinates2 = getPathCoordinates(d);
        console.log(coordinates2)
    
        //draw the path element
        svg_3.append("path")
            .datum(coordinates2)
            .attr("x", dimensions.margin.left)
            .attr("d",line2)
            .attr("stroke-width", 3)
            .attr("stroke", color)
            .attr("fill", color)
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5);
    /*for (var i = 0; i < teamAverages.length; i ++){
        console.log("==========================" + i + "===================")
        console.log(teamAverages[i])
        let d = teamAverages[i];
        console.log(d)
        let color = colors[i];
        console.log(color)
        let coordinates = getPathCoordinates(d);
        console.log(coordinates)
    
        //draw the path element
        svg_2.append("path")
            .datum(coordinates)
            .attr("d",line)
            .attr("stroke-width", 3)
            .attr("stroke", color)
            .attr("fill", color)
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5);
    }*/

    }
  )
}
