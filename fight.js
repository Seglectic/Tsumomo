	/*
						TSUMOMO FIGHT MECHANIC

		Contains methods for fighting NPCs or other	IRC players. 
		These functions require a reference to the [player], the 
		proper IRC chat room [target] and the local [self] reference.
	*/

var fiends = require("./fiends")

this.levelUp = function(self,target,player){
	player.level+=1;
	var STRUP = self.RNG(1,3);
	var DEFUP = self.RNG(1,3);
	var HPUP = player.level*self.RNG(1,5);

	player.str += self.RNG(3,6);
	player.def += self.RNG(2,4);
	player.hpMax += HPUP;
	player.hp = player.hpMax;
	self.say(target,player.nick+" leveled up!! ^-^ ");
	self.pm(player.nick,self.cat("Level: %s | HP %s [+%s]| STR %s [+%s] | DEF %s [+%s]",player.level,player.hpMax,HPUP,player.str,STRUP,player.def,DEFUP));
}


//Fights a NPC fiend. 
this.npc = function(self,target,player){
	if(new Date().getTime() < player.fightTime){
		var remaining = player.fightTime- new Date().getTime();
		remaining = Math.ceil(remaining/60000)
		self.pm(player.nick,"You'll be tired for another "+remaining+" minutes!");
		return false;
	}else{
		var min = 30; //30 minutes till next fight
		var fTime = new Date().getTime() + (min*60000) ;
		player.fightTime = fTime;
	}

	if (!player.fiend || player.fiend.hp<=0){
		player.fiend = new fiends.slime();
		self.pm(player.nick,player.fiend.encounter);
	}

	fiend = player.fiend;

	//Damage to enemy
	var strikeChance = Math.random()+0.3;			 			//Player's hit percentage			
	var pwr = Math.ceil(player.str*strikeChance)+player.weapon.dmg;	//Strike power scaling
	var pDmg = pwr-(fiend.def);

	//Damage to player
	var damageChance = Math.random()+0.2;			 			//Hit percentage			
	var fPwr = Math.ceil(fiend.str*damageChance)+fiend.level;	//Strike power scaling
	var fDmg = fPwr-(player.def+player.armor.def);

	//Display actions performed
	var pDmgMsg =self.cat("%s deals %s DMG to the %s! ",player.nick,pDmg,fiend.detailName);
	var fDmgMsg = self.cat("The %s hits you for %s DMG!!",fiend.name,fDmg);
	if (pDmg<=0){
		pDmg=0;
		pDmgMsg = cat("%s missed the %s! ",player.name,fiend.detailName);
	}
	if (fDmg<=0){
		fDmg=0;
		fDmgMsg = cat("The %s missed! ",fiend.name);
	}

	fiend.hp -= pDmg;
	//Player wins
	if (fiend.hp<=0){
		fiend.hp=0;
		pDmgMsg = self.cat("%s defeated a %s!! ",player.nick,fiend.detailName);
		fDmgMsg = self.cat("You got %s XP!",fiend.xp);
		fDmg = 0;
		player.xp += fiend.xp;
	}

	player.hp -= fDmg;
	//Player loses
	if (player.hp <= 0){
		player.hp=0;
		pDmgMsg = self.cat("%s was killed by a %s for %s DMG!! ",player.nick,fiend.detailName,fDmg);
		fDmgMsg	= self.cat("You managed to deal %s DMG before you died. ",pDmg);
	}

	if (player.hp <= 0){player.hp=0;}
	if (fiend.hp <= 0){fiend.hp=0;}

	var display= pDmgMsg+fDmgMsg;
	self.say(target,display);
	
	//Check for levelup
	if (player.xp>1.8*(player.level*player.level)){
		this.levelUp(self,target,player);
	}


}