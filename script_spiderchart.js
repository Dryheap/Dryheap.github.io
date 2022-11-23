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
    var radius = 80;
    var center = {x:50, y: 50};
                    
    const radialScale = d3.scaleLinear()
                      .domain([0, maxValue]) 
                      .range([radius, 0]) 
    var axis = d3.axisRight()
                  .scale(radialScale)
                  .ticks(5)
    spiderchart_svg.append('g')
       .attr('transform', `translate(${center.x},${center.y  - radius})`)
       .call(axis);

    let val, angle;
    for (val = 0; val <= maxValue; val += maxValue / 5) {
      const r = radialScale(val);
         spiderchart_svg.append('circle')
           .attr('cx', center.x)
           .attr('cy', center.y)
           .attr('r', r)
           .style('stroke', '#aaa')
           .style('fill', 'none');
       }

  }
)
