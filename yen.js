/*
						TSUMOMO YEN MODULE

		At the heart of any good web bot is a near-meaningless
		currency to be collected to a point of obsession with 
		the intent to flaunt in the face of utter n00bs.

		Tsumomo does so in the form the delicious JPY or ¥ (yen).

		Below is the main yen callback that defines how yen is
		accrued and/or reported to the player when it is run.
*/


//Yummy Yennies
this.yen = function(self,nick,target,text){
	var player = self.Players[nick]

	//If player is dead, do not give yen.
	if (player.hp<=0){ 												
		deathmsg = self.cat("%s; though your soul yearns for more, your lifeless body can gather no yen. v_v",player.nick);
		self.say(target, deathmsg); 
		return false;
	}

	//If player hasn't waited for the time limit; return.
	if(new Date().getTime() < player.yenTime){
		var remaining = player.yenTime- new Date().getTime();
		remaining = Math.ceil(remaining/60000)

		/*
						"Sorry" rejection messages if timer hasn't run out
				Gives a random message if they tried again before their time ran out.
		*/
		sryMsg = "";
		var n = nick; 		 //--.___,- Shorthands for sry messages. Maintaining others for 'code clarity.'
		var r = remaining;    //.'
		var sry = ["Sorry "+n+", but you have to wait "+r+" more minutes.. ^-^;",
			"Uwaa~ "+n+"-chan.. There're still "+r+" minutes left for you to wait! '^';",
			"...Already, "+n+"? You still have to wait for "+r+" minutes! >_<;",
			"Aaa~ I'm trying "+n+"! But you'll have to wait for "+r+" more minutes!! v_v;",
			n+"... You'll still have to wait for "+r+" minutes.. '~';",
			"Please be patient and wait "+r+" minutes. ;-;",
			"Sorry, but you can collect more yen in "+r+" minutes! ^-^;"
		];
		//Select a random message.
		sryMsg = sry[Math.floor(Math.random()*sry.length)];

		//Rare messages
		if(Math.random()>0.99){
			var rare = [n.toUpperCase()+"! . . . please be patient for just "+r+" more minutes!!",
				n+" got 99999999999999999999999999 yen! You now have OVERFLOW_ERROR. ^-^"
			];
			sryMsg = rare[Math.floor(Math.random()*rare.length)];
		}

		self.pm(player.nick,sryMsg);
		return false;
	}
		//If player has waited, then update their timer and proceed :3
	else{ 
		var min = 30; //30 minutes till next fight
		var yTime = new Date().getTime() + (min*60000) ;
		player.yenTime = yTime;
	}


	/*
					Segment for actually generating player more yen.
			Player gets different messages based upon percentage of cut from max yen.
	*/

	//Give player a random amount of yen!
	var minYen=50;
	var maxYen=5000;
	var yen = self.RNG(minYen,maxYen);
	player.yen += yen;

	//What % of the max was obtained:
	var cut = Math.floor((yen/(maxYen-minYen))*100);
	var getMsg = ""
	
	//Assign reaction 'getMsg' based on size of cut (Must not end with space)
	if(cut<=10){getMsg= "Ehh.. "+nick+" only got +¥"+yen+" '^';" };
	if(cut>10){getMsg = nick+" got +¥"+yen+" that's kind of nice. '-';"};
	if(cut>=30){getMsg = nick+" received "+"+¥"+yen+"! ^-^"};
	if(cut>=75){getMsg = "Alright, " +nick+ "! " + "+¥" +yen+ "!! ^-^"};
	if(cut>90){getMsg = "Uwaa!~ Jackpot, "+nick+"!! +¥"+yen+"!!! ^-^"};

	var pouch = player.yen;

	
	var display = getMsg+" [ ¥"+pouch+" ] ";

	self.say(target,display);
};