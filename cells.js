
//Variables
var RowNum = 70;
var ColNum = 44;
var World = document.getElementById("world");
var Cells = [];
var newCells = [];
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
* top: index of cell above this one
* bottom: index of cell below this one
* left: index of cell to the left of thisone
* right: index of cell to the right of this one
* index: index within Cells array
* id: id of cell in html based on coordinate
* posn: posn object with the x and y coordinates of the cell
* state: whether the cell is considered on or off
*/
function Cell(top, bottom, left, right, index, id, posn, state) {
	this.top = top;
	this.bottom = bottom;
	this.left =left;
	this.right = right;
	this.index=index;
	this.id = id;
	this.posn = posn;
	this.state = state;
}


//Fills the Cells array with new cells based on the number of rows and colums, 
//then adds these cells as divs with unique ids to the world div.
function Start() {
	Setup = false;
	var index = 0;

	for(var i=0; i<RowNum; i++){
		for(var j=0; j<ColNum; j++){

			//create posn object
			posn = new Posn(i, j);

			//add cell to cells array
			Cells[index] = new Cell(index,"c"+j+"x"+i, posn, false);


			//create new div for the cell
			var newCell=document.createElement("div");

			//set attributes of cell
			newCell.setAttribute("class", "Cell");
			newCell.setAttribute("id", Cells[index].id);
			newCell.setAttribute("onclick", "changeState("+index+")");


			//appends new cell div to world
			document.getElementById("world").appendChild(newCell);


			//sets format of new cell
			document.getElementById(Cells[index].id).style.marginTop = Cells[index].posn.y +"vw";
			document.getElementById(Cells[index].id).style.marginLeft = Cells[index].posn.x +"vw";

			//incrememnt index variable (used to determine array index)
			index++;
		}
	}
}

//changes the cell to the opposite of its current state.
function changeState(i) {
	if(Cells[i].state) {
		document.getElementById(Cells[i].id).style.backgroundColor = "white";
		Cells[i].state = false;
	}
	else {
		document.getElementById(Cells[i].id).style.backgroundColor = "black";
		Cells[i].state = true;
	}
}
//updates the cells based on the set rules.
function update(){

}


//Calls update function on each element of the Cells Array 2 times per second
setInterval( function(){	

	//Sets up the view based on the screen size
	if (Setup){
		Start();
	}

	for(var i=0; i< RowNum*ColNum; i++){
		//changeState(i);
	}
},1000/2);




