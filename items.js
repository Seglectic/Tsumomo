	/*
						MOMOMART ITEMS

		Defines item objects that can either be set
		to the inventory slot whose callbacks can be run(?)
		or can be equipped to a weapon or armor slot.
		
	*/



	/*
				DEFAULT WEAPON/ARMOR
		Weapon and Armor to be equipped upon spawn
	*/

this.starterWeapon = function(){
	var names = ['toothpick','coin','battery','pencil','credit card','spinach','fists'];
	var details = ['a wooden toothpick','a ¥5 coin','a generic AA battery','a dull #2 pencil','an expired credit card','a single leaf of spinach','your tiny bare hands'];
	var chance = Math.floor( Math.random() * (names.length) ) //Random starter choice
	this.dmg = 1;
	this.value = 0;
	this.name = names[chance];
	this.detail = details[chance];
}

this.starterArmor = function(){
	var names = ['fundoshi','loincloth','underwear','pantsu','tablecloth','barrel'];
	var details = ['a sweaty fundoshi','a damp loincloth','a pair of rubber underwear','some kawaii pantsu','a dirty tablecloth','an oak barrel'];
	var chance = Math.floor( Math.random() * (names.length) ) //Random starter choice
	this.def = 1;
	this.value = 0;
	this.name = names[chance];
	this.detail = details[chance];

}




	/*
					WEAPONS
		Adds power to attacks in the field
	*/

var Weapons = {

	rustySpoon:{
		dmg:2,
		value:3000,
		name: "Rusty Spoon",
		detail:"an old rusty spoon",
	},

	spoon:{
		dmg:3,
		value:4300,
		name: "Spoon",
		detail:"a spoon",
	},

	shinySpoon:{
		dmg:4,
		value:5000,
		name: "Shiny Spoon",
		detail:"a spoon of pure platinum",
	},

	brokenSword:{
		dmg:5,
		value:10000,
		name: "Broken Sword",
		detail:"a sword with its point broken off",
	},

	cutlass:{
		dmg:8,
		value:25000,
		name: "Cutlass",
		detail:"a shiny new cutlass",
	},

}


	/*
					ARMOR
		Adds defense from attacks in the field
	*/

var Armors = {

	plainClothes:{
		def:1,
		value:8000,
		name: "Plain Clothes",
		detail:"a pair of jeans and a T-shirt",
	},

}


/*'fists',1,0],['Rusty Spoon',2,3000],['Shiny Spoon',4,5000],['Rusty Dagger',5,10000],['Sword',7,20000]]
Armors = [['nothing',0,0],['Plain Clothes',3,8000],['Chainmail Garb',30,99999],['Torn Shirt',1,2000]]*/


