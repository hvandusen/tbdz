// node modules
var socket = io();

// initialize values
var noteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var row, column;
var theGrid = [];
var thisRow;
var rows = 16;
var columns = 32; 	

// create polarity grid
for (i = 0; i < rows; i++){
	thisRow = [];
	for (j = 0; j < columns; j++){
		thisRow.push(-1);
	}	
	theGrid.push(thisRow);
}

// page interaction
$(document).ready(function(){
	// initial grid and mouse states
	var tweet = grid(16,32,$(".gridContainer"));
	var mouseIsClicked = false;
	var stepEntered = false;

	// cell click
	$('.row .step').mousedown(function(){
		// track mouse state
		mouseIsClicked = true;
		
		// toggle style	
		$(this).toggleClass("clicked");
		
		// toggle corresponding polarity grid cell
		column = $(this).index();
		row = $(this).parent().index();
		theGrid[row][column] =  theGrid[row][column] * -1;
	
	// exit on unclick
	}).mouseup(function(){
		mouseIsClicked = false;
	
	// subsequent dragged cells
	}).mouseenter(function(){
		if(mouseIsClicked){
			// toggle style
			$(this).toggleClass("clicked");
			
			// toggle corresponding polarity grid cell
			column = $(this).index();
			row = $(this).parent().index();
			theGrid[row][column] *= -1;
			
		}
	});

	// update style on '+' button
	$('#plus').mousedown(function(){
		$('.newInstrument').toggleClass("clicked");
	});

	// create new instance from user menu specs
	$(".newInsButton").click(function(){
		var instName = $("#insName").val();
		var rowCount = $("#rowCount").val();
		console.log("instName:  ", instName);
		console.log("rowCount:   ",rowCount);
	});


});

// grid creation function for init and new tabs
function grid(rows, columns, element){
	// initial values
	var w = Math.floor(100/columns);
	var h = Math.floor(100/rows);
	var labels = $("<div class='gridlabels'></div>")
	
	// console checks for grid dimensions
	console.log("height: " , element.height());
	console.log("width: ", element.width());

	// create the column of labels
	for(var i = 0; i < rows; i++){
		thisNote = noteNames[i%noteNames.length];
		thisOctave = Math.floor(i/noteNames.length);
		var rowLabel = $("<div class='rowlabel'>"+thisNote+thisOctave+"</div>").appendTo(labels);		
	}
	element.append(labels);

	// create the grid
	var gr = $("<div class='grid'></div>")

	for(var i = 0; i < rows; i++){
		var row = $("<div class='row'></div>").appendTo(gr);
		for(var k = 0; k < columns; k++){
			row.append("<div class='step'></div>");
		}
	}
	element.append(gr);

	// size elements based pct for flexible resizing
	$(".row").css({
		"height": h+"%"
	});
	$(".step").css({
		"width": w+"%"
	});
	$(".rowlabel").css({
	"height": h+"%"
	});

	// Create the polarity grid for click/unclick
	for (i = 0; i < rows; i++){
 		thisRow = [];
		for (j = 0; j < columns; j++){
			thisRow.push(-1);
		}
		theGrid.push(thisRow);
	}

	// return completed grid
	return gr;
}
