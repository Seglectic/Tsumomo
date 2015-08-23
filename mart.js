	/*
						MOMOMART MART!

		Contains methods for buying and selling items from
		a virtual store whose inventory changes every day.
		Has a limited inventory, starter items have a very
		high inventory amount.

	*/

var items = require("./items")

this.stock = function(){
	this.lowWeapon = new function() {
		var r = Math.floor(Math.random()*items.lowWeapons.length);
		this.weapon = new items.lowWeapons[r]
		this.count = 99
	}

	this.midWeapon = new function() {
		var r = Math.floor(Math.random()*items.midWeapons.length);
		this.weapon = new items.midWeapons[r]
		this.count = 99
	}

	this.hiWeapon = new function() {
		var r = Math.floor(Math.random()*items.hiWeapons.length);
		this.weapon = new items.hiWeapons[r]
		this.count = 99
	}


	this.lowArmor = new function() {
		var r = Math.floor(Math.random()*items.lowArmor.length);
		this.weapon = new items.lowArmor[r]
		this.count = 99
	}

	this.midArmor = new function() {
		var r = Math.floor(Math.random()*items.midArmor.length);
		this.weapon = new items.midArmor[r]
		this.count = 99
	}

	this.hiArmor = new function() {
		var r = Math.floor(Math.random()*items.hiArmor.length);
		this.weapon = new items.hiArmor[r]
		this.count = 99
	}
};
this.inventory = new this.stock();


	//generate a mart
this.mart = function(){
	this.inventory = new this.stock();
}


this.greet = function(self,nick,target,text){ 
	var greeting = self.cat("Welcome to MomoMart! ",this.inventory)
	console.log(this.inventory);
	self.say(target,greeting)
}