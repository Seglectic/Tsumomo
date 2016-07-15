/*
						❤ TSUMOMO IRC BOT ❤

		Tsumomo is an IRC chat bot designed as an operator  for
		a  text-based  MMORPG  with an IRC interface written in
		JavaScript for Node.js. 

		Tsumomo uses the node-irc  library  for  connectivity  and 
		communication. IRC API available at: https://goo.gl/w9rsns
		
		-Segger 2015
*/


/*
	TODO
!fortune for P3 clone of yen losee etc

Give players a flag that tells whether or not they're out of commision:
	aka, when dead, resting, fishing, whatever

Give new player prototype ability to feed defaults so players can be
instantiated with new stats without clearing save data.
*/

var irc = require('irc');
var fs = require('fs');
var fight = require('./fight');
var mart = require('./mart');
var items = require('./items');
var mart = require('./mart');
var inv = require('./inventory');
var yen = require('./yen');
var fiend = require('./fiends');
var timeUpdate = require('./timeUpdate');
var fortune = require('./fortune');

	//MAIN TSUMOMO OBJECT
Tsumomo = function(server){
	if (!server){this.server="irc.rizon.net";} else{this.server= server;}
	
	var self = this; 				//Gives local context reference to events
	this.version = "1.0.1";
	this.name= "Tsumomo";			//Nick
	this.options = { 				//IRC configuration object
		userName: "Tsumomo",
		realName: "Tsumomo",
		// channels:["#momoLab","#Fluffington"],
		channels:["#momoLab"],
		autoRejoin: true,
		floodProtection:true,
	};
	this.Players = {};
	this.momoMart = {};
	this.Queue = {};
	this.path = "./SAVEDATA ["+self.server+"].json"
	console.log("\n        \x1b[36m [Booting %s FW.%s on %s]  \x1b[0m \n",this.name,this.version,this.server);
	this.tsumomo = new irc.Client(this.server,this.name,this.options);
	



	/*
				INTERNAL UTILITY FUNCTIONS
		Provides various internally used functions
	*/

	//Saves players, mart data
	this.save = function(verbose){
		var data = {};
		data.Players = self.Players;
		data.momoMart = self.momoMart;
		var dataString = JSON.stringify(data);
		fs.writeFile(self.path,dataString);
		if (verbose){
			console.log("			[Data Saved]");
		}
	}

	//Loads save data from JSON
	this.load = function(){
		fs.readFile(self.path,"utf8",
			function(err,dataString){
				if (err){
					console.log("               ! ! ! ERROR LOADING FILE ! ! !\n");
					self.Players = false;		//Sets players to false to indicate error.
					return;
				}else{
					console.log("                [Data Loaded Successfully]\n");
					data = JSON.parse(dataString);
					self.Players = data.Players;
					self.momoMart = data.momoMart;

					//Iterates through players on startup
					console.log("Reinitalizing players..")
					var dead = ""
					for (var nick in self.Players) {
						p = self.Players[nick];
						if (p.hp == 0){dead+=p.nick+'  '};
						self.Players[nick] = new self.player(nick,p);
					};
					console.log('[OK]')

					console.log("Dead players: \n"+dead+'\n')

				}
			}
		);

	}
	this.load();

	//Random number generator: min,max,[rounding(bool)]
	this.RNG = function(min,max,INT){
		INT = typeof INT !== "undefined" ? INT: 
		max -= min-1
		var RNG = (Math.random()*max)+min;
		RNG = Math.floor(RNG)
		return RNG;
	};

	//Concatenate args to string 'cat("woo: %s",value)'
	this.cat = function(str) {
	    var args =[].slice.call(arguments, 1),
	        i =0;
	    	return str.replace(/%s/g, function() {return args[i++];}
	    );
	};

	//New player prototype, accepts player object for defaults...]
	this.player = function(nick,player){
		this.nick = player.nick|| nick;
		this.yen = player.yen|| 0;
		this.yenTime = player.yenTime|| new Date(2015,1,1,1,1,1,1).getTime();
		this.fightTime = player.fightTime|| new Date(2015,1,1,1,1,1,1).getTime();
		this.level = player.level|| 3;
		this.xp = player.xp|| 0;
		this.str = player.str|| 8;
		this.def = player.def|| 3;
		this.hp = player.hp|| 15;
		this.hpMax = player.hpMax|| this.hp;
		this.armor = player.armor|| new items.starterArmor() ;
		this.weapon = player.weapon|| new items.starterWeapon() ;
		this.inventory = player.inventory|| [];
		this.fiend = player.fiend|| undefined;
		this.luck = player.luck || 1;
	}
	



	/*			
						IRC FUNCTIONALITY
				Defines Tsumomo's IRC capabilities
	*/        
	
	//Send message to channel or nick.
	this.say = function(target,text){
		var t = new Date();
		var tS = t.getMonth()+"/"+t.getDate()+"/"+t.getFullYear()+" "+t.getHours()+":"+t.getMinutes()
		self.tsumomo.say(target,text)
		console.log(tS+" Tsumomo: "+text);
	};

	//Send a message directly to player, not actually a 
	this.pm = function(nick,text){
		self.tsumomo.notice(nick,text);
		console.log("-PM ",nick.substring(0,10)+"- "+text);
	};

	//Request to check user status; Queue nick and command.
	this.requestStatus = function(nick,target,text){
		self.tsumomo.say("NickServ","STATUS "+nick)
		self.Queue[nick] = [target,text];
	};

	//Processes status replies and creates new players.
	this.processStatus = function(nick,text){
		var status = text.split(" ")
		var nick = status[1]
		var status = status[2]
		if (status == "3"){
			self.Players[nick] = new self.player(nick);
			console.log("Added user: ",nick);
			self.msgProcess(nick,self.Queue[nick][0],self.Queue[nick][1]) //Runs queued command if OK

		}else{
			//console.log(nick+" not identified.");
			self.pm(nick,"I only accept commands from registered nicks.  :P")
		}
		delete self.Queue[nick];
	};




	/*
						CHAT COMMANDS
		Defines actions which trigger on player input
	*/


	//Display user information
	this.stats = function(nick,target,text){
		text = text.split(" ");
		if (text.length>1){nick = text[1];}
		if (!self.Players[nick]){
			self.say(target,"Couldn't find "+nick);
			return;
		}
		var p = self.Players[nick];
		var display = self.cat("%s | ¥%s | LVL %s [%s XP] | %s/%sHP %s STR %s DEF | Wearing %s [+%s] | Wielding %s [+%s]|",nick,p.yen,p.level,p.xp,p.hp,p.hpMax,p.str,p.def,p.armor.detail,p.armor.def,p.weapon.detail,p.weapon.dmg);
		self.say(target,display);
	};

	//Fight fiends
	this.fight = function(nick,target,text){
		var text = text.split(" ");
		if (text[1] in self.Players){
			self.pm(nick,"Fighting other players has not been implemented.")
			return false;
		};
		fight.npc(self,target,Players[nick]);
	};

	/*Resets a player's stats, commented due to potential vulnerability
	this.reset = function(nick,target,text){
		text = text.split(" ");
		if (text.length>1 & (nick =="Segger"|| nick=="mobiSegger" || nick=="Seggr")){nick=text[1];}
		if (!self.Players[nick]){self.say(target,"Couldn't find "+nick); return;}
		self.Players[nick] = new this.player(nick);
		self.say(target,nick+"'s stats were reset!!")
	};*/




	//Wildcard function for debugging.
	this.test = function(nick,target,text){
		console.log("\n Running debug callback.\n");
	};




	/*
					IRC CALLBACKS
			Defines callbacks for IRC events.
	*/


	//Runs upon connection to server.
	this.connected = function(message){
		console.log("Connection to "+self.server+" successful. Got message:")
		console.log(message.args[1])
		self.tsumomo.say("nickserv","identify bacawn")
	}
	this.tsumomo.addListener("registered",this.connected);


	//Runs upon user connection to channel.
	this.join = function(channel,nick,message){
		//console.log("\nSuccessfully joined "+channel+"\n");
		//self.say(channel,self.name+" "+self.version);
	}
	this.tsumomo.addListener("join",this.join)


	//Runs when Tsumomo receives a notice.
	this.noticed = function(nick,to,text,message){
		var notice = text.split(" ")
		if (notice[0] == "STATUS"){
			self.processStatus(nick,text)
		}
	}
	this.tsumomo.addListener("notice",this.noticed);

	
	//Handles incoming messages.
	this.commands = ["!buy","!yen","!stats","!fight","!mart","!weapons","!armor","!shop","!reset","!rez","!test","!save","!inventory","!potion","!inv","!revival","!fortune"];
	this.msgProcess = function(nick, target, text, message){
		var command = text.split(" ")[0].toLowerCase();
		
		if (self.commands.indexOf(command)==-1){ //Skip if command unknown
			return false;
		}

		if(!self.Players){ //Handle messages upon savedata load error
			if (command == "!save"){
				self.Players = {};
				self.save(true);
			}
			return false;
		}

		if (!(nick in self.Players)){ //Check if player is known, else ID them
			self.requestStatus(nick,target,text);
			return false;
		}		

		console.log(nick.substring(0,10)+"| "+text) //Display chat messages

		//Main command case handler.
		switch(command){
			case "!yen": yen.yen(self,nick,target,text); break;
			case "!test": self.test(nick,target,text); break;
			case "!save": self.save(true); break;
			case "!stats": self.stats(nick,target,text); break;
			case "!fight": self.fight(nick,target,text); break;
			case "!reset": self.reset(nick,target,text); break;
			case "!rez": inv.rez(self,nick,target,text); break;
			case "!revival": inv.rez(self,nick,target,text); break;
			case "!mart": mart.greet(self,nick,target,text); break;
			case "!shop": mart.shop(self,nick,target,text); break;
			case "!buy": mart.buy(self,nick,target,text); break;
			case "!inventory": inv.inventory(self,nick,target,text); break;
			case "!inv": inv.inventory(self,nick,target,text); break;
			case "!potion": inv.potion(self,nick,target,text); break;
		}

		self.save();
		return true;
	}
	this.tsumomo.addListener("message",this.msgProcess);
	
	
	this.handleError = function(message){
		 console.log('Error: ', message)
	}
	this.tsumomo.addListener("error",this.handleError);

}

process.stdout.write('\033c'); //Clear screen

Tsumomo = new Tsumomo()
