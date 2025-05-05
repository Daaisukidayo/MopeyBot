module.exports = [{
  name: "arena",
  aliases: ["pvp"],
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;30s]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

	$let[r;$randomNumber[0;101]]
	$let[MC1;$randomNumber[1500;2001]]

	$arrayLoad[enemies;,\n;
      Dragon <:DragonS1:1327713041357213727>,
	  Dragon <:DragonS2:1292128309798244485>,
	  Golden Dragon <:GoldenDragon:1337848652483399843>,
	  Knight Dragon <:KnightDragon:1337848505401737329>,
	  Phoenix <:PhoenixS1:1327713584406335498>,
	  Phoenix <:PhoenixS2:1292128384444530689>,
	  Golden Phoenix <:GoldenPhoenix:1337848699241496697>,
	  Alpha Phoenix <:AlphaPhoenix:1337848371544592567>,
	  Kraken <:KrakenS1:1327713559618125908>,
	  Kraken <:KrakenS2:1292128363690856541>,
	  Golden Kraken <:Golden_Kraken:1337848613535219763>,
	  Chromatic Kraken <:Chromatic_Kraken:1337848432571711508>,
	  T-Rex <:TRexS1:1327713055219515442>,
	  T-Rex <:TrexS2:1292128324801269880>,
	  Ember T-Rex <:Ember_T_rex:1337848460954833006>,
	  Golden T-Rex <:Golden_T_rex:1337848638562500608>,
	  Emerald Pterodactyl <:EmeraldPterodactyl:1337848472828907560>,
	  Golden Pterodactyl <:GoldenPterodactyl:1337848705197277224>,
	  Pterodactyl <:PterodactylS1:1327713012798193694>,
	  Pterodactyl <:PterodactylS2:1292128266559426724>,
	  Yeti <:YetiS1:1327712991692455987>,
	  Yeti <:YetiS2:1292128236096065690>,
	  Aqua Yeti <:AquaYetiS2:1284570581093711914>,
	  Emerald Yeti <:EmeraldYeti:1337848485843566622>,
	  Golden Yeti <:GoldenYeti:1337848713963507814>,
	  King Crab <:KingCrabS1:1327713548046045319>,
	  King Crab <:KingCrabS2:1292128350961401897>,
	  Amethyst King Crab <:Amethyst_King_Crab:1337848394072326145>,
	  Golden King Crab <:Golden_King_Crab:1337848599177859325>,
	  Land Monster <:LandMonsterS1:1327716340701593723>,
	  Land Monster <:LandMonsterS2:1292128532889075757>,
	  Golden Land Monster <:GoldenLandMonster:1337848681306783938>,
	  Titanite Land Monster <:TitaniteMonster:1337848538142347325>,
	  Golden Dino Monster <:Golden_Dino_Monster:1337848568358240379>,
	  Citrine Dino Monster <:Citrine_Dino_Monster:1337848446240948376>,
	  Dino Monster <:DinoMonsterS1:1327716246929543269>,
	  Dino Monster <:Dino_MonsterS2:1292128471501242368>,
	  Giant Scorpion <:GiantScorpionS1:1327716215262548051>,
	  Giant Scorpion <:GiantScorpionS2:1292128439603560499>,
	  Golden Giant Scorpion <:GoldenGiantScorpion:1337848672825639023>,
	  Carnelian Giant Scorpion <:CarnelianScorpion:1337848422077825236>,
	  Sea Monster <:SeaMonsterS1:1327716267691479123>,
	  Sea Monster <:SeaMonsterS2:1292128514031616112>,
	  Saphire Sea Monster <:Sapphire_Sea_Monster:1337848525207113788>,
	  Golden Sea Monster <:Golden_Sea_Monster:1337848626134908928>,
	  Golden Ice Monster <:Golden_Ice_Monster:1337848583898271744>,
	  Amethyst Ice Monster <:Amethyst_Ice_Monster:1337848408941269053>,
	  Ice Monster <:IceMonsterS1:1327716198275747870>,
	  Ice Monster <:IceMonsterS2:1292128414463037523>]


	$if[$get[r]>=20;

		$callFunction[sumMC;$get[MC1]]
		$let[desc;## You went into arena and you beat $arrayRandomValue[enemies] and you earned $get[MC1]$getGlobalVar[emoji]!]
		$let[color;$getGlobalVar[defaultColor]]

	;

		$let[desc;## You went into arena but you lost to $arrayRandomValue[enemies].]
		$let[color;$getGlobalVar[errorColor]]

    ]

    $getGlobalVar[author]
    $description[$get[desc]]
    $color[$get[color]]
    `
  }]