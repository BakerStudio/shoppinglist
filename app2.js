//
// Initialize state with beginning items and statuses
//    status: true => crossed out, false => not marked
//		items array and status array must be kept in lockstep.
//
function initialState() {
	var liststate = {

		// items: [],
		// status: []

		items: ['apples', 'oranges', 'milk', 'bread'],
		status: [false, false, true, false]
	};
	return liststate;
}


//
// Add an item. Parameters are (1) current state and (2) the item to
//    be added. Status always starts as false, ie, not crossed
// 		out.
//
function addItem(liststate, newitem) {
	liststate.items[liststate.items.length] = newitem;
	liststate.status[liststate.status.length] = false;
	return liststate;
}


//
// Cross out an item, ie, reverse it's Boolean status
//   
function checkItem(liststate, item) {
	var i = liststate.items.indexOf(item);
	liststate.status[i] = !liststate.status[i];
	return liststate;
}


//
//  Delete the item passed as an argument from the state
//
function deleteItem(liststate, item) {
	//
	// Check for error condition of an empty state
	//
	if (liststate.items.length == 0) {
		return liststate;
	}
	// 
	// find the item, delete it and its corresponding status
	//
	var i = liststate.items.indexOf(item);
	liststate.items.splice(i, 1);
	liststate.status.splice(i, 1);
	return liststate;
}

//
//  Construct the list element that contains the item
//
var buildline = function (liststate, item, status) {

	var line =  "<li> <span class='shopping-item";

	if (status) {
		line = line + " shopping-item_checked";
	}

	line = line + "'>" + item + "</span>" + 
        	"<div class='shopping-item-controls'>" +
          "<button class='shopping-item-toggle'>" +
          "<span class='button-label'>check</span>" + 
          "</button><button class='shopping-item-delete'>" +
          "<span class='button-label'>delete</span>" +
          "</button></div></li>";
  //
  //  If the item's status is crossed out then add the crossed style
  //  
  return line;
}

//
//  Create new HTML code by looping through the state
//
function redrawScreen(liststate) {
	console.log("top of redrawScreen");
	var p = '';
	for (var i = 0; i < liststate.items.length; i++) {
		console.log("in redrawScreen " + i);
		console.log("item = " + liststate.items[i]);
		p = p + buildline(liststate, liststate.items[i], liststate.status[i]);
		console.log("p = " + p);
	}
	console.log("writing html: " + p);

	$('.shopping-list').html(p);

}



//
// Mainline -- event listeners
//		Perform the action to update the state and then
//		redraw the screen
//
$(function() {
	'use strict';

	//var liststate = {};						// define state as an object
	var liststate = initialState();  //initialize state with items

	//
	// Event listener for adding new item 
	//
	$('#js-shopping-list-form').submit(function(event) {
		event.preventDefault();
		liststate = addItem(liststate, $('#shopping-list-entry').val());
		console.log("after add " + liststate.items + ' ' + liststate.status);
		console.log("items length = " + liststate.items.length);
		redrawScreen(liststate);
	});
	console.log("outside of additem");

	//
	// Event listener to check (cross-out) an existing item
	//
	$('.shopping-list').click('.shopping-item-toggle', function(event) {
		
		event.preventDefault();
		console.log("cross-out event fired");
		checkItem(liststate, $(event.currentTarget.closest('li')).children()[0].innerText);
		redrawScreen(liststate);  
		console.log("crossout, after redrawScreen");
	});
	console.log("outside of crossout");
	//
	// Event listener to delete an item
	//
	$('.shopping-list').click('.shopping-item-delete', function(event) {
	
	 	event.preventDefault();
	 	console.log("delete item event fired");
	 	// deleteItem(liststate, $(this).closest('li').children()[0].innerText);
	 	// redrawScreen(liststate);
	 	console.log("after deleteItem & redraw screen");
	});
	console.log("outside of delete event");

})