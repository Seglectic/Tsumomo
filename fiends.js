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



									//Slime
this.slime = function(pLvl){
	this.colors = ["red","blue","green","yellow","pink","purple"];
	this.color = this.colors[RNG(0,this.colors.length-1)];
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
	this.colors = ["brown","grey","spotted","black","white","tan"];
	this.color = this.colors[RNG(0,this.colors.length-1)];
	this.name = "jackal";
	this.detailName = this.color+" slime";
	this.detail = "With wild eyes and a "+this.color+" coat of fur, it eyes you hungrily.";
	this.encounter = "A wild jackal approaches! "+this.detail;
	this.hp = 40;
	this.str = 12;
	this.def = 15;
	this.level = pLvl+(RNG());
}