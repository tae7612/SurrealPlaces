
let xhr = new XMLHttpRequest(),
url = "assets/places.json";
var def = 1;

// Loads and displays the menu after coming off landing page
function menuStart()
{
	
	var sel = document.getElementById('main');
	var curr = document.getElementById('landing');
	// Displays the nav
	document.getElementById('myNav').style.display ="block"
	changeScreen(def, sel, curr );
}

// Direct users back to the menu
function backMenu()
{
	var sel = document.getElementById('main');
	var curr = document.getElementById('details');
	changeScreen(def, sel, curr );
}
	
// Changes the screen output	
function changeScreen(selId, section, curr)
{
	//section - the section we want to  display
	// curr - the section currently displaying
	// stores the selected is
	localStorage.setItem("selection", selId);
	
	xhr.onreadystatechange = function(){
	if (xhr.readyState === 4 && xhr.status === 200){
		let menuItems = JSON.parse(xhr.responseText);
		// If user wants to change screen to details about an option
		if(section == document.getElementById("details"))
		{
			
			buildDesc(menuItems);
		}
		// if user want to change screen to the menu
		else if ( section == document.getElementById("main"))
		{
			buildMenu(menuItems);
			
		}
			
	}}
	// HTTP method: GET or post
	//URL
	xhr.open("GET", url, true);
	xhr.send();
	
	// Hides current section and displays the selected section
	section.style.display = "block";
	curr.style.display = "none";
			
}

// Builds the Menu
function buildMenu(items){
	let output ="";
	// Takes data from json and displays it in a menu form
 	items.forEach( function (item){	
 		var sel = 'details';
 		var curr = 'main';
		output += "<li class= 'item'" + 
			"onclick ='changeScreen("+ item.id +","+sel+","+curr+");'><div class='container'>"+
			"<img src='assets/img/" + item.pic + "'/>"  + "<div class='hiddenItemTitle'>"+item.name+"</div>"+
			"</div></li>";
 					
 	});
 	// Outputs the data to the main section
 	document.getElementById("menu_items").innerHTML = output;
}
	
// Build details about option			
function buildDesc(items){
	let output ="";
	selectedId = localStorage.getItem("selection");
 	items.forEach( function (item){
 	
 	// Takes data from json file and outputs it to show details about the option
 	// selected
 	
 	if(selectedId == item.id){
 		
		output += "<li class= 'desc'" +
 			"<p ><strong class ='title'>" + item.name + "</strong>, <span class = 'loc'>"+ item.Location+ "</span></p>" +
 			"<img src='assets/img/" + item.pic + "'/>"  +
 			"<div class = 'info'><p class = 'head'>Description: </p><p class ='data'>"+item.description+"</p></div>"+
 			"</li>"+"<button id = 'back'"+"onclick = 'backMenu();' >Back</button><br><br><br>";
 		}			
 	});
 	// Outputs data to details section
 	document.getElementById("details").innerHTML = output;
}
		
	
