//player modul
var events = require('events');
var util = require('util');
util.inherits(Player, events.EventEmitter);

function Player(name){
	this.name = name;
	this.points = 0;
	this.games = 0;
	this.logs = 'All Logs:\n';
	events.EventEmitter.call(this);
}

Player.prototype.increment = function(){
	// (ex: 0,15,30,40,win_one_game)
	var changeTo = 0;
	switch (this.points){
		case 0: changeTo = 15;
			break;
		case 15: changeTo = 30;
			break;
		case 30: changeTo = 40;
			break;
		case 40: changeTo = 0;
				this.games++;
				if (this.games==11){
					console.log(this.name+ ' is the WINNER!!');
					this.emit('gamesChange');
				}
			break;
	}
	this.points = changeTo;
	this.emit('pointsChange');
	
}
Player.prototype.decrement = function(){
	// (ex: 0,15,30,40,win_one_game)
	var changeTo = 0;
	switch (this.points){
		case 15: changeTo = 0;
			break;
		case 30: changeTo = 15;
			break;
		case 40: changeTo = 30;
			break;
	}
	this.points = changeTo;
	this.emit('pointsChange');
}
Player.prototype.getLogs = function(){
	this.logs+= 'print logs\n';
	return this.logs;
}

// exports.getLogs = function (){
// 	return this.logs;
// };

// Create instance and attach callbacks to events --
var player1 = new Player('yonit');
player1.on('pointsChange', function(){
	console.log('points change to: '+this.points+'\n');
	this.logs+= 'points change to: '+this.points+'\n';
});
player1.on('gamesChange', function(){
	console.log('games change to: '+this.games+'\n');
	this.logs+= 'games change to: '+this.games+'\n';
});

// Test the code
for (var i=0; i<11; i++){		//win in 11 games
	player1.increment();		//win point
	player1.decrement();		//lose point
	for (var j=0; j<4; j++){	//win in 4 points
		player1.increment();
	}
}
res.write('player1:\n' + player.getLogs()+ '\n');
//console.log(player1.getLogs());