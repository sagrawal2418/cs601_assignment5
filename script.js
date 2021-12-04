function getData() {
  fetch("./degrees.json")
    .then(retrieveData)
    .then(displayData)

    .catch((err) => {
      showError("Fetch failed");
      console.log(err);
    });
}

function retrieveData(response) {
  if (!response.ok) {
    throw new Error("Something went wrong::Error Code::" + response.status);
  }
  return response.json();
}

function displayData(data) {
  // EXTRACT VALUE FOR HTML HEADER.
  // ('School', 'Program Major', 'Type' and 'Year')
  var col = [];
  for (var i = 0; i < data.degree.length; i++) {
    for (var key in data.degree[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1); // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < data.degree.length; i++) {
    tr = table.insertRow(-1);
    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data.degree[i][col[j]];
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

function showError(message) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  x.innerText = message;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
