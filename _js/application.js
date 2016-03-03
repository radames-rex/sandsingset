var cont=0;
/*	Drag in Drop
*
*	Apenas Coloca a música, não retira!
*/
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();   
    var data = ev.dataTransfer.getData("text");  

    document.getElementById(data).setAttribute("draggable", "false"); 
    document.getElementById(data).setAttribute("class", "sing opaco"); 

    var timebar = document.getElementById(data).getAttribute("data-timebar"); 

    ev.target.setAttribute("class", "slot borda-slot anime-"+data);
    ev.target.setAttribute("ondrop", "");
    document.getElementById("sound-"+data).play();    

    createTimeBars(ev.target.getAttribute("id"),timebar);
}

/* Sound Time Bars
*
*  Criação das sound-time-bars animadas com D3 JS	
*/
var height = 25;
var width = 105;
var canvas = d3.select("div.compass");

for(var i=0;i<10;i++){

	canvas.append("svg")
				.attr("id","svgslot-"+(i+1))
				.attr("height",height)
				.attr("width",width)
				.style("margin","0 1.1% 0 0.5%");

} 		

function createTimeBars(id,delay){
	var dataArray = [5,4,3,3,7,8,1,9,10,1];
	var canva = d3.select("svg#svg"+id);
	var heightScale = d3.scale.linear()
						.domain([0,10])
						.range([0, height]);

	var bar = canva.selectAll("rect")
					.data(dataArray)
					.enter()
						.append("rect")
						.attr("height",0)
						.attr("width",8)
						.attr("fill","#000")
						.attr("x", function(d,i){return (i*10)+3;})	
						.attr("fill","red");		

	var duration = (8000-delay)/24;

	var animation = bar.transition()
							.delay(delay)
							.duration(duration)
							.attr("height",function(d){return heightScale(d);});								

	function randomScale(){
		return function(d){return heightScale(d)*Math.random();};
	}

	for(var i=0;i<124;i++){
		animation = animation.transition()
						.duration(duration)
						.attr("height",randomScale());
	}					

	animation.attr("height",function(d){return 0;});		
}	

	