
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

	for(var i=0; i<ColNum; i++){
		for(var j=0; j<RowNum; j++){

			//create posn object
			posn = new Posn(j, i);

			//create cell reference variables to catch borders
			//red
			if(posn.y==0)
				var top = NaN;
			else
				var top = ColNum + index;
			//orange
			if(posn.y==ColNum - 1)
				var top= NaN;
			else
				var bottom = index - ColNum;
			//green
			if(posn.x==0)
				var left = NaN;
			else
				var left = index - 1;
			//blue
			if(posn.x==RowNum - 1)
				var right = NaN;
			else
				var right = index + 1;		


			//add cell to cells array
			Cells[index] = new Cell(top, bottom, left, right, index,"c"+j+"x"+i, posn, false);


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
	console.log("X:" + Cells[i].posn.x);
	console.log("Y:" + Cells[i].posn.y);
	console.log("index:" + Cells[i].index);
	if(Cells[i].state) {
		document.getElementById(Cells[i].id).style.backgroundColor = "white";
		Cells[i].state = false;
	}
	else {
		document.getElementById(Cells[i].id).style.backgroundColor = "black";
		if(!isNaN(Cells[i].top))
			document.getElementById(Cells[Cells[i].top].id).style.backgroundColor = "red";
		if(!isNaN(Cells[i].bottom))
			document.getElementById(Cells[Cells[i].bottom].id).style.backgroundColor = "orange";
		if(!isNaN(Cells[i].left))
			document.getElementById(Cells[Cells[i].left].id).style.backgroundColor = "blue";
		if(!isNaN(Cells[i].right)) 
			document.getElementById(Cells[Cells[i].right].id).style.backgroundColor = "green";
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




