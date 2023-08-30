const http = require('http');
//test
http.createServer(function (req,res) {
	res.write("On the way to being a fullstack engineer!");
	res.end();
}).listen(3000);

