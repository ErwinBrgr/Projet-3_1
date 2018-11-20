var canvasObj = {
	
	//propriétés obj canvasObj

	canvasWidth : "490px",
	canvasHeight : "220px",
	canvasDiv : document.getElementById('canvasDiv'),
	canvas : document.createElement('canvas'),
	clickX : new Array(),
	clickY : new Array(),
	clickDrag : new Array(),



//Méthode de l'objet


	addClick : function(x, y, dragging)
	{
		this.clickX.push(x);
  		this.clickY.push(y);
  		this.clickDrag.push(dragging);
	},


	redraw : function()
	{
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas

  		this.context.strokeStyle = "#df4b26";
  		this.context.lineJoin = "round";
  		this.context.lineWidth = 5;

  
  		for(var i=0; i < this.clickX.length; i++) {
   			this.context.beginPath();
		    if(this.clickDrag[i] && i){
		      this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
		     }else{
		      this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
		     }
		     this.context.lineTo(this.clickX[i], this.clickY[i]);
		     this.context.closePath();
		     this.context.stroke();
  		};

	},


};
canvasObj.context = canvasObj.canvas.getContext("2d");
var paint;
canvasObj.canvas.setAttribute('width',canvasObj.canvasWidth);
canvasObj.canvas.setAttribute('height', canvasObj.canvasHeight);
canvasObj.canvas.setAttribute('id', 'canvas');
canvasObj.canvasDiv.appendChild(canvasObj.canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  canvasObj.paint = true;
  canvasObj.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  canvasObj.redraw();
});

$('#canvas').mousemove(function(e){
  if(canvasObj.paint){
    canvasObj.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    canvasObj.redraw();
  }
});

$('#canvas').mouseup(function(e){
  canvasObj.paint = false;
});

$('#canvas').mouseleave(function(e){
  canvasObj.paint = false;
});

$('#clearCanvasSimple').mousedown(function(e)
  {
    canvasObj.clickX = new Array();
    canvasObj.clickY = new Array();
    canvasObj.clickDrag = new Array();
    canvasObj.redraw();
});