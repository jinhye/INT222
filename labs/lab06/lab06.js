 var httpRequest;

      function makeRequest() {
	var url = 'https://zenit.senecac.on.ca/~emile.ohan/int222/labs/lab06/courses.json';
	// make an HTTP request object

	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	  httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE
	  try {
	    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	  }
	  catch (e) {
	    try {
	      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    catch (e) {}
	  }
	}

	if (!httpRequest) {
	  alert('Giving up :( Cannot create an XMLHTTP instance');
	  return false;
	}

	// register a request listener
	httpRequest.onreadystatechange = showContents;
	// make the HTTP request
	httpRequest.open('GET', url, true);
	httpRequest.send();
      }

      // the function that handles the server response

      function showContents() {

       //  check for response state
       //  0      The request is not initialized
       //  1      The request has been set up
       //  2      The request has been sent
       //  3      The request is in process
       //  4      The request is complete

	if (httpRequest.readyState === 4) {
	  // check the respone code
	  if (httpRequest.status === 200) { // The request has succeeded
	    // Javascript function JSON.parse to parse JSON data

	    var jsArray = JSON.parse(httpRequest.responseText);

	    //**********************************
	    //       include your code here
	    //**********************************

      var cpaTable = "<table class='table-1'>";

      cpaTable += "<caption> School of ICT | Faculty of Applied Science and Engineering Technology </caption>";
      cpaTable += "<tr><th> Program Area </th><th> Semester </th><th colspan = '5'> Courses </th></tr>";

      for (var i = 0; i < jsArray.length; i++){
			  cpaTable+= "<tr><td>" + jsArray[i].name  + "</td>";
			  cpaTable+= "<td>" + jsArray[i].semester  + "</td>";
			  for (var j = 0; j < jsArray[i].courses.length; j++){
			    cpaTable += "<td>" + jsArray[i].courses[j]  + "</td>";
			}
			  cpaTable += "</tr>";
			}
      cpaTable += "</table>";
			
      cpaTable += "<hr/><a href='lab06.html'>Back To Lab06</a><hr/>";

      document.getElementById("data").innerHTML = cpaTable;
	  } else { alert('Error.');}
	}
    }
