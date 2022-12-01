function setTeam(team){
d3.csv("nba_adv_data.csv").then(

  function(dataset) {
    var dimensions = {
      width: 700,
      height: 600,
      margin:{
          top: 60,
          bottom: 70,
          right: 10,
          left: 80
      }
    }

    var selectValue = "VORP"
    var svg_2 =  d3.select("#playersuccess_viz1")
      .style("width", dimensions.width)
      .style("height", dimensions.height)
      .attr("x", 850)

      console.log(team)
      console.log("HELLLLLLLOOOOOO")


   let border_2 = svg_2.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "None")
                    .attr("y", 25)
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height)

    var title = svg_2.append("text") 
                    .text('Player Success') 
                    .attr("text-anchor", "middle") 
                    .style("font-size", '24px') 
                    .attr("dy", 20)
                    .attr("dx", border_2.attr("width") / 2);

    var players = d3.map(dataset, function(d){return d["Player"]})


    var xScale = d3.scaleLinear()
                   .domain([-.6, 2.7]) 
                   .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
    
    var yScale = d3.scaleLinear()
                   .domain([-.4, 1.6])
                   .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
  
    var dotSize = d3.scaleLinear().domain(yScale.domain()).range([1.75, 4.25])
    var dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","#39FF14"])

    var text = svg_2
    .append('text')
    .attr("id", 'topbartext')
    .attr("x", 500)
    .attr("y", 20)
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("font-family", "sans-serif")
    .text("Name: ")

    var dots = svg_2.append("g")
                    .selectAll("circle")
                    .data(dataset, function(d){return d})
                    .enter()
                    .append("circle")
                    .attr("cx", function(d){if(d["Tm"] == team){
                    console.log(xScale(d["WS"]))
                    return xScale(d["WS"])}})
                    .attr("cy", function(d){if (d["Tm"] == team){return yScale(d[selectValue]);}})
                    .attr("r", function(d){if (d["Tm"] == team){return dotSize(d["WS"])}})
                    .attr("fill", function(d){
                      if(d["Tm"] == team){
                        return dotColor(d[selectValue])
                      }
                    })
                    .on("mouseover", function(d, i){
                      d3.select(this)
                        .attr("fill", "yellow")
                      return text.text(`Name : ${i["Player"]}`);
                    })
                    .on("mouseout", function(d){
                      d3.select(this)
                      .attr("fill", function(d){
                      return dotColor(d[selectValue])
                    })
                  })
    var xAxisGen = d3.axisBottom().scale(xScale)
    var xAxis = svg_2.append("g")
                    .call(xAxisGen)
                    .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                       
    var yAxisGen = d3.axisLeft().scale(yScale)

    var changing_axis_y = svg_2.append("g")
                            .call(yAxisGen)
                            .style("transform", `translateX(${dimensions.margin.left}px)`)

    svg_2.append("text")
       .attr("id", "og")
       .attr("class", "y label")
       .attr("text-anchor", "end")
       .text("VORP")
       .attr("transform", "translate(40, 260) rotate(-90)")

    svg_2.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .text("Win Share")
        .attr("transform", "translate(400, 565)")



      d3.select("#VORP").on('click', function(){
       selectValue = "VORP"
  
       yScale = d3.scaleLinear()
                .domain([-.4, 1.6])
                .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
  
       yAxisGen = d3.axisLeft(yScale)
  
       changing_axis_y.transition().call(yAxisGen)

       dotSize = d3.scaleLinear().domain(yScale.domain()).range([1.75, 4.25])
       dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","#39FF14"])

       dots.transition()
           .attr("cx", function(d){if(d["Tm"] == team){return xScale(d["WS"])}})
           .attr("cy", function(d){if (d["Tm"] == team){return yScale(d[selectValue]);}})
           .attr("r", function(d){if (d["Tm"] == team){return dotSize(d["WS"])}})

       dots.attr("fill", function(d){
        return dotColor(d[selectValue])
        })

           .on("mouseover", function(d, i){
          d3.select(this)
          .attr("fill", "yellow")
      return text.text(`Name : ${i["Player"]}`);
      })

          .on("mouseout", function(d){
         d3.select(this)
          .attr("fill", function(d){
          return dotColor(d[selectValue])
        })
      })

        svg_2.select("#og")
        .remove()
        svg_2.append("text")
        .attr("id", "og")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .text("VORP")
        .attr("transform", "translate(40, 260) rotate(-90)")
      })


    d3.select("#BPM").on('click', function(){
        selectValue = "BPM"
   
        yScale = d3.scaleLinear()
                 .domain([-44.9, 82.9])
                 .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
   
        yAxisGen = d3.axisLeft(yScale)
   
        changing_axis_y.transition().call(yAxisGen)


        dotSize = d3.scaleLinear().domain(xScale.domain()).range([2, 6.5])
        dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","green"])
       
       dots.transition()
       .attr("cx", function(d){if(d["Tm"] == team){return xScale(d["WS"])}})
       .attr("cy", function(d){if (d["Tm"] == team){return yScale(d[selectValue]);}})
       .attr("r", function(d){if (d["Tm"] == team){return dotSize(d["WS"])}})

       dots.attr("fill", function(d){
        return dotColor(d[selectValue])
        })

           .on("mouseover", function(d, i){
          d3.select(this)
          .attr("fill", "yellow")
      return text.text(`Name : ${i["Player"]}`);
      })

          .on("mouseout", function(d){
         d3.select(this)
          .attr("fill", function(d){
          return dotColor(d[selectValue])
        })
      })


        svg_2.select("#og")
        .remove()
        svg_2.append("text")
        .attr("id", "og")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .text("BOX +/-")
        .attr("transform", "translate(40, 260) rotate(-90)")
 
       })

      d3.select("#TS").on('click', function(){
        selectValue = "TSpercent"
   
        yScale = d3.scaleLinear()
                 .domain([0, 1.5])
                 .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
   
        yAxisGen = d3.axisLeft(yScale)
   
        changing_axis_y.transition().call(yAxisGen)
        dotColor = d3.scaleLinear().domain(yScale.domain()).range(["#460041", "#ff00ee"])
  
        dots.transition()
        .attr("cx", function(d){if(d["Tm"] == team){return xScale(d["WS"])}})
        .attr("cy", function(d){if (d["Tm"] == team){return yScale(d[selectValue]);}})
        .attr("r", function(d){if (d["Tm"] == team){return dotSize(d["WS"])}})
         .attr("fill", function(d){return dotColor(d[selectValue]);})


         dots.attr("fill", function(d){return dotColor(d[selectValue]);})

         .on("mouseover", function(d, i){
           d3.select(this)
             .attr("fill", "yellow")
           return text.text(`Name : ${i["Player"]}`);
         })
         .on("mouseout", function(d){
           d3.select(this)
           .attr("fill", function(d){return dotColor(d[selectValue]);})
         })

        svg_2.select("#og")
         .remove()
        svg_2.append("text")
         .attr("id", "og")
         .attr("class", "y label")
         .attr("text-anchor", "end")
         .text("True Shooting Percent")
         .attr("transform", "translate(40, 260) rotate(-90)")
 
       })






  }
)
}
