	/*			
							  TSUMOMO FIENDS

			Defines all enemy npc objects for players to combat.
			Players will be exposed to stronger npcs as they level.
			
			NPCs must be initialized with the players level [pLvl]
			so that its own level and subsequent stats can be scaled
			around them.
	*/ 
this.level = function(){


}

this.newFiend = function(pLvl){
	var fiend = {}
	switch (pLvl){
		case (pLvl<=8): return new this.slime();
		
	}



}



									//Slime
this.slime = function(pLvl){
	var colors = ["red","blue","green","yellow","pink","purple"];
	this.color = colors[RNG(0,colors.length-1)];
	this.name = "slime";
	this.detailName = this.color+" slime";
	this.detail = "Its "+this.color+", gelatinous body ripples as it bounces toward you.";
	this.encounter = "You encountered a slime! "+this.detail;
	this.hp = 20;
	this.str = 5;
	this.def = 3;
	this.level = 3;
	this.xp = RNG(8,14);
}



								//Jackal
this.jackal = function(pLvl){
	var colors = ["brown","grey","spotted","black","white","tan"];
	this.color = colors[RNG(0,colors.length-1)];
	this.name = "jackal";
	this.detailName = this.color+" jackal";
	this.detail = "With wild eyes and a "+this.color+" coat of fur, it eyes you hungrily.";
	this.encounter = "A wild jackal approaches! "+this.detail;
	this.hp = 50;
	this.str = 12;
	this.def = 15;
	this.level = 7;
	this.xp = RNG(12,18);
}


								//Snail
this.snail = function(pLvl){
	var colors = ["brown","blue","dark green","gold","mega","disgruntled"];
	this.color = colors[RNG(0,colors.length-1)];
	this.name = "snail";
	this.detailName = this.color+" snail";
	this.detail = "Its "+this.color+" shell looks hella intense!";
	this.encounter = "A crazy insane wild snail approaches! "+this.detail;
	this.hp = 300+RNG(0,50);
	this.str = 50;
	this.def = 90;
	this.level = 20;
	this.xp = RNG(15,20);
}