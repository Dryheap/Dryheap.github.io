var buttonNames = ["ATL Hawks", "BST Celtics", "BKN Nets", "CHA Hornets"]

const teams_and_colors = [
	{ team: 'ATL Hawks', color: "#e03a3e" },
	{ team: 'BST Celtics', color: "#007a33" },
	{ team: 'BKN Nets', color: "#000000" },
	{ team: 'CHA Hornets', color: "#00788c" },
];

const CHART_WIDTH = 1000;
const CHART_HEIGHT = 200;

// to find team colors go here:
// https://nbacolors.com/
// var teams_map = d3.map({"ATL Hawks": "#e03a3e", "BST Celtics": "#007a33", "BKN Nets": "#000000", "CHA Hornets": "#00788c"});
// var teams_map = d3.map({"ATL Hawks": 4, "BST Celtics": 3, "BKN Nets": 5, "CHA Hornets": 6});

// d3.select("list_of_nba_teams")
d3.select("body")
.selectAll("input")
.data(buttonNames)
.enter()
.append("input")
.attr('width', CHART_WIDTH)
.attr('height', CHART_HEIGHT)
.attr("type","button")
.attr("class","button")
.attr("value", function (d){console.log(d); return d;} )