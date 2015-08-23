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
	var details = ['a sweaty fundoshi','a damp loincloth','a pair of rubber underwear','some kawaii pantsu','a thin, dirty, tablecloth','an oak barrel'];
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

this.lowWeapons = [
	this.rustySpoon = function(){
		this.dmg = 2
		this.value = 30000
		this.name = "Rusty Spoon"
		this.detail ="an old rusty spoon"
	},

	this.spoon = function(){
		this.dmg = 3
		this.value = 43000
		this.name = "Spoon"
		this.detail ="a spoon"
	}
]

this.midWeapons = [

	this.shinySpoon = function(){
		this.dmg=4
		this.value=50000
		this.name= "Shiny Spoon"
		this.detail="a spoon of pure platinum"
	},

	this.brokenSword = function(){
		this.dmg=5
		this.value=100000
		this.name= "Broken Sword"
		this.detail="a sword with its point broken off"
	}
]

this.hiWeapons = [

	this.cutlass = function(){
		this.dmg=8
		this.value=250000
		this.name= "Cutlass"
		this.detail="a sharp cutlass"
	}

]


	/*
					ARMOR
		Adds defense from attacks in the field
	*/


this.lowArmor = [

	this.plainClothes = function(){
		this.def=2
		this.value=80000
		this.name= "Plain Clothes"
		this.detail="a pair of jeans and a T-shirt"
	},

	this.leatherArmor = function(){
		this.def = 6;
		this.value = 100000;
		this.name = "Leather Armor";
		this.detail = "A hardened leather suit of armor" 
	}


]

this.midArmor = [
	
	this.steelCuirass = function(){
		this.def = 6;
		this.value = 100000;
		this.name = "Steel Cuirass";
		this.detail = "A rigid breastplate of steel";
	},


]

this.hiArmor = [
	
	this.swatUniform = function(){
		this.def = 15;
		this.value = 300000;
		this.name = "Swat Uniform";
		this.detail = "A set of special forces tactical gear";
	},

]









/*'fists',1,0],['Rusty Spoon',2,3000],['Shiny Spoon',4,5000],['Rusty Dagger',5,10000],['Sword',7,20000]]
Armors = [['nothing',0,0],['Plain Clothes',3,8000],['Chainmail Garb',30,99999],['Torn Shirt',1,2000]]*/


