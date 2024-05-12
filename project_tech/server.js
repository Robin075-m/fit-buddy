// Load HTTP module
const { application } = require("express");
const express = require("express");

express()
.get('/', onhome)
.listen(8000)

function onhome(req, res) {
    res.send('<h1>Hello Client</h1>\n')
}

// de / is een path en na de app kan je een method toepassen
app.get('/', callback)

// Voor formulieren
app.put('/', callback)

// iets van de server verwijderen
app.delete('/', callback)








// const app = express();
// const hostname = "127.0.0.1";
// const port = 8000;








// // Create HTTP server
// const server = http.createServer(function (req, res) {
//   // Set the response HTTP header with HTTP status and Content type
//   res.writeHead(200, { "Content-Type": "text/plain" });

//   // Send the response body "Hello World"
//   res.end("Hello World\n");
// });

// // Prints a log once the server starts listening
// server.listen(port, hostname, function () {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
