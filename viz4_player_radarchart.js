function drawPlayerRadar(){
  var dimensions = {
    width: 900,
    height: 900,
    margin:{
        top: 60,
        bottom: 70,
        right: 10,
        left: 100
    }
  }
    
   // var features = ["WS", "VORP", "TS%", "BPM", "FG%"]
    var svg_3 =  d3.select("#spiderchart")
    .style("width", dimensions.width)
    .style("height", dimensions.height)
    .attr("x", 950)

    playviz2_border = svg_3.append("g")
                            .append("rect")
                            .attr("rx", 20)
                            .attr("ry", 20)
                            .attr("stroke-width","1px")
                            .attr("stroke", "#5D5958")
                            .attr("fill", "None")
                            .attr("y", 0)
                            .attr("width", dimensions.width * .68)
                            .attr("height", dimensions.height * .68)
                            .attr("transform", "translate(90, 230)")

    title2 = svg_3.append("text") 
              .text("No Player Selected") 
              .attr("text-anchor", "middle") 
              .style("font-size", '24px') 
              .attr("dy", 20)
              .attr("dx", playviz2_border.attr("width")/ 2)
              .attr("transform", "translate(90, 200)")



  }

window.setPlayer_TeamViz2 = function(player) {
  if (player == 'None'){ drawPlayerRadar()}
  d3.csv("nba_adv_data.csv").then(
    
    function(dataset) {

      var dimensions = {
        width: 900,
        height: 900,
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
                            .attr("rx", 20)
                            .attr("ry", 20)
                            .attr("stroke-width","1px")
                            .attr("stroke", "#5D5958")
                            .attr("fill", "None")
                            .attr("y", 25)
                            .attr("width", dimensions.width * .68)
                            .attr("height", dimensions.height * .68)
                            .attr("transform", "translate(90, 230)")

    title2 = svg_3.append("text")
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
    console.log(typeof player)
    //features.forEach(f => point[f] = dataset[f]);
    player.forEach (function(value) {
      console.log(value)
      var point2 = []
      var count2 = 0
      dataset.forEach(function(d) { // player-by-player data manipulation

        if (d["Player"] == value) {
            features2.forEach(f => isNaN(point2[f]) ? point2[f] = (parseFloat(d[f])/100) : point2[f] += (parseFloat(d[f])/100)) // sum feature if team is the same as selected
            count2++
        }
      })
      //features.forEach(f => point[f] = point[f] / count) // point is now an average
      features2.forEach(f => point2[f] = point2[f] / count2)
      playerAverages.push(point2) // push the entire point (point contains all features averaged)
    })



    // converts polar coordinates to svg coordinates
    function angleToCoordinate2(angle2, val){
        let x_2 = Math.cos(angle2) * radialScale2(val);
        let y_2 = Math.sin(angle2) * radialScale2(val);
        return {"x": 300 + x_2, "y": 300 - y_2};
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
        .attr("transform", "translate(0, 250)")
      
    )

    // add text for each circle
    ticks2.forEach(t =>
        svg_3.append("text")
        .attr("x", 305 + dimensions.margin.left)
        .attr("y", 300 - radialScale2(t))
        .attr("transform", "translate(0, 250)")
        .text(t.toString())
    )

    // place labels for the features
    for (var i = 0; i < features2.length; i++) {
        let ft_name2 = features2[i];
        let angle2 = (Math.PI / 2) + (2 * Math.PI * i / features2.length);
        let line_coordinate2 = angleToCoordinate2(angle2, 0.525);
        let label_coordinate2 = angleToCoordinate2(angle2, 0.6);
    
        //draw axis line
        svg_3.append("line")
        .attr("x1", 300 + dimensions.margin.left)
        .attr("y1", 300)
        .attr("x2", line_coordinate2.x + dimensions.margin.left)
        .attr("y2", line_coordinate2.y)
        .attr("stroke","black")
        .attr("transform", "translate(0, 250)");
    
        //draw axis label
        svg_3.append("text")
        .attr("x", label_coordinate2.x + dimensions.margin.left)
        .attr("y", label_coordinate2.y)
        .text(ft_name2)
        .attr("transform", "translate(-15, 250)");
    }

    // preparing lines and colors
    let line2 = d3.line()
                .x(d => d.x + dimensions.margin.left)
                .y(d => d.y);
    let colors = ["darkorange", "gray", "navy"];


    // TEMP TESTING
    function getPathCoordinates2(data_point){
        console.log("Pathcoordinates: " + data_point)
        let coordinates2 = [];
        for (var i = 0; i < features2.length; i++){
            let ft_name2 = features2[i];
            let angle2 = (Math.PI / 2) + (2 * Math.PI * i / features2.length);
            coordinates2.push(angleToCoordinate2(angle2, data_point[ft_name2]));
        }

        console.log(coordinates2)
        return coordinates2;
    }

    // draw the radar chart lines given data
    var textPradar = svg_3
    .append('text')
    .attr("id", 'topbartext')
    .attr("x", 500)
    .attr("y", 20)
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("font-family", "sans-serif")
    .attr("font-size", "20")
    .text("Name: ")
    .attr("transform", "translate(0, 225)")


    for (var i = 0; i < player.size; i ++){
        let d = playerAverages[i];
        let pName = Array.from(player)[i]
        let pcolor = colors[i];
        let coordinates2 = getPathCoordinates2(d);
        console.log(coordinates2)
    
        //draw the path element
        svg_3.append("path")
            .datum(coordinates2)
            .attr("x", dimensions.margin.left)
            .attr("d",line2)
            .attr("stroke-width", 3)
            .attr("stroke", pcolor)
            .attr("fill", pcolor)
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.65)
            .attr("transform", "translate(0, 250)")
            .on("click", function(d){
              var myCol = "None"
              d3.select(this)
                  .attr("fill", function(){
                    if (d3.select(this).attr("fill") != "yellow"){
                      myCol = "yellow"
                      return "yellow"
                    }
                    else{
                      return pcolor
                    }
              
              })
              
              return textPradar.text(`Name: ${pName}`);

            })
    }

    }
  )
}
