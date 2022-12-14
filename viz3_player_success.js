function drawDefaultViz3() {
  console.log("CALLED DEFAULT")
  d3.select("#svg2").selectAll("svg > *").remove()
  var svg_2 =  d3.select("#playersuccess_viz1")
                .attr("id", "svg2")

  d3.csv("nba_adv_data.csv").then(

    function(dataset) {
      var dimensions = {
        width: 860,
        height: 675,
        margin:{
            top: 60,
            bottom: 70,
            right: 10,
            left: 80
        }
      }
      var currPlayers = new Set()


      var selectValue = "VORP"
      svg_scatter =  d3.select("#svg2")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .attr("x", 850)
      


    let border_2 = svg_scatter.append("g")
                      .append("rect")
                      .attr("rx", 20)
                      .attr("ry", 20)
                      .attr("stroke-width","1px")
                      .attr("stroke", "#5D5958")
                      .attr("fill", "None")
                      .attr("y", 25)
                      .attr("width", dimensions.width * .982)
                      .attr("height", dimensions.height *.92)
                      .attr("transform", "translate(15, -2.5)")

      var title = svg_scatter.append("text") 
                      .text('Player Success') 
                      .attr("text-anchor", "middle") 
                      .style("font-size", '24px') 
                      .attr("dy", 20)
                      .attr("dx", border_2.attr("width") / 2)
                      .attr("transform", "translate(-4, 0)");

      var players = d3.map(dataset, function(d){return d["Player"]})


      var xScale = d3.scaleLinear()
                    .domain([-.6, 2.7]) 
                    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
      
      var yScale = d3.scaleLinear()
                    .domain([-.4, 1.6])
                    .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
    
      var dotSize = d3.scaleLinear().domain(yScale.domain()).range([3, 6])
      var dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","#39FF14"])

     /* var text = svg_scatter
      .append('text')
      .attr("id", 'topbartext')
      .attr("x", 500)
      .attr("y", 20)
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("font-family", "sans-serif")
      .text("Name: ")
      .attr("transform", "translate(140, 0)")*/


      var tooltip_scatter = d3.select("body").append("g")
                    .style("position", "absolute")
                    .style("visibility", "hidden")
                    .style("background-color", "white")
                    .style("fill", "green")
                    .text("I'm a circle!");  


      var dots = svg_scatter.append("g")
                      .selectAll("circle")
                      .data(dataset, function(d){return d})
                      .enter()
                      .append("circle")
                      .attr("cx", function(d){return xScale(d["WS"])})
                      .attr("cy", function(d){return yScale(d[selectValue]);})
                      .attr("r", function(d){return dotSize(d["WS"])})
                      .attr("fill", function(d){return dotColor(d[selectValue])})
                      .on("mouseover", function(d, i){
                        d3.select(this)
                          .attr("fill", function(d){
                            tooltip_scatter.style("visibility", "visible")
                            var tooltipPlayerName = dataset.find(function(element){ 
                              return element.Player == d.Player})
                            tooltip_scatter.text(tooltipPlayerName)
                            return "yellow"
                          })
                        //return text.text(`Name: ${i["Player"]}`);
                      })
                      .on("mousemove", function(d){
                        console.log(tooltip_scatter.style("visibility"))
                        console.log(tooltip_scatter.style("top") + " : " + tooltip_scatter.style("left"))
                        console.log(d3.select(this).attr("id"))
                        return tooltip_scatter.style("top", (d3.pointer(d)[1])+"px").style("left",(d3.pointer(d)[0])+"px");
                      })
                      .on("mouseout", function(d, i){
                        console.log("mouseout: " + i["Player"])
                        if (currPlayers.size != 0 && currPlayers.has(i["Player"])) return // keep formatting if palyer is in currPlayers set
                        d3.select(this)
                        .attr("fill", function(d){
                          console.log(d[selectValue])
                        return dotColor(d[selectValue])
                      })
                      //return text.text("Name: ")
                    })
                      .on("click", function(){
                        d3.select(this)
                          .attr("fill", function(d){
                            console.log(d.Player)
                            var currFill = dotColor(d[selectValue])
                            //var currFill = d3.select(this).attr("fill")
                            // check if selected 
                            // (cannot look at currPlayers since it's not a set yet)
                            // thanks Javascript for not allowing hard-typed values!
                            if (d3.select(this).attr("stroke") == "black"){ 
                              console.log("TEST")
                              d3.select(this).attr("stroke", "none") // remove stroke
                              currPlayers.delete(d.Player)
                            }
                            else{
                              console.log("ENTERED ELSE")
                              currPlayers.add(d.Player)
                              currFill = "yellow"
                              d3.select(this).attr("stroke", "black") // add stroke
                            }
                            setPlayer_TeamViz2(currPlayers)
                            
                            return currFill


                          })
                      })

      var xAxisGen = d3.axisBottom().scale(xScale)
      var xAxis = svg_scatter.append("g")
                      .call(xAxisGen)
                      .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                        
      var yAxisGen = d3.axisLeft().scale(yScale)

      var changing_axis_y = svg_scatter.append("g")
                              .call(yAxisGen)
                              .style("transform", `translateX(${dimensions.margin.left}px)`)

                              
      svg_scatter.append("text")
        .attr("id", "og")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .text("VORP")
        .attr("transform", "translate(40, 260) rotate(-90)")

      svg_scatter.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .text("Win Share")
          .attr("transform", "translate(450, 635)")


        d3.select("#VORP").on('click', function(){
        selectValue = "VORP"
    
        yScale = d3.scaleLinear()
                  .domain([-.4, 1.6])
                  .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
    
        yAxisGen = d3.axisLeft(yScale)
    
        changing_axis_y.transition().call(yAxisGen)

        dotSize = d3.scaleLinear().domain(yScale.domain()).range([3, 6])
        dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","#39FF14"])


        dots.transition()
        .attr("cx", function(d){return xScale(d["WS"])})
        .attr("cy", function(d){return yScale(d[selectValue]);})
        .attr("r", function(d){return dotSize(d["WS"])})

        dots.attr("fill", function(d){
          if (d3.select(this).attr("stroke") == "black"){
            return "yellow"
          }
          else{
          return dotColor(d[selectValue])
          } 
          })

          .on("mouseover", function(d, i){
            d3.select(this)
              .attr("fill", "yellow")
            return text.text(`Name: ${i["Player"]}`);
          })
          .on("mouseout", function(d, i){
            console.log("mouseout: " + i["Player"])
            if (currPlayers.size != 0 && currPlayers.has(i["Player"])) return // keep formatting if palyer is in currPlayers set
            d3.select(this)
            .attr("fill", function(d){
              console.log(d[selectValue])
            return dotColor(d[selectValue])
          })
          return text.text("Name: ")
        })
          .on("click", function(){
            d3.select(this)
              .attr("fill", function(d){
                console.log(d.Player)
                var currFill = dotColor(d[selectValue])
                //var currFill = d3.select(this).attr("fill")
                // check if selected 
                // (cannot look at currPlayers since it's not a set yet)
                // thanks Javascript for not allowing hard-typed values!
                if (d3.select(this).attr("stroke") == "black"){ 
                  console.log("TEST")
                  d3.select(this).attr("stroke", "none") // remove stroke
                  currPlayers.delete(d.Player)
                }
                else{
                  console.log("ENTERED ELSE")
                  currPlayers.add(d.Player)
                  currFill = "yellow"
                  d3.select(this).attr("stroke", "black") // add stroke
                }
                console.log(currPlayers)
                setPlayer_TeamViz2(currPlayers)
                
                return currFill


              })
          })
          

          svg_scatter.select("#og")
          .remove()
          svg_scatter.append("text")
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


          dotSize = d3.scaleLinear().domain(xScale.domain()).range([3, 6])
          dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","green"])
        
        dots.transition()
        .attr("cx", function(d){return xScale(d["WS"])})
        .attr("cy", function(d){return yScale(d[selectValue]);})
        .attr("r", function(d){return dotSize(d["WS"])})

        dots.attr("fill", function(d){
          if (d3.select(this).attr("stroke") == "black"){
            return "yellow"
          }
          else{
          return dotColor(d[selectValue])
          } 
          })

          .on("mouseover", function(d, i){
            d3.select(this)
              .attr("fill", "yellow")
            return text.text(`Name: ${i["Player"]}`);
          })
          .on("mouseout", function(d, i){
            console.log("mouseout: " + i["Player"])
            if (currPlayers.size != 0 && currPlayers.has(i["Player"])) return // keep formatting if palyer is in currPlayers set
            d3.select(this)
            .attr("fill", function(d){
              console.log(d[selectValue])
            return dotColor(d[selectValue])
          })
          return text.text("Name: ")
        })
          .on("click", function(){
            d3.select(this)
              .attr("fill", function(d){
                console.log(d.Player)
                var currFill = dotColor(d[selectValue])
                //var currFill = d3.select(this).attr("fill")
                // check if selected 
                // (cannot look at currPlayers since it's not a set yet)
                // thanks Javascript for not allowing hard-typed values!
                if (d3.select(this).attr("stroke") == "black"){ 
                  console.log("TEST")
                  d3.select(this).attr("stroke", "none") // remove stroke
                  currPlayers.delete(d.Player)
                }
                else{
                  console.log("ENTERED ELSE")
                  currPlayers.add(d.Player)
                  currFill = "yellow"
                  d3.select(this).attr("stroke", "black") // add stroke
                }
                console.log(currPlayers)
                setPlayer_TeamViz2(currPlayers)
                
                return currFill


              })
          })

        svg_scatter.select("#og")
          .remove()
          svg_scatter.append("text")
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
          .attr("cx", function(d){return xScale(d["WS"])})
          .attr("cy", function(d){return yScale(d[selectValue]);})
          .attr("r", function(d){return dotSize(d["WS"])})
  
          dots.attr("fill", function(d){
            if (d3.select(this).attr("stroke") == "black"){
              return "yellow"
            }
            else{
            return dotColor(d[selectValue])
            } 
            })
  
            .on("mouseover", function(d, i){
              d3.select(this)
                .attr("fill", "yellow")
              return text.text(`Name: ${i["Player"]}`);
            })
            .on("mouseout", function(d, i){
              console.log("mouseout: " + i["Player"])
              if (currPlayers.size != 0 && currPlayers.has(i["Player"])) return // keep formatting if palyer is in currPlayers set
              d3.select(this)
              .attr("fill", function(d){
                console.log(d[selectValue])
              return dotColor(d[selectValue])
            })
            return text.text("Name: ")
          })
            .on("click", function(){
              d3.select(this)
                .attr("fill", function(d){
                  console.log(d.Player)
                  var currFill = dotColor(d[selectValue])
                  //var currFill = d3.select(this).attr("fill")
                  // check if selected 
                  // (cannot look at currPlayers since it's not a set yet)
                  // thanks Javascript for not allowing hard-typed values!
                  if (d3.select(this).attr("stroke") == "black"){ 
                    console.log("TEST")
                    d3.select(this).attr("stroke", "none") // remove stroke
                    currPlayers.delete(d.Player)
                  }
                  else{
                    console.log("ENTERED ELSE")
                    currPlayers.add(d.Player)
                    currFill = "yellow"
                    d3.select(this).attr("stroke", "black") // add stroke
                  }
                  console.log(currPlayers)
                  setPlayer_TeamViz2(currPlayers)
                  
                  return currFill
  
  
                })
            })

          svg_scatter.select("#og")
          .remove()
          svg_scatter.append("text")
          .attr("id", "og")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .text("True Shooting Percent")
          .attr("transform", "translate(40, 260) rotate(-90)")
  
        })

    }
  )
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function setTeam_PlayerViz1(teams){

console.log("Called setTeam: " + teams)

if (teams.size == 0) drawDefaultViz3();
else {
  d3.csv("nba_adv_data.csv").then(

    function(dataset) {
      var dimensions = {
        width: 860,
        height: 675,
        margin:{
            top: 60,
            bottom: 70,
            right: 10,
            left: 80
        }
      }
      var currPlayers2 = new Set()
      var selectValue = "VORP"
      var svg_newScatter = d3.select("#svg2").selectAll("svg > *").remove()


      var svg_newScatter2 = d3.select("#svg2")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .attr("x", 850)
        .attr("fill", "black")
      


    let border_3 = svg_newScatter2.append("g")
                                  .append("rect")
                                  .attr("rx", 20)
                                  .attr("ry", 20)
                                  .attr("stroke-width","1px")
                                  .attr("stroke", "#5D5958")
                                  .attr("fill", "None")
                                  .attr("y", 25)
                                  .attr("width", dimensions.width * .982)
                                  .attr("height", dimensions.height *.92)
                                  .attr("transform", "translate(15, -2.5)")

      var title = svg_newScatter2.append("text") 
                      .text('Player Success') 
                      .attr("text-anchor", "middle") 
                      .style("font-size", '24px') 
                      .attr("dy", 20)
                      .attr("dx", border_3.attr("width") / 2)
                      .attr("transform", "translate(-4, 0)");

      var players = d3.map(dataset, function(d){return d["Player"]})


      var xScale = d3.scaleLinear()
                    .domain([-.6, 2.7]) 
                    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
      
      var yScale = d3.scaleLinear()
                    .domain([-.4, 1.6])
                    .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
    
      var dotSize = d3.scaleLinear().domain(yScale.domain()).range([3, 6])
      var dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","#39FF14"])

      var text = svg_newScatter2
      .append('text')
      .attr("id", 'topbartext')
      .attr("x", 500)
      .attr("y", 20)
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("font-family", "sans-serif")
      .text("Name: ")
      .attr("transform", "translate(140, 0)")


      var dots = svg_newScatter2.append("g")
                      .selectAll("circle")
                      .data(dataset, function(d){return d})
                      .enter()
                      .append("circle")
                      .attr("cx", function(d){if(teams.has(d["Tm"])){return xScale(d["WS"])}})
                      .attr("cy", function(d){if (teams.has(d["Tm"])){return yScale(d[selectValue]);}})
                      .attr("r", function(d){if (teams.has(d["Tm"])){return dotSize(d["WS"])}})
                      .attr("fill", function(d){
                        if(teams.has(d["Tm"])){
                          return dotColor(d[selectValue])
                        }
                      })
                      .on("mouseover", function(d, i){
                        d3.select(this)
                          .attr("fill", "yellow")
                        return text.text(`Name: ${i["Player"]}`);
                      })
                      .on("mouseout", function(d, i){
                        console.log("mouseout: " + i["Player"])
                        if (currPlayers2.size != 0 && currPlayers2.has(i["Player"])) return // keep formatting if palyer is in currPlayers set
                        d3.select(this)
                        .attr("fill", function(d){
                          console.log(d[selectValue])
                        return dotColor(d[selectValue])
                      })
                      return text.text("Name: ")
                    })
                      .on("click", function(){
                        d3.select(this)
                          .attr("fill", function(d){
                            console.log(d.Player)
                            var currFill = dotColor(d[selectValue])
                            //var currFill = d3.select(this).attr("fill")
                            // check if selected 
                            // (cannot look at currPlayers since it's not a set yet)
                            // thanks Javascript for not allowing hard-typed values!
                            if (d3.select(this).attr("stroke") == "black"){ 
                              console.log("TEST")
                              d3.select(this).attr("stroke", "none") // remove stroke
                              currPlayers2.delete(d.Player)
                            }
                            else{
                              console.log("ENTERED ELSE")
                              currPlayers2.add(d.Player)
                              currFill = "yellow"
                              d3.select(this).attr("stroke", "black") // add stroke
                            }
                            console.log(currPlayers2)
                            setPlayer_TeamViz2(currPlayers2)
                            
                            return currFill


                          })
                      })


      var xAxisGen = d3.axisBottom().scale(xScale)
      var xAxis = svg_newScatter2.append("g")
                      .call(xAxisGen)
                      .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                        
      var yAxisGen = d3.axisLeft().scale(yScale)

      var changing_axis_y = svg_newScatter2.append("g")
                              .call(yAxisGen)
                              .style("transform", `translateX(${dimensions.margin.left}px)`)


      svg_newScatter2.append("text")
        .attr("id", "og")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .text("VORP")
        .attr("transform", "translate(40, 260) rotate(-90)")

      svg_newScatter2.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .text("Win Share")
          .attr("transform", "translate(450, 635)")

        d3.select("#VORP").on('click', function(){
        selectValue = "VORP"
    
        yScale = d3.scaleLinear()
                  .domain([-.4, 1.6])
                  .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
    
        yAxisGen = d3.axisLeft(yScale)
    
        changing_axis_y.transition().call(yAxisGen)

        dotSize = d3.scaleLinear().domain(yScale.domain()).range([3, 6])
        dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","#39FF14"])

        dots.transition()
            .attr("cx", function(d){if(teams.has(d["Tm"])){return xScale(d["WS"])}})
            .attr("cy", function(d){if (teams.has(d["Tm"])){return yScale(d[selectValue]);}})
            .attr("r", function(d){if (teams.has(d["Tm"])){return dotSize(d["WS"])}})

            dots.attr("fill", function(d){
              if (d3.select(this).attr("stroke") == "black"){
                return "yellow"
              }
              else{
              return dotColor(d[selectValue])
              } 
              })
    
              .on("mouseover", function(d, i){
                d3.select(this)
                  .attr("fill", "yellow")
                return text.text(`Name: ${i["Player"]}`);
              })
              .on("mouseout", function(d, i){
                console.log("mouseout: " + i["Player"])
                if (currPlayers2.size != 0 && currPlayers2.has(i["Player"])) return // keep formatting if palyer is in currPlayers set
                d3.select(this)
                .attr("fill", function(d){
                  console.log(d[selectValue])
                return dotColor(d[selectValue])
              })
              return text.text("Name: ")
            })
              .on("click", function(){
                d3.select(this)
                  .attr("fill", function(d){
                    console.log(d.Player)
                    var currFill = dotColor(d[selectValue])
                    //var currFill = d3.select(this).attr("fill")
                    // check if selected 
                    // (cannot look at currPlayers since it's not a set yet)
                    // thanks Javascript for not allowing hard-typed values!
                    if (d3.select(this).attr("stroke") == "black"){ 
                      console.log("TEST")
                      d3.select(this).attr("stroke", "none") // remove stroke
                      currPlayers2.delete(d.Player)
                    }
                    else{
                      console.log("ENTERED ELSE")
                      currPlayers2.add(d.Player)
                      currFill = "yellow"
                      d3.select(this).attr("stroke", "black") // add stroke
                    }
                    console.log(currPlayers2)
                    setPlayer_TeamViz2(currPlayers2)
                    
                    return currFill


                  })
              })

          svg_newScatter2.select("#og")
          .remove()
          svg_newScatter2.append("text")
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


          dotSize = d3.scaleLinear().domain(xScale.domain()).range([3, 6])
          dotColor =  d3.scaleLinear().interpolate(d3.interpolateRgb).range(["red","green"])
        
        dots.transition()
        .attr("cx", function(d){if(teams.has(d["Tm"])){return xScale(d["WS"])}})
        .attr("cy", function(d){if (teams.has(d["Tm"])){return yScale(d[selectValue]);}})
        .attr("r", function(d){if (teams.has(d["Tm"])){return dotSize(d["WS"])}})

        dots.attr("fill", function(d){
          if (d3.select(this).attr("stroke") == "black"){
            return "yellow"
          }
          else{
          return dotColor(d[selectValue])
          } 
          })

          .on("mouseover", function(d, i){
            d3.select(this)
              .attr("fill", "yellow")
            return text.text(`Name: ${i["Player"]}`);
          })
          .on("mouseout", function(d, i){
            console.log("mouseout: " + i["Player"])
            if (currPlayers2.size != 0 && currPlayers2.has(i["Player"])) return // keep formatting if palyer is in currPlayers set
            d3.select(this)
            .attr("fill", function(d){
              console.log(d[selectValue])
            return dotColor(d[selectValue])
          })
          return text.text("Name: ")
        })
          .on("click", function(){
            d3.select(this)
              .attr("fill", function(d){
                console.log(d.Player)
                var currFill = dotColor(d[selectValue])
                //var currFill = d3.select(this).attr("fill")
                // check if selected 
                // (cannot look at currPlayers since it's not a set yet)
                // thanks Javascript for not allowing hard-typed values!
                if (d3.select(this).attr("stroke") == "black"){ 
                  console.log("TEST")
                  d3.select(this).attr("stroke", "none") // remove stroke
                  currPlayers2.delete(d.Player)
                }
                else{
                  console.log("ENTERED ELSE")
                  currPlayers2.add(d.Player)
                  currFill = "yellow"
                  d3.select(this).attr("stroke", "black") // add stroke
                }
                console.log(currPlayers2)
                setPlayer_TeamViz2(currPlayers2)
                
                return currFill


              })
          })

        svg_newScatter2.select("#og")
          .remove()
          svg_newScatter2.append("text")
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
          .attr("cx", function(d){if(teams.has(d["Tm"])){return xScale(d["WS"])}})
          .attr("cy", function(d){if (teams.has(d["Tm"])){return yScale(d[selectValue]);}})
          .attr("r", function(d){if (teams.has(d["Tm"])){return dotSize(d["WS"])}})

          dots.attr("fill", function(d){
            if (d3.select(this).attr("stroke") == "black"){
              return "yellow"
            }
            else{
            return dotColor(d[selectValue])
            } 
            })
  
            .on("mouseover", function(d, i){
              d3.select(this)
                .attr("fill", "yellow")
              return text.text(`Name: ${i["Player"]}`);
            })
            .on("mouseout", function(d, i){
              console.log("mouseout: " + i["Player"])
              if (currPlayers2.size != 0 && currPlayers2.has(i["Player"])) return // keep formatting if palyer is in currPlayers set
              d3.select(this)
              .attr("fill", function(d){
                console.log(d[selectValue])
              return dotColor(d[selectValue])
            })
            return text.text("Name: ")
          })
            .on("click", function(){
              d3.select(this)
                .attr("fill", function(d){
                  console.log(d.Player)
                  var currFill = dotColor(d[selectValue])
                  //var currFill = d3.select(this).attr("fill")
                  // check if selected 
                  // (cannot look at currPlayers since it's not a set yet)
                  // thanks Javascript for not allowing hard-typed values!
                  if (d3.select(this).attr("stroke") == "black"){ 
                    console.log("TEST")
                    d3.select(this).attr("stroke", "none") // remove stroke
                    currPlayers2.delete(d.Player)
                  }
                  else{
                    console.log("ENTERED ELSE")
                    currPlayers2.add(d.Player)
                    currFill = "yellow"
                    d3.select(this).attr("stroke", "black") // add stroke
                  }
                  console.log(currPlayers2)
                  setPlayer_TeamViz2(currPlayers2)
                  
                  return currFill


                })
            })

          svg_newScatter2.select("#og")
          .remove()
          svg_newScatter2.append("text")
          .attr("id", "og")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .text("True Shooting Percent")
          .attr("transform", "translate(40, 260) rotate(-90)")
  
        })

    }
  )
  }
}
