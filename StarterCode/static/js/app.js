// Create js reference objects from html  using d3 
var tbody = d3.select("tbody"); 
var filter_button = d3.select("#filter-btn"); 
var date_input = d3.select("#datetime");


// Load
function load_Data(table_data){
	//clear table body row 
	tbody.html("");
	var tr = tbody.selectAll('tr').data(table_data).enter().append('tr');
	tr.append('td').html(m => m.datetime);
	tr.append('td').html(m => m.city);
	tr.append('td').html(m => m.state);
	tr.append('td').html(m => m.country);
	tr.append('td').html(m => m.shape);
	tr.append('td').html(m => m.durationMinutes);
	tr.append('td').html(m => m.comments);
};
load_Data(data);


//Function to sort object by date to get valid range of date input 
data.sort(function(a,b){
	return (new Date(b.datetime) - new Date(a.datetime)); 
});

//after sort array from max to min date 
var data_length = data.length; 
var max_date = data[0].datetime; 
var min_date = data[data_length - 1].datetime;


filter_button.on("click", function() {
	d3.event.preventDefault();

	// Exttract date value from user input
  	var date_value = date_input.property("value");

  	var search_result = [];

  	if(date_value.length == 0){
  		alert("Please Enter Search Date"); 
  	}
  	else{
  		if ((date_value != 0) && (date_value < min_date || date_value > max_date)){
  			alert("Invalid! Date range from 01/01/10 to 01/13/10");
  		}
  		else {
  			search_result = data.filter(element => element.datetime === date_value);
  		}
  	}

  //Can implement alert of no search found if have time :D 
	tbody.html("");
	load_Data(search_result);
});






