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
	this.rustyFork = function(){
		this.dmg = 2
		this.value = 20000
		this.name = "Rusty Fork"
		this.detail ="an old rusty fork"
	},

	this.fork = function(){
		this.dmg = 3
		this.value = 43000
		this.name = "Fork"
		this.detail ="a fork"
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
		this.name= "Cutlass"
		this.value=250000
		this.dmg=8
		this.detail="a sharp cutlass"
	}

]



//Consumable items
this.consumable = [

	this.potion = function(){
		this.name= "Potion";
		this.value=9000;
		this.detail="a bottle of healing elixer";
	},

	this.revive = function(){
		this.name = "Revival Bead";
		this.value = 15000;
		this.detail = "a small orb for returning souls to　their bodies"
	}

]


	/*
					ARMOR
		Adds defense from attacks in the field
	*/


this.lowArmor = [

	this.plainClothes = function(){
		this.def=2
		this.value=5000
		this.name= "Plain Clothes"
		this.detail="a pair of jeans and a T-shirt";
	},

	this.leatherArmor = function(){
		this.def = 6;
		this.value = 10000;
		this.name = "Leather Armor";
		this.detail = " hardened leather armor";
	},

	this.asslessChaps = function(){
		this.def = Math.floor(Math.random()*10);
		this.value = Math.floor(Math.random()*2000+500);
		this.name = "Assless Chaps";
		this.detail = "some assless chaps.";
	}
]

this.midArmor = [

	this.steelCuirass = function(){
		this.def = 9;
		this.value = 100000;
		this.name = "Steel Cuirass";
		this.detail = "a breastplate forged from rigid steel";
	},

	this.kevlarVest = function(){
		this.def = 7;
		this.value = 59000;
		this.name = "Kevlar® Vest";
		this.detail = "a bulletproof vest made of Kevlar®.";
	},

]

this.hiArmor = [
	
	this.swatUniform = function(){
		this.def = 15;
		this.value = 300000;
		this.name = "Swat Uniform";
		this.detail = "a set of special forces tactical gear";
	},

]






