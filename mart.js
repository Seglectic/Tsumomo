	/*
						MOMOMART MART!

		Contains methods for buying and selling items from
		a virtual store whose inventory changes every day.
		Has a limited inventory, starter items have a very
		high inventory amount.

	*/

var items = require("./items")

this.inventory = {}; //Main momoMart inventory


//Stocks shelves
this.stock = function(){
	this.lowWeapon = new function() {
		var r = Math.floor(Math.random()*items.lowWeapons.length);
		this.weapon = new items.lowWeapons[r]
		this.count = 20
	}

	this.midWeapon = new function() {
		var r = Math.floor(Math.random()*items.midWeapons.length);
		this.weapon = new items.midWeapons[r]
		this.count = 5
	}

	this.hiWeapon = new function() {
		var r = Math.floor(Math.random()*items.hiWeapons.length);
		this.weapon = new items.hiWeapons[r]
		this.count = 1
	}

	this.lowArmor = new function() {
		var r = Math.floor(Math.random()*items.lowArmor.length);
		this.armor = new items.lowArmor[r]
		this.count = 20
	}

	this.midArmor = new function() {
		var r = Math.floor(Math.random()*items.midArmor.length);
		this.armor = new items.midArmor[r]
		this.count = 8
	}

	this.hiArmor = new function() {
		var r = Math.floor(Math.random()*items.hiArmor.length);
		this.armor = new items.hiArmor[r]
		this.count = 1
	}

	this.consumables = [];

	//Randomize consumable items for sale, required when/if there are more consumables
	/*for (var i = 0; i < 3; i++) {
		var r = Math.floor(Math.random()*items.consumable.length);
		var randItem = new items.consumable[r]
		this.consumables.push(randItem)
	}*/

	this.consumables.push(new items.consumable[0]() );
	this.consumables.push(new items.consumable[1]() );

};

this.inventory = new this.stock();


//Generates a string of item name, price, amount
this.itemDisplay = function(){
	var display = "|%s  ¥%s x%s |"
}

this.greet = function(self,nick,target,text){
	var i = this.inventory;
	var itemCount = i.lowWeapon.count + i.midWeapon.count + i.hiWeapon.count + i.lowArmor.count + i.midArmor.count + i.hiArmor.count;
	var greeting = self.cat("Welcome to MomoMart! Currently %s items in stock!",itemCount);
	self.say(target,greeting)
	self.pm(nick,"Try: !shop [weapons] [armor] [items]");
}


this.shop = function(self,nick,target,text){
	var param = text.split(" ");
	if (param.length <= 1){
		this.greet(self,nick,target,text)
		return false;}
	var type = param[1].toLowerCase()
	var i = this.inventory;

	if (type=="weapon" || type=="weapons"){
		var lowText = self.cat("| #1 %s ¥%s x%s |",i.lowWeapon.weapon.name,i.lowWeapon.weapon.value,i.lowWeapon.count);
		var midText = self.cat(" #2 %s ¥%s x%s ",i.midWeapon.weapon.name,i.midWeapon.weapon.value,i.midWeapon.count);
		var hiText =  self.cat("| #3 %s ¥%s x%s |",i.hiWeapon.weapon.name,i.hiWeapon.weapon.value,i.hiWeapon.count);
		self.say(target,lowText+midText+hiText);
		return true;
	};

	if (type=="armor"){
		var lowText = self.cat("| #1 %s ¥%s x%s |",i.lowArmor.armor.name,i.lowArmor.armor.value,i.lowArmor.count);
		var midText = self.cat(" #2 %s ¥%s x%s ",i.midArmor.armor.name,i.midArmor.armor.value,i.midArmor.count);
		var hiText =  self.cat("| #3 %s ¥%s x%s |",i.hiArmor.armor.name,i.hiArmor.armor.value,i.hiArmor.count);
		self.say(target,lowText+midText+hiText);
		return true;
	};

	if (type=="items"){
		var display = "| "
		for (var x = 0 ; x < i.consumables.length; x++) {
			c = i.consumables[x];
			var detail = self.cat("#%s %s ¥%s |",x+1,c.name,c.value);
			display += detail;
		};
		self.say(target,display);
	}
}

//Purchase items from teh mart
this.buy = function(self,nick,target,text){
	var p = self.Players[nick];
	var error = function(){
		self.pm(nick,"Usage: !buy [weapon/armor] [#]    ex: '!buy weapon 2'"); 
	};
	var param = text.split(" ");

	//Check for proper parameter length
	if (param.length < 3){ error(); return false; }
	//Check if param 2 is valid
	var type = (param[1]); 
	if ( ['weapons','weapon','armor','armors','item','items'].indexOf(type) == -1 ){ error(); return false;}
	//Make sure it's a number
	var num = (param[2]);
	if (isNaN(num)){ error(); return false;	}
	var i = this.inventory;
	
	if (type=="weapon" || type=="weapons"){
		if (num == 1) {
			if (i.lowWeapon.count==0){self.pm(nick,"We're out of that one! ;-;"); return false;}
			if (i.lowWeapon.weapon.value >= p.yen){self.say(target,p.nick+", You don't have enough yen for that thing! :("); return false;}
			i.lowWeapon.count--;
			p.yen -= i.lowWeapon.weapon.value;
			p.weapon = i.lowWeapon.weapon;
			self.say(target,self.cat("%s bought %s!",p.nick,p.weapon.detail));
			return true;
		}
		if (num == 2) {
			if (i.midWeapon.count==0){self.pm(nick,"We're out of that one! ;-;"); return false;}
			if (i.midWeapon.weapon.value >= p.yen){self.say(target,p.nick+", You don't have enough yen for that weapon! :("); return false;}
			i.midWeapon.count--;
			p.yen -= i.midWeapon.weapon.value;
			p.weapon = i.midWeapon.weapon;
			self.say(target,self.cat("%s bought %s!",p.nick,p.weapon.detail));
			return true;
		}
		if (num == 3) {
			if (i.hiWeapon.count==0){self.pm(nick,"We're out of that one! ;-;"); return false;}
			if (i.hiWeapon.weapon.value >= p.yen){self.say(target,"^_^; "+p.nick+", that weapon is worth more than you are.."); return false;}
			i.hiWeapon.count--;
			p.yen -= i.hiWeapon.weapon.value;
			p.weapon = i.hiWeapon.weapon;
			self.say(target,self.cat("%s bought %s!",p.nick,p.weapon.detail));
			return true;
		}	
	}

	if (type=="armor" || type=="armors"){
		if (num == 1) {
			if (i.lowArmor.count==0){self.pm(nick,"We're out of that one! ;-;"); return false;}
			if (i.lowArmor.armor.value >= p.yen){self.say(target,p.nick+", You don't have enough yen for that! :("); return false;}
			i.lowArmor.count--;
			p.yen -= i.lowArmor.armor.value;
			p.armor = i.lowArmor.armor;
			self.say(target,self.cat("%s bought %s!",p.nick,p.armor.detail));
			return true;
		}
		if (num == 2) {
			if (i.midArmor.count==0){self.pm(nick,"We're out of that one! ;-;"); return false;}
			if (i.midArmor.armor.value >= p.yen){self.say(target,p.nick+", You don't have enough yen for that armor! :("); return false;}
			i.midArmor.count--;
			p.yen -= i.midArmor.armor.value;
			p.armor = i.midArmor.armor;
			self.say(target,self.cat("%s bought %s!",p.nick,p.armor.detail));
			return true;
		}
		if (num == 3) {
			if (i.hiArmor.count==0){self.pm(nick,"We're out of that one! ;-;"); return false;}
			if (i.hiArmor.armor.value >= p.yen){self.say(target,"^_^; "+p.nick+", that armor is worth more than you are.."); return false;}
			i.hiArmor.count--;
			p.yen -= i.hiArmor.armor.value;
			p.armor = i.hiArmor.armor;
			self.say(target,self.cat("%s bought %s!",p.nick,p.armor.detail));
			return true;
		}	
	}

	if (type=="item" || type =="items"){
		if (num<=items.consumable.length & num>0){
			var item = new items.consumable[num-1]();
			
			if (p.yen<item.value){self.pm(nick,"You can't afford that!!");return;}
			
			p.yen -= item.value;

			if (p.inventory.length<10){p.inventory.push(item)}
				else{self.pm(nick,nick+", your inventory is full!");}

			display = self.cat("%s bought a %s! ^-^",nick,item.name)
			self.say(target,display);
		}

	}
}