var row = document.getElementsByTagName('td');
var r = document.getElementById('ter');
var a = 20;
var b = 10;
var s = '';

var x = 0;
var y = 0;
var figure = "";
var fall;
var key_down = false;

var downElements = new Array();
var elements = new Array();
for(var i=0;i<a;i++)
{
	downElements[i] = new Array();
	elements[i] = new Array();
	for(var j=0;j<b;j++)
	{
		downElements[i][j] = 0;
		elements[i][j] = 0;
	};
};

for(var i=0;i<a;i++)
{
	s += '<tr>';
	for(var j=0;j<b;j++)
	{	
		s+= '<td>' + " " + '</td>';
	};
	s += '</tr>';
};
r.innerHTML = s;

function out () {
	var m = 0;
	for(var i=0;i<a;i++)
	{
		for(var j=0;j<b;j++)
		{
			elements[i][j] = row[m];
			m++;
		};
	};
}

out();

function pick() {

	var t = [[0,0,0],
			 [0,1,0],
			 [1,1,1]];

	var z = [[0,0,0],
			 [1,1,0],
			 [0,1,1]];

	var s = [[0,0,0],
			 [0,1,1],
			 [1,1,0]];

	var i = [[0,0,0,0],
			 [0,0,0,0],
			 [0,0,0,0],
			 [1,1,1,1]];

	var l = [[0,0,0],
			 [1,0,0],
			 [1,1,1]];

	var j = [[0,0,0],
			 [0,0,1],
			 [1,1,1]];			 

	var o = [[1,1],
			 [1,1]];

	var rand = Math.floor(Math.random() * 7);

	switch (rand) {
	    case 0:
	        return t;
	        break;
	    case 1:
	        return z;
	        break;
	    case 2:
	        return s;
	        break;
	    case 3:
	        return i;
	        break;    
	    case 4:
	        return l;
	        break;
	    case 5:
	        return j;
	        break;
	    case 6:
	        return o;
	        break;
	}
}
function store_shape() {
	for(var i=0;i<a;i++)
	{
		for(var j=0;j<b;j++)
		{
			if(elements[i][j].className == "teli")
			{
				downElements[i][j] = 1;
			}
			else
			{
				downElements[i][j] = 0;
			}
		};
	};
}

function clr() {
	for(var i=0;i<a;i++)
	{
		for(var j=0;j<b;j++)
		{
			elements[i][j] == "ures";
		};
	};
}

function store_downer_elements() {

	for(var i=0;i<a;i++)
	{
		for(var j=0;j<b;j++)
		{
			if(downElements[i][j] == 1)
			{
				elements[i][j].className = "teli";
			}
			else
			{
				elements[i][j].className = "ures";	
			}
		};
	};
}

function put_in(x,y,shape) {

	for(var i=0;i<shape.length;i++)
	{
		for(var j=0;j<shape.length;j++)
		{
			if(shape[i][j] === 1)
			{
				elements[x+i][y+j].className = "teli";
				//downElements[x+i][y+j] = 1;
			}
			else
			{
				elements[x+i][y+j].className = "ures";
				//downElements[x+i][y+j] = 0;

			}
		};
	};
}


	$(document).ready(function(){

		$("body").keydown(function(e) {
			  if(e.which === 40) { // down
				 key_down = true;

			  }
			});
			$("body").keyup(function(e) {
			  if(e.which === 40) { // down
				 key_down = false;
			  }
			});
	});


function down() {

	if(key_down) {
	   clr();
	   store_downer_elements();
	   put_in(x,y,figure); 
	   at_bottom();
	   x++;

	   clr();
	   store_downer_elements();
	   put_in(x,y,figure); 
	   at_bottom();
	   x++;
	} else {
	   clr();
	   store_downer_elements();
	   put_in(x,y,figure); 
	   at_bottom();
	   x++;
	}
}

var div = document.getElementById('s');
var lastrow = "";

function re_load() {
	x = 0;
	y = Math.floor(Math.random() * (b-2));
	figure = pick();
	fall = setInterval(down,200);
}

re_load();


function verify(X,Y) {

	for(var i=0;i<figure.length;i++)
	{
		if(figure[figure.length-1][i] === 1)
		{
			if(downElements[X+figure.length][Y+i] === 1)
			{
				return false;
			}
		}
		else 
		{
			if(downElements[X+figure.length-1][i] === 1)
			{
				elements[X+figure.length-1][Y+i].className = "teli";
				return false;
			}
		}
	}

}

function at_bottom() {
	switch (figure.length) {
	    case 2:
	    	if(x > 17 || verify(x,y) === false) { clearInterval(fall); store_shape(); re_load(); }
	        break;
	    case 3:
			if(x > 16 || verify(x,y) === false) { clearInterval(fall); store_shape(); re_load(); }
	        break;
	    case 4:
			if(x > 15 || verify(x,y) === false) { clearInterval(fall); store_shape(); re_load(); }
	        break;
	}
}

function move() {
	switch (figure.length) {
	    case 2:
	    	if(y < 8) y++;
	        break;
	    case 3:
			if(y < 7) y++;
	        break;
	    case 4:
	        if(y < 6) y++;
	        break;
	}
}

$(document).ready(function(){
	$("body").keydown(function(e) {
	  if(e.which === 37) { // left
		 if(y > 0) y--;
	  }
	  else if(e.which === 39) { // right
	  	 move();
	  }
	});

	
});
