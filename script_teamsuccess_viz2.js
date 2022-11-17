d3.csv("nba_adv_data.csv").then(

  function(dataset) {

    var dimensions = {
      width: 500,
      height: 450,
      margin:{
          top: 60,
          bottom: 70,
          right: 10,
          left: 80
      }
    }
    var svg_2 =  d3.select("#teamsuccess_viz2")
      .style("width", dimensions.width)
      .style("height", dimensions.height)
      .attr("x", 850)
      //.attr("transform", "translate(300,155)")

    console.log(dimensions.width)

   let border_2 = svg_2.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
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

    var xAccessor = d => d["WS"]
    var yAccessor = d => d["VORP"]

    var xScale = d3.scaleLinear()
                   .domain(d3.extent(dataset, xAccessor))
                   .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
    
    var yScale = d3.scaleLinear()
                   .domain(d3.extent(dataset, yAccessor))
                   .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

    var dots = svg_2.append("g")
                    .selectAll("circle")
                    .data(dataset, function(d){return d})
                    .enter()
                    .append("circle")
                    .attr("cx", d => xScale(xAccessor(d)))
                    .attr("cy", d => yScale(yAccessor(d)))
                    .attr("r", 2.5)
                    .attr("fill", "black")
                    
    var xAxisGen = d3.axisBottom().scale(xScale)
    var xAxis = svg_2.append("g")
                    .call(xAxisGen)
                    .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
                    
                    
    var yAxisGen = d3.axisLeft().scale(yScale)
    var yAxis = svg_2.append("g")
                   .call(yAxisGen)
                   .style("transform", `translateX(${dimensions.margin.left}px)`)

  }
)
