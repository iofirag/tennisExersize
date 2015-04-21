var http = require('http');
var player = require('./player');

var server = http.createServer( function (req, res){

	res.writeHead(200,{'student' : 'ofir aghai'});
	// res.write('player1:\n' + player.getLogs()+ '\n');
	res.end('Success!');

}).listen(3000,'localhost');


console.log('server running...');