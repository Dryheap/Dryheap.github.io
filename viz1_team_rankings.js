import Color from './colors.js';

d3.csv("nba_adv_data.csv").then(

  function(dataset) {


    var dimensions = {
      width: 1000,
      height: 700,
      margin:{
          top: 60,
          bottom: 20,
          right: 30,
          left: 80
      }
  }

  console.log(Color["ATL"]["mainColor"])

    var svg =  d3.select("#viz1_team_rankings")
      .style("width", dimensions.width)
      .style("height", dimensions.height)
      //.attr("transform", "translate(400, 100)")

    var title = svg.append("text") 
                  .text('Games Won') 
                  .attr("text-anchor", "middle") 
                  .style("font-size", '24px') 
                  .attr("dy", 20)
                  .attr("dx", dimensions.width / 2);

    let border = svg.append("g")
                    .append("rect")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("y", 25)
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height)


    // This is where the fun begins

    dataset.sort(function(a, b) {
      return b.TeamWins - a.TeamWins;
    });


    // get team info
    // this currently is used for the upper-level groupings
    // can be altered to be True Shooting Percentage, etc
    var teams = d3.map(dataset, function(d){console.log(d["Tm"]); return(d["Tm"])})


    // X-axis
    var x = d3.scaleBand()
      .domain(teams)
      .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
      .padding([0.2])

    svg.append("g")
      .attr("transform", "translate(0," + (dimensions.height - dimensions.margin.bottom) + ")")
      .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([15, 65])
      .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top]);

    svg.append("g")
      .call(d3.axisLeft(y));


    var tmAndTeamWins = dataset.map(function(d) {
                                return {
                                  team: d.Tm,
                                  wins: d.TeamWins
                                }
                              });

    
    var graph = svg.append("g")
                      .selectAll("rect")
                      .data(new Set(tmAndTeamWins.map(function(d) { return {key: d.team, value: d.wins}; })).values())
                      .enter().append("rect")
                        .attr("x", function(d) { console.log(d.key + " : " + x(d.key)); return x(d.key); })
                        .attr("y", function(d) { console.log(d.value); return y(d.value); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return dimensions.height - dimensions.margin.bottom - y(d.value); })
                        .attr("stroke", "none")
                        .attr("fill", function(d) { 
                          var teamName = d.key
                          console.log(teamName);
                          console.log(Color[teamName]["colors"][Color[teamName]["mainColor"]]["hex"])
                          return Color[teamName]["colors"][Color[teamName]["mainColor"]]["hex"]; 
                        })
                      // adding mouseover and mouseout styling and tooltip
                      .on("mouseover", function(d) {
                        d3.select(this)
                          .attr("fill", function(d) {
                            if (d3.select(this).attr("fill") == "#010101") return "#202020" // silly addition to make the black rect brighter
                            return (d3.color(Color[d.key]["colors"][Color[d.key]["mainColor"]]["hex"]).brighter())
                          })
                          .attr("stroke", function(d) {
                            if (d3.select(this).attr("stroke") == "black") return "black"
                            else if (d3.select(this).attr("fill") == "#010101") return "#404040" // silly addition to make the black rect brighter
                            else return (d3.color(Color[d.key]["colors"][Color[d.key]["mainColor"]]["hex"]).brighter(4))
                          })
                          .attr("stroke-width", "2")
                          // .attr("stroke", "black")
                          // .attr("stroke-width", "1.2")
                      })
                      .on("mouseout", function(d) {
                        d3.select(this)
                          .attr("fill", function(d) {
                            return Color[d.key]["colors"][Color[d.key]["mainColor"]]["hex"]
                          })
                          .attr("stroke", function(d) {
                            if (d3.select(this).attr("stroke") == "black") return "black"
                            else return "none"
                          })
                          // .attr("stroke", "none")
                      })
                      // on-click actions and styling
                      .on("click", function() {
                        d3.select(this)
                          // .attr("fill", "#38c9b4")
                          // .attr("stroke", this.color + "#222222")
                          .attr("stroke", function(d){
                            setTeam(d.key)
                            if (d3.select(this).attr("stroke") != "black") return "black"
                            else return "none"
                          })
                          .attr("stroke-width", "2")
                      })



  var yAxisGen = d3.axisLeft().scale(y)
  var yAxis = svg.append("g")
                .call(yAxisGen)
                .style("transform", `translateX(${dimensions.margin.left}px)`)


  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .text("Games Won")
    .attr("transform", "translate(40, 300) rotate(-90)")

  

  }

)
