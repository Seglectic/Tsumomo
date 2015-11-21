	/*
						TSUMOMO INVENTORY SYSTEM

		Contains methods for checking inventory as well as
		using items. 

		This system needs to include a method for !use [item] 
		so that items can be dynamically used from player 
		inventory rather than hardcoding each into the main
		chat case handler.

	*/




//Checks your own inventory
this.inventory = function(self,nick,target,text){
	txt = text.split(" ");
	if (txt.length>1){nick = txt[1];}
	if (!self.Players[nick]){ self.say(target,"Couldn't find "+nick); return;}

	inv = self.Players[nick].inventory
	if (inv.length == 0){self.say(target,nick+" doesn't own any items! >_<"); return; }
	
	var items = " ";
	for (var i = 0; i < inv.length; i++) {
		items+= inv[i].name+" | ";
	};
	var display = self.cat("%s posseses:%s",nick,items);
	self.say(target,display);
}


//Uses a potion to heal yourself
this.potion = function(self,nick,target,text){
	p = self.Players[nick];
	var potionGet = false;
	for (var i = 0 ; i < p.inventory.length; i++) {
		if (p.inventory[i].name == "Potion"){
			potionGet = i;
			break;
		}
	};

	if (potionGet===false){
		self.say(target, nick+", you don't have any potions!");
		return;
	}

	p.inventory.splice(potionGet,1);
	p.hp += 100;
	if (p.hp>p.hpMax){p.hp=p.hpMax;}
	self.say(target,nick+" drank a potion and restored 100 health!");
	
}

//Use a revival bead on a player to bring them back to life.
this.rez = function(self,nick,target,text){
	p = self.Players[nick];
	if (p.hp<=0){self.say(target,"The dead can't use revival beads!");return;}	// Deny if user is dead
	if (text.split(" ").length>1){targ=text.split(" ")[1]} 						// 'targ' = revival recipient nick
		else{self.pm(nick,"Usage: '!rez [nick]'");return;}
	if (!self.Players[targ]) {self.say(target,"Couldn't find "+targ); return;}; //Check if targ is valid
	if (self.Players[targ].hp>0){self.say(target,targ+" doesn't need resurrection!"); return;}
	t = self.Players[targ];
	var beadGet = false;
	for (var i = 0 ; i < p.inventory.length; i++) {
		if (p.inventory[i].name == "Revival Bead"){
			beadGet = i;
			break;
		}
	};
	if (beadGet===false){
		self.say(target, nick+", you don't have any revival beads! >_<");
		return;
	}
	p.inventory.splice(beadGet,1)
	t.hp = t.hpMax;
	self.say(target,p.nick+" brought "+t.nick+" back from the dead! ^-^")
};

