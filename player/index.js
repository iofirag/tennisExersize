//player modul
var allLogs;
var events = require('events');
var util = require('util');
util.inherits(Player, events.EventEmitter);

// Class
function Player(name){
	this.name = name;
	this.points = 0;
	this.games = 1;
	this.logs = 'All Logs:\n';
	this.startHasPrint = false;
	this.win = false;
	events.EventEmitter.call(this);
}
// Class functions
Player.prototype.increment = function(){
	// (ex: 0,15,30,40,win_one_game)
	if (this.startHasPrint==false && this.points==0 && this.games==1){
		this.logs+= '---  Start Game'+this.games+'  ---\n';
		this.startHasPrint=true;
	}	

	switch (this.points){
		case 0: this.points = 15;
			break;
		case 15: this.points = 30;
			break;
		case 30: this.points = 40;
			break;
		case 40:
			this.logs+= '---  End Game '+this.games+' ---\n';
			if (this.games == 11 && this.points==40){
				//player win 11 games
				this.win = true;
				this.logs+= '\n'+this.name+ ' is the WINNER!!\n';
			}else{
				this.points = 0;
				this.games++;
				this.emit('gamesChange');
				this.logs+= '---  Start Game'+this.games+'  ---\n';
			}
			break;
	}
	if (this.win == false && this.points!=0 && this.games!=12){
		this.emit('pointsChange');
	}  
}
Player.prototype.decrement = function(){
	if (this.points >0){
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
}
Player.prototype.getLogs = function(){
	this.logs+= 'execute print logs\n';
	return this.logs;
}

// Other functions
function pointsChange (){
	this.logs+= '\t|points change to: '+this.points+'\n';
}
function gamesChange (){
	this.logs+= '\t*games change to: '+this.games+'\n\n';
}

// Export functions
exports.getLogs = function (){
	return allLogs;
};

/* Create instance and attach callbacks to events ***********/
var pla = new Player('Yonit');
pla.on('pointsChange', pointsChange);
pla.on('gamesChange', gamesChange);
// Test the code
for (var i=0; i<11; i++){		//win in 11 games
	pla.increment();			//win point
	pla.decrement();			//lose point
	for (var j=0; j<4; j++){	//win in 4 points
		pla.increment();
	}
}
allLogs = pla.getLogs();
/***********************************************************/