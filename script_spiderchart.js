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
    var features = ["WS", "VORP", "TS%", "BPM", "FG%"]
    var spiderchart_svg =  d3.select("#spiderchart")
      .style("width", dimensions.width*0.6)
      .style("height", dimensions.height)
      .attr("x", 850)
      //.attr("transform", "translate(900, -350)")

    console.log(dimensions.width)
    


    let spiderchart_border = spiderchart_svg.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width*0.6)
                    .attr("height", dimensions.height-25)


    var title = spiderchart_svg.append("text") 
                    .text('Spider Chart') 
                    .attr("text-anchor", "middle") 
                    .style("font-size", '24px') 
                    .attr("dy", 20)
                    .attr("dx", spiderchart_border.attr("width") / 2);


    var maxValue = 500;
    var radius = 200;
    var center = {x:50, y: 50};
                    
    const radialScale = d3.scaleLinear()
                      .domain([0, maxValue]) 
                      .range([radius, 0]) 
    let ticks = [100, 200, 300, 400]
    ticks.forEach(t=> 
      spiderchart_svg.append("circle")
                     .attr("cx", 300)
                     .attr("cy", 300)
                     .attr("fill", "none")
                     .attr("stroke", "gray")
                     .attr("r", radialScale(t))
      )

    ticks.forEach(t=>
      spiderchart_svg.append("text")
                     .attr("x", 305)
                     .attr("y", 300 - radialScale(t))
                     .text(t.toString())
      )

    function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": 300 + x, "y": 300 - y};
    }

    for (var i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
      let line_coordinate = angleToCoordinate(angle, 10);
      let label_coordinate = angleToCoordinate(angle, 10.5);
      console.log("h")
      //draw axis line
      spiderchart_svg.append("line")
      .attr("x1", 300)
      .attr("y1", 300)
      .attr("x2", line_coordinate.x)
      .attr("y2", line_coordinate.y)
      .attr("stroke","black");
  
      //draw axis label
      spiderchart_svg.append("text")
      .attr("x", label_coordinate.x)
      .attr("y", label_coordinate.y)
      .text(ft_name);
    }

    let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);

    let colors = ["darkorange", "gray", "navy"];

    function getPathCoordinates(data_point){
      let coordinates = [];
      for (var i = 0; i < features.length; i++){
          let ft_name = features[i];
          let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
          coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
      }
      return coordinates;
  }

    for (var i = 0; i < dataset.length; i++){
      
      let d = dataset["WS"];
      let color = colors["WS"];
      let coordinates = getPathCoordinates(function(d){return d["WS"]})
  
      //draw the path element
      spiderchart_svg.append("path")
      .datum(coordinates)
      .attr("d",line)
      .attr("stroke-width", 3)
      .attr("stroke", color)
      .attr("fill", color)
      .attr("stroke-opacity", 1)
      .attr("opacity", 0.5);
  }
   
  }
)
