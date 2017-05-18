
//
// Initialize state with beginning items and statuses
//    status: true => crossed out, false => not crossed
//
function initialState() {
	var state = {
        items: [
                {name: 'apples', status: false},
                {name: 'oranges', status: false},
                {name: 'milk', status: true},
                {name: 'bread', status: false}
                ]
	};
	return state;
}


//
// Add an item to the state object.
//
function addItem(state, newitem) {
	state.items.push(
			{name: newitem, status: false}
			)
	return state;
}

//
//  Given an item within the state object, return its index
//
function findIndex(state, item) {
	for (var i=0; i < state.items.length; i++) {
		if (state.items[i].name == item) {
			return i;
		}
	}
}


//
// Cross out an item, ie, reverse it's Boolean status
//
function checkItem(state, item) {
	var i = findIndex(state, item);
	state.items[i].status = !state.items[i].status;
	return state;
}


//
//  Delete the item passed as an argument from the state
//
function deleteItem(state, item) {
	var i = findIndex(state, item);
	state.items.splice(i, 1)
	return state;
}


//
//  Construct the list element that contains the item
//
function buildLine(state, index) {
	var line =  "<li> <span class='shopping-item";

	//
	//  If the item's status is true (i.e., crossed out) then add the style class
	//
	if (state.items[index].status) {
		line = line + " shopping-item__checked";
	}

	line = line + "'>" + state.items[index].name + "</span>" +
	      	"<div class='shopping-item-controls'>" +
	        "<button class='shopping-item-toggle'>" +
	        "<span class='button-label'>check</span>" +
	        "</button><button class='shopping-item-delete'>" +
	        "<span class='button-label'>delete</span>" +
	        "</button></div></li>";

	return line;
}


//
//  Create new HTML code by looping through the state. 
//	Replace the DOM when finished looping.
//
function redrawScreen(state) {
	var p = '';
	for (var i = 0; i < state.items.length; i++) {
		p = p + buildLine(state, i);
	}
	$('.shopping-list').html(p);
}


//
// 	Mainline -- event listeners
//	Perform the action to update the state and then
//		redraw the screen
//
$(function() {
	'use strict';

	var state = initialState();  //initialize state with existing items

	//
	// Event listener for adding new item
	//
	$('#js-shopping-list-form').submit(function(event) {
		event.preventDefault();
		state = addItem(state, $('#shopping-list-entry').val());
		redrawScreen(state);
		this.reset();
	});

	//
	// Event listener to check (cross-out) an existing item
	//
	$('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
		event.preventDefault();
		checkItem(state, $(event.target.closest('li')).children()[0].innerText);
		redrawScreen(state);
	});

	//
	// Event listener to delete an item
	//
	$('.shopping-list').on('click', '.shopping-item-delete', function(event) {
	 	event.preventDefault();
	 	deleteItem(state, $(this).closest('li').children()[0].innerText);
	 	redrawScreen(state);
	});

})
