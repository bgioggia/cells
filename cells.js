
//Variables
var RowNum = 70;
var ColNum = 44;
var World = document.getElementById("world");
var Cells = [];
var WorldState = true;
var Setup = true;


//Posn object constructor
/*
* x: x coordinate of posn
* y: y posn of coordinate
*/
function Posn(x, y) {
	this.x = x;
  	this.y = y;
}


//Cell object constructor
/*
* posn: posn object with the x and y coordinates of the cell
* state: whether the cell is considered on or off
*/
function Cell(posn, state, size) {
	this.posn = posn;
	this.state = false;
}


//Fills the Cells array with new cells based on the number of rows and colums, 
//then adds these cells as divs with unique ids to the world div.
function Setup() {
	Setup = false;

	for(var i=0; i<ColNum; i++){
		for(var j=0; i<RowNum) {
			//posn=
		}
	}
}

//updates the cells based on the set rules.
function update(){

}


//Calls update function on each element of the Cells Array 2 times per second
setInterval( function(){	

	//Sets up the view based on the screen size
	if (Setup)
		Setup();

	for(var i=0; i<ColNum; i++){
		for(var j=0; i<RowNum) {

		update(i);
		}
	}
},1000/2);




