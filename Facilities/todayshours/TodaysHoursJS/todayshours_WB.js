// Today's Library Hours v.1 (March 30, 2011)
// Grand Valley State University Library Labs, 2011
// by Matthew Reidsma, reidsmam@gvsu.edu
//
// Released under the GPL: http://www.gnu.org/licenses/gpl.html
//

// Configuration:
// ------------------------------------------------------------------

// Enter the time your library opens, starting with Sunday. If your library is closed,
// enter "X" for the time. In the following example, the library is closed on Sunday
// and opens at 9am Monday through Friday. On Saturday, the library opens at 1:30pm.
// The script will print whatever format you decide to use in these variables. Make
// sure to leave the quotes!
//
// EXAMPLE:
//
// var open=["X","9:00am","9:00am","9:00am","9:00am","9:00am","1:30pm"];

	var open=["1:00 PM","9:30 AM","9:30 AM","9:30 AM","9:30 AM","9:30 AM","9:30 AM"]; // Edit this line

// Enter the time your library closes, starting with Sunday. If your library is
// closed, enter "X" for the time.

	var close=["5:00 PM","8:00 PM","8:00 PM","8:00 PM","8:00 PM","5:00 PM","5:00 PM"]; // Edit this line

// Do not edit below this line
// -------------------------------------------------------------------

	var currentTime = new Date()
	var day = currentTime.getDay()
	var tomorrow = day + 1;

	var openTime = open[day];
	var closeTime = close[day];
	// createHours(openTime,closeTime);

	var openTomorrow = open[tomorrow];
	var closeTomorrow = close[tomorrow];
	createHours(openTime,closeTime, openTomorrow, closeTomorrow);

	function createHours(openTime, closeTime, openTomorrow, closeTomorrow)
	{ // Build the hours string
		if(openTime == "X") {
			var libhours = "Closed";
			document.write(libhours);
		} else {
			var libhours = "<h2 style='margin-bottom:0'>Open Today</h2> <strong>" + openTime + " &#8211; "
			+ closeTime + "</strong>" + "<p style='margin-bottom:0'>Open Tomorrow <br>" + openTomorrow + " &#8211; "
			+ closeTomorrow + "</p>";
			document.write(libhours);
		}
	}
