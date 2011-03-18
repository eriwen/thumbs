var http = require('http');
  
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/json" })
  res.end("{'options':[1,2,3,5,8,13,21,34,55,100], 'names': ['Eric Wendelin']}");
});
  
server.listen(process.env.PORT || 8001);
