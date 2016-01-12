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

    ev.target.setAttribute("class", "slot borda-slot anime-"+data);
    ev.target.setAttribute("ondrop", "");
    document.getElementById("sound-"+data).play();    
}
