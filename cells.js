
//Variables
var ColNum = 70;
var RowNum = 44;
var World = document.getElementById("world");
var Cells = [];
var newCells = [];
var WorldState = false;
var Setup = true;

//color that toggle will be changed to next
var toggleColor = "green";

//rules variables
var state0 = 0;
var state1 = 0;
var state2 = 0;
var state3 = 0;
var state4 = 0;


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

function updateRules(change) {
	switch(change){
		//NO NEIGHBOR CASES
		case "on0":
			if(state0 == 0 || state0 == 2){
				state0 = state0 + 1;
				document.getElementById("on0").style.opacity = "1";
			}

			else{
				state0 = state0 -1;
				document.getElementById("on0").style.opacity = ".7";
			}
			break;

		case "off0":
			if(state0 == 0 || state0 == 1){
				state0 = state0 + 2;
				document.getElementById("off0").style.opacity = "1";
			}
			else{
				state0 = state0 - 2;
				document.getElementById("off0").style.opacity = ".7";
			}
			break;

		//ONE NEIGHBOR CASES	
		case "on1":
			if(state1 == 0 || state1 == 2){
				state1 = state1 + 1;
				document.getElementById("on1").style.opacity = "1";
			}
			else{
				state1 = state1 -1;
				document.getElementById("on1").style.opacity = ".7";
			}
			break;

		case "off1":
			if(state1 == 0 || state1 == 1){
				state1 = state1 + 2;
				document.getElementById("off1").style.opacity = "1";
			}
			else{
				state1 = state1 - 2;
				document.getElementById("off1").style.opacity = ".7";
			}
			break;

		//TWO NEIGHBOR CASES
		case "on2":
			if(state2 == 0 || state0 == 2){
				state2 = state2 + 1;
				document.getElementById("on2").style.opacity = "1";
			}
			else{
				state2 = state2 -1;
				document.getElementById("on2").style.opacity = ".7";
			}
			break;

		case "off2":
			if(state2 == 0 || state2 == 1){
				state2 = state2 + 2;
				document.getElementById("off2").style.opacity = "1";
			}
			else{
				state2 = state2 - 2;
				document.getElementById("off2").style.opacity = ".7";
			}
			break;

		//THREE NEIGHBOR CASES	
		case "on3":
			if(state3 == 0 || state3 == 2){
				state3 = state3 + 1;
				document.getElementById("on3").style.opacity = "1";
			}
			else{
				state3 = state3 -1;
				document.getElementById("on3").style.opacity = ".7";
			}
			break;

		case "off3":
			if(state3 == 0 || state3 == 1){
				state3 = state3 + 2;
				document.getElementById("off3").style.opacity = "1";
			}
			else{
				state3 = state3 - 2;
				document.getElementById("off3").style.opacity = ".7";
			}
			break;

		//FOUR NEIGHBOR CASES	
		case "on4":
			if(state4 == 0 || state4 == 2){
				state4 = state4 + 1;
				document.getElementById("on4").style.opacity = "1";
			}
			else{
				state4 = state4 -1;
				document.getElementById("on4").style.opacity = ".7";
			}
			break;

		case "off4":
			if(state4 == 0 || state4 == 1){
				state4 = state4 + 2;
				document.getElementById("off4").style.opacity = "1";
			}
			else{
				state4 = state4 - 2;
				document.getElementById("off4").style.opacity = ".7";
			}
			break;

		default:
			break;
	}
}

//updates the cells based on the set rules.
function update(i){
	if(WorldState) {
	var cell = Cells[i];
	var neighbors = countNeighbors(i);

	//0 NEIGHBORS
	if((state0 == 1 || state0 == 3) && neighbors == 0 && !cell.state)
		changeStateMirror(i, cell);

	else if((state0 == 2 || state0 == 3) && neighbors == 0 && cell.state)
		changeStateMirror(i, cell);

	//1 NEIGHBORS
	else if((state1 == 1 || state0 == 3) && neighbors == 1 && !cell.state)
		changeStateMirror(i, cell);

	else if((state1 == 2 || state0 == 3) && neighbors == 1 && cell.state)
		changeStateMirror(i, cell);

	//2 NEIGHBORS
	else if((state2 == 1 || state0 == 3) && neighbors == 2 && !cell.state)
		changeStateMirror(i, cell);

	else if((state2 == 2 || state0 == 3) && neighbors == 2 && cell.state)
		changeStateMirror(i, cell);
	
	//3 NEIGHBORS
	else if((state3 == 1 || state3 == 3) && neighbors == 3 && !cell.state)
		changeStateMirror(i, cell);

	else if((state3 == 2 || state3 == 3) && neighbors == 3 && cell.state)
		changeStateMirror(i, cell);
	
	//4 NEIGHBORS
	else if((state4 == 1 || state0 == 3) && neighbors == 4 && !cell.state)
		changeStateMirror(i, cell);

	else if((state4 == 2 || state0 == 3) && neighbors == 4 && cell.state)
		changeStateMirror(i, cell);
	}
}

//toggles the worldState
function toggle() {
	WorldState = !WorldState;
	document.getElementById("toggle").style.backgroundColor = toggleColor;
	if(toggleColor == "green")
		toggleColor = "red";
	else
		toggleColor = "green";
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
	}
}

//Calls update function on each element of the Cells Array 2 times per second
setInterval( function(){
console.log("STATE0: " + state0);
console.log("STATE1: " + state1)
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




