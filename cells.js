
//Variables
var ColNum = 70;
var RowNum = 44;
var World = document.getElementById("world");
var Cells = [];
var newCells = [];
var WorldState = false;
var Setup = true;
var WorldStyle = 2;


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
			posn = new Posn(j, i);

			//create cell reference variables to catch borders
			//red
			if(posn.y==0)
				var top = NaN;
			else
				var top = index - ColNum;
			//orange
			if(posn.y==RowNum - 1)
				var bottom= NaN;
			else
				var bottom = index + ColNum;
			//green
			if(posn.x==0)
				var left = NaN;
			else
				var left = index - 1;
			//blue
			if(posn.x==ColNum - 1)
				var right = NaN;
			else
				var right = index + 1;		


			//add cell to cells array
			Cells[index] = new Cell(top, bottom, left, right, index,"c"+j+"x"+i, posn, false);
			newCells[index] = new Cell(top, bottom, left, right, index,"c"+j+"x"+i, posn, false);


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
		newCells[i].state = false;
	}
	else {
		document.getElementById(Cells[i].id).style.backgroundColor = "black";
		Cells[i].state = true;
		newCells[i].state = true;

		/*if(!isNaN(Cells[i].top))
			document.getElementById(Cells[Cells[i].top].id).style.backgroundColor = "red";
		if(!isNaN(Cells[i].bottom))
			document.getElementById(Cells[Cells[i].bottom].id).style.backgroundColor = "orange";
		if(!isNaN(Cells[i].left))
			document.getElementById(Cells[Cells[i].left].id).style.backgroundColor = "green";
		if(!isNaN(Cells[i].right)) 
			document.getElementById(Cells[Cells[i].right].id).style.backgroundColor = "blue";*/
	}
}

//changes the cell to the opposite of its current state, without interfering with subsequent cells.
function changeStateMirror(i, cell) {
	if(cell.state) {
		document.getElementById(Cells[i].id).style.backgroundColor = "white";
		newCells[i] = new Cell(cell.top, cell.bottom, cell.left, cell.right, cell.index, cell.id, cell.posn, false);
	}
	else {
		document.getElementById(Cells[i].id).style.backgroundColor = "black";
		newCells[i] = new Cell(cell.top, cell.bottom, cell.left, cell.right, cell.index, cell.id, cell.posn, true);
	}

	/*console.log("X:" + Cells[i].posn.x);
	console.log("Y:" + Cells[i].posn.y);
	console.log("index:" + Cells[i].index);*/
}


//updates the cells based on the set rules.
function update(index){
	if(WorldState) {

		switch(WorldStyle){
			case 0:
			basicTick(index);
			break;

			case 1:
			tick1(index);
			break;

			case 2:
			growTick(index);
			break;


			default: 
			break;	
		}
	}
}

//toggles the worldState
function toggle() {
	WorldState = !WorldState;
}


//basic tick test
function basicTick(i){
	var cell = Cells[i];
	var neighbors = countNeighbors(i);

	//if(Cells[i].state && neighbors != 0);
	if(neighbors == 3 && cell.state)
		changeStateMirror(i, cell);
	else if(neighbors == 4 && !cell.state)
		changeStateMirror(i, cell);
	else if(neighbors == 2 && !cell.state)
		changeStateMirror(i, cell);
}

//grows cells outwards
function growTick(i){
	var cell = newCells[i];
	var neighbors = countNeighbors(i);
	console.log("Before: " + cell.state);
	if(neighbors == 1 && !cell.state)
		changeStateMirror(i, cell);
	console.log("After: " + cell.state);
}

//inverse basic tick
function tick1(i){
	var cell = Cells[i];
	var neighbors = countNeighbors(i, cell);

	 if(neighbors == 0 && !cell.state)
		changeStateMirror(i, cell);
}

//counts how many neighbors a given cell has and returns the value
function countNeighbors(i) {
	var neighbors = 0;
	var cell = Cells[i];
	if(!isNaN(cell.top) && Cells[cell.top].state == true)
		neighbors++;
	
	if(!isNaN(cell.bottom) && Cells[cell.bottom].state == true)
		neighbors++;	
	
	if(!isNaN(cell.left) && Cells[cell.left].state == true)
		neighbors++;
	
	if(!isNaN(cell.right) && Cells[cell.right].state == true)
		neighbors++;
	return neighbors;
}

function sweep(i) {
	if (WorldState && (newCells[i].state != Cells[i].state)) {
		changeState(i);
		console.log("AFDJSAKLFEJWQIOFJDSKLA");
	}
}

//Calls update function on each element of the Cells Array 2 times per second
setInterval( function(){	

	//Sets up the view based on the screen size
	if (Setup){
		Start();
	}
	for(var i=0; i< ColNum*RowNum; i++){
		update(i);
	}
	for(var i=0; i< ColNum*RowNum; i++){
		sweep(i);
	}
},1000/4);




