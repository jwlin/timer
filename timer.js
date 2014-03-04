/*!
 * Timer v1.0
 * Copyright 2013-2014, Jun-Wei Lin
 * Licensed under MIT  
 */
 
var time = new Array(0,0,0); // hh,mm,ss	
var timerID;
var t = getParameterByName("t");
if (t)
{
	for (var i=0;i<time.length;i++)
	{
		time[i] = parseInt(t.substr(i*2, 2));
	}
}

if (window.localStorage.prevDate)
{
	document.getElementById("prev").innerHTML = "Last Record: " 
		+ checkTime(window.localStorage.prevH) + ":"
		+ checkTime(window.localStorage.prevM) + ":"
		+ checkTime(window.localStorage.prevS) + " "
		+ "(" + window.localStorage.prevDate + ") " 
		+ "<input type='button' id='btnLoad' onclick='loadTime()' value='Load'>";
}

function triggerTimer()
{
	timerID = setInterval(function(){myTimer()},1000);
	
	document.getElementById("btnResume").disabled=true;
	document.getElementById("btnPause").disabled=false;
	document.getElementById("btnReset").disabled=true;
}
	
function pauseTimer()
{
	window.clearInterval(timerID);
	
	document.getElementById("btnResume").disabled=false;
	document.getElementById("btnPause").disabled=true;
	document.getElementById("btnReset").disabled=false;
}

function resetTimer()
{
	//document.getElementById("btnResume").disabled=false;
	//document.getElementById("btnPause").disabled=true;
	
	for (var i=0;i<time.length;i++)
	{
		time[i] = 0;
	}
	
	outputTimer();
}

function myTimer()
{
	// second += 1 and then carry
	time[2] += 1;
	if (time[2] > 59)
	{
		time[1] += 1;
		time[2] = 0;
	}
	if (time[1] > 59)
	{
		time[0] += 1;
		time[1] = 0;
	}
	if (time[0]>99)
	{
		time[0] = 0;
	}

	outputTimer();
}

function outputTimer()
{
	document.getElementById("demo").innerHTML = checkTime(time[0]) + ":" + checkTime(time[1]) + ":" + checkTime(time[2]);
	document.title = checkTime(time[0]) + ":" + checkTime(time[1]) + ":" + checkTime(time[2]);
}

function checkTime(t)
{
	if (t<10) t = "0" + t;
	return t
}

function getParameterByName(name) // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function saveTime()
{
	var d = new Date();
	window.localStorage.prevDate = d.toDateString().slice(4); // "Sat Aug 17 2013" --> "Aug 17 2013"
	window.localStorage.prevH = time[0];
	window.localStorage.prevM = time[1];
	window.localStorage.prevS = time[2];
	//localStorage.clear();
}

function loadTime()
{
	time[0] = parseInt(window.localStorage.prevH);
	time[1] = parseInt(window.localStorage.prevM);
	time[2] = parseInt(window.localStorage.prevS);
	
	outputTimer();
}

function onKeyPress(e)
{
	if (e.keyCode == 32) { // space
		if (document.getElementById("btnPause").disabled) {
			document.getElementById('btnResume').click();
		}
		else {
			document.getElementById('btnPause').click();
		}
	}
	else if (e.keyCode == 82) { // R or r
		if (!document.getElementById("btnReset").disabled) {
			document.getElementById('btnReset').click();
		}
	}
	else if (e.keyCode == 76) { // L or l
		document.getElementById('btnLoad').click();
	}
}