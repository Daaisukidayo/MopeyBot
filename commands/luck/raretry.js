module.exports = [{
  name: "raretry",
  aliases: ["rt"],
  type: "messageCreate",
  code: `
    $reply
  
    $onlyIf[$getGlobalVar[botEnabled];
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules];$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]

    $let[cdTime;10s]
    $if[$getUserVar[dev]==false;  $userCooldown[$commandName;$get[cdTime];$callFunction[cooldownSchema;$commandName]]  ]

    $jsonLoad[userPacks;$getUserVar[userPacks]]


        
    $c[!        CHANCES AND COINS GENERATOR        ]


    $c[?      10 - ussr]
    $c[?      9 - shahs]
    $c[?      8 - pakistan]
    $c[?      7 - godly]
    $c[?      6 - extreme]
    $c[?      5 - legendary]
    $c[?      4 - epic]
    $c[?      3 - rare]
    $c[?      2 - uncommon]
    $c[?      1 - common]
    $c[?      0 - nothing]


    $c[+ USSR]

    $let[m010;140]
    $let[m110;500000] $c[+ default]
    $let[m210;$math[$get[m110] * 2.5 * 1.5]]
    $let[m310;$math[$get[m110] * 8 * 2]]
    $let[m410;$math[$get[m110] * 13.5 * 3]]
    $let[m510;$math[$get[m110] * 100 * 5]]

    $let[c010;30]
    $let[c110;10000]
    $let[c210;25000]
    $let[c310;50000]
    $let[c410;100000]
    $let[c510;1000000]

    $c[+ IMPOSS]

    $let[m09;130]
    $let[m19;200000] $c[+ default]
    $let[m29;$math[$get[m19] * 2.5 * 1.5]]
    $let[m39;$math[$get[m19] * 8 * 2]]
    $let[m49;$math[$get[m19] * 12.5 * 3]]
    $let[m59;$math[$get[m19] * 25 * 5]]

    $let[c09;25]
    $let[c19;5000]
    $let[c29;10000]
    $let[c39;25000]
    $let[c49;50000]
    $let[c59;100000]

    $c[+ PAKISTAN]

    $let[m08;120]
    $let[m18;80000] $c[+ default]
    $let[m28;$math[$get[m18] * 2.5 * 1.5]]
    $let[m38;$math[$get[m18] * 8 * 2]]
    $let[m48;$math[$get[m18] * 15 * 3]]
    $let[m58;$math[$get[m18] * 30 * 5]]

    $let[c08;20]
    $let[c18;2000]
    $let[c28;5000]
    $let[c38;10000]
    $let[c48;25000]
    $let[c58;50000]

    $c[+ GODLY]

    $let[m07;110]
    $let[m17;35000] $c[+ default]
    $let[m27;$math[$get[m17] * 2 * 1.5]]
    $let[m37;$math[$get[m17] * 5 * 2]]
    $let[m47;$math[$get[m17] * 12.5 * 3]]
    $let[m57;$math[$get[m17] * 25 * 5]]

    $let[c07;15]
    $let[c17;1000]
    $let[c27;2000]
    $let[c37;5000]
    $let[c47;10000]
    $let[c57;25000]

    $c[+ EXTREME]

    $let[m06;100]
    $let[m16;7000] $c[+ default]
    $let[m26;$math[$get[m16] * 5 * 1.5]]
    $let[m36;$math[$get[m16] * 10 * 2]]
    $let[m46;$math[$get[m16] * 25 * 3]]
    $let[m56;$math[$get[m16] * 50 * 5]]

    $let[c06;10]
    $let[c16;200]
    $let[c26;1000]
    $let[c36;2000]
    $let[c46;5000]
    $let[c56;10000]

    $c[+ LEGENDARY]

    $let[m05;0]
    $let[m15;2500] $c[+ default]
    $let[m25;$math[$get[m15] * 2.5 * 1.5]]
    $let[m35;$math[$get[m15] * 12.5 * 2]]
    $let[m45;$math[$get[m15] * 25 *  3]]
    $let[m55;$math[$get[m15] * 60 * 5]] 

    $let[c05;5]
    $let[c15;75]
    $let[c25;200]
    $let[c35;1000]
    $let[c45;2000]
    $let[c55;5000]

    $c[+ EPIC]

    $let[m04;0]
    $let[m14;850] $c[+ default]
    $let[m24;$math[$get[m14] * 3 * 1.5]] $c[15000]
    $let[m34;$math[$get[m14] * 5 * 2]] $c[75000]
    $let[m44;$math[$get[m14] * 25 * 3]] $c[225000]
    $let[m54;$math[$get[m14] * 50 * 5]] $c[1000000]

    $let[c04;4]
    $let[c14;30]
    $let[c24;75]
    $let[c34;200]
    $let[c44;1000]
    $let[c54;2000]

    $c[+ RARE]

    $let[m03;0]
    $let[m13;250] $c[+ default]
    $let[m23;$math[$get[m13] * 5 * 1.5]] $c[7500]
    $let[m33;$math[$get[m13] * 7 * 2]] $c[30000]
    $let[m43;$math[$get[m13] * 20 * 3]] $c[100000]
    $let[m53;$math[$get[m13] * 100 * 5]] $c[500000]

    $let[c03;3]
    $let[c13;10]
    $let[c23;30]
    $let[c33;75]
    $let[c43;200]
    $let[c53;1000]

    $c[+ UNCOMMON]

    $let[m02;0]
    $let[m12;0] $c[+ default]
    $let[m22;$math[$get[m13] * 2 * 1.5]] $c[7500]
    $let[m32;$math[$get[m14] * 2]] $c[15000]
    $let[m42;$math[$get[m15] / 2 * 3]] $c[45000]
    $let[m52;$math[$get[m15] * 3 * 5]] $c[200000]

    $let[c02;2]
    $let[c12;5]
    $let[c22;10]
    $let[c32;30]
    $let[c42;75]
    $let[c52;500]

    $c[+ COMMON]

    $let[m01;0]
    $let[m11;0] $c[+ default]
    $let[m21;0]
    $let[m31;$math[$get[m13] * 2]] $c[3750]
    $let[m41;$math[$get[m14] / 2 * 3]] $c[22500]
    $let[m51;$math[$get[m16] / 2.5 * 5]] $c[75000] 

    $let[c01;1]
    $let[c11;3]
    $let[c21;5]
    $let[c31;10]
    $let[c41;30]
    $let[c51;200]

    $c[+ NOTHING]

    $let[m00;0]
    $let[m10;0]
    $let[m20;0]
    $let[m30;0]
    $let[m40;0]
    $let[m50;0]

    
    
    $switch[$getUserVar[rtMode];
        $case[inferno;$let[mode;0]]
        $case[default;$let[mode;1]]
        $case[medium;$let[mode;2]]
        $case[hard;$let[mode;3]]
        $case[insane;$let[mode;4]]
        $case[impossible;$let[mode;5]]]
    ]

    $let[10;$get[c$get[mode]10]]
    $let[9;$get[c$get[mode]9]]
    $let[8;$get[c$get[mode]8]]
    $let[7;$get[c$get[mode]7]]
    $let[6;$get[c$get[mode]6]]
    $let[5;$get[c$get[mode]5]]
    $let[4;$get[c$get[mode]4]]
    $let[3;$get[c$get[mode]3]]
    $let[2;$get[c$get[mode]2]]
    $let[1;$get[c$get[mode]1]]

    $let[r10;1==$randomNumber[1;$sum[1;$get[10]]]]
    $let[r9;1==$randomNumber[1;$sum[1;$get[9]]]]
    $let[r8;1==$randomNumber[1;$sum[1;$get[8]]]]
    $let[r7;1==$randomNumber[1;$sum[1;$get[7]]]]
    $let[r6;1==$randomNumber[1;$sum[1;$get[6]]]]
    $let[r5;1==$randomNumber[1;$sum[1;$get[5]]]]
    $let[r4;1==$randomNumber[1;$sum[1;$get[4]]]]
    $let[r3;1==$randomNumber[1;$sum[1;$get[3]]]]
    $let[r2;1==$randomNumber[1;$sum[1;$get[2]]]]
    $let[r1;1==$randomNumber[1;$sum[1;$get[1]]]]

    $if[$get[r10];  $let[p;10];
    $if[$get[r9];   $let[p;9];
    $if[$get[r8];   $let[p;8];
    $if[$get[r7];   $let[p;7];
    $if[$get[r6];   $let[p;6];
    $if[$get[r5];   $let[p;5];
    $if[$get[r4];   $let[p;4];
    $if[$get[r3];   $let[p;3];
    $if[$get[r2];   $let[p;2];
    $if[$get[r1];   $let[p;1];
                    $let[p;0]
    ]]]]]]]]]]

        
    $if[$and[$getUserVar[dev]!=false;$message[0]!=;$isNumber[$message[0]];$message[0]>=0;$message[0]<=10];
            $let[p;$message[0]]
    ]

        
    $c[!      RARE ANIMALS TEXT      ]


    $let[rare1;Choco Toucan <:ChocoToucanS2:1284567662353059971>]
    $let[rare2;Keel Billed Toucan <:KeelBilledToucanS2:1284567675212664964>]
    $let[rare3;Markhor <:MarkhorS2:1284568638170595459>]

    $let[rare4;Blue Macaw <:BlueMacawS2:1284540918648541287>]
    $let[rare5;Yellow Pufferfish <:YellowPufferfishS2:1284567779156168846>]
    $let[rare6;Lioness <:LionessS2:1284568161206800505>]
    $let[rare7;Doe <:DoeS2:1284520854276804680>]
    $let[rare8;Jaguar <:JaguarS2:1284567739440300052>]
    $let[rare9;Leopard <:LeopardS2:1284567751641530579>]
    $let[rare10;Fiery Toucan <:FieryToucanS2:1284567688781238323>]

    $let[rare11;Black Panther <:BlackPantherS2:1284567767764177028>]
    $let[rare12;Lion Cub <:LionCubS2:1284568208082341929>]
    $let[rare13;Black Maned Lion <:BlackManedLionS2:1284568114562076903>]
    $let[rare14;White Dove <:WhiteDoveS2:1291258772492255263>]
    $let[rare15;Pinky Pig <:PinkyPigS2:1284520701541351454>]
    $let[rare16;Marsh Deer <:MarshDeerS2:1284520894894702788>]
    $let[rare17;Momaffie <:MomaffieS2:1284567606422147202>]
    $let[rare18;Momaffie Family <:MomaffieFamilyS2:1284567618627571896>]
    $let[rare19;Golden Pheasant <:GoldenPheasantS2:1285692782765408360>]
    $let[rare20;White Tiger <:WhiteTigerS2:1284568061474508810>]

    $let[rare21;White Lion <:WhiteLionS2:1284568130668199966>]
    $let[rare22;White Lioness <:WhiteLionessS2:1284568171931766927>]
    $let[rare23;White Lion Cub <:WhiteLionCubS2:1284568220644409386>]
    $let[rare24;Big Goat <:BigGoatS2:1284568654092173404>]
    $let[rare25;Jackass <:JackassS2:1284567568299851918>]
    $let[rare26;Girabie <:GirabieS2:1284567631956807701>]
    $let[rare27;The Bigfoot <:TheBigfootS2:1285617256562425967>]
    $let[rare28;The Snowman <:TheSnowmanS2:1284570594075218014>]
    $let[rare29;The Snowgirl <:TheSnowgirlS1:1284570612018315346>]
    $let[rare30;Stinky Pig <:StinkyPigS2:1284520753793863831>]

    $let[rare31;Musk Deer <:MuskDeerS2:1284540790583984139>]
    $let[rare32;Black Lion <:BlackLionS2:1284568143435661374>]
    $let[rare33;Black Lioness <:BlackLionessS2:1284568191569235999>]
    $let[rare34;Black Lion Cub <:BlackLionCubS2:1284568232950366290>]
    $let[rare35;White Rhino <:WhiteRhinoS2:1284568524806684724>]
    $let[rare36;Golden Eagle <:GoldenEagleS2:1284568352404279326>]
    $let[rare37;Predator Falcon <:PredatorFalconS2:1284568255599476786>]
    $let[rare38;Aqua Yeti <:AquaYetiS2:1284570581093711914>]
    $let[rare39;Lava Toucan <:LavaToucanS2:1284567706171080725>]
    $let[rare40;Demon Pufferfish <:DemonPufferfishS2:1284567803596116047>]

    $let[rare41;Black Rhino <:BlackRhinoS2:1284568536362127493>]
    $let[rare42;White Giraffe <:WhiteGiraffeS2:1284570509589352478>]
    $let[rare43;Giraffe Family <:GiraffeFamilyS2:1284570523786936450>]
    $let[rare44;King Dragon <:KingDragonS2:1280238249360494825>]
    $let[rare45;Pakistan Macaw <:PakistanMacawS2:1284540970876145704>]
    $let[rare46;Pakistan Toucan <:PakistanToucanS2:1284567718351077386>]
    $let[rare47;Pakistan Vulture <:PakistanVultureS2:1284568287971377233>]
    $let[rare48;Shaheen Falcon <:ShaheenFalconS2:1284568268493033533>]
    $let[rare49;Harpy Eagle <:ShahbazS2:1284568371043635352>]
    $let[rare50;Greater Spotted Eagle <:GoldenShahbazS2:1284568382850727997>]

    $let[rare51;USSR Macaw <:USSRMacawS2:1288058610655690804>]
    $let[rare52;USSR Toucan <:USSRToucanS2:1288058651075940382>]
    $let[rare53;USSR Vulture <:USSRVultureS2:1288058686241243157>]

    $let[rare54;Black Bear <:BlackBearS2:1288058731363569684>]
    $let[rare55;Black Tiger <:BlackTigerS2:1288058719082643526>]

    $let[rrare10;$randomText[$get[rare51];$get[rare52];$get[rare53]]]
    $let[rrare9;$randomText[$get[rare48];$get[rare49];$get[rare50]]]
    $let[rrare8;$randomText[$get[rare45];$get[rare46];$get[rare47]]]
    $let[rrare7;$randomText[$get[rare27];$get[rare28];$get[rare29];$get[rare44]]]
    $let[rrare6;$randomText[$get[rare39];$get[rare40];$get[rare41];$get[rare42];$get[rare43]]]
    $let[rrare5;$randomText[$get[rare54];$get[rare55];$get[rare30];$get[rare31];$get[rare32];$get[rare33];$get[rare34];$get[rare35];$get[rare36];$get[rare37];$get[rare38]]]
    $let[rrare4;$randomText[$get[rare20];$get[rare21];$get[rare22];$get[rare23];$get[rare24];$get[rare25];$get[rare26]]]
    
    $if[$env[userPacks;lockedSP];
        $let[rrare3;$randomText[$get[rare11];$get[rare12];$get[rare13];$get[rare14];$get[rare15];$get[rare16];$get[rare17];$get[rare18];$get[rare19];$get[rare27];$get[rare28];$get[rare29]]]
    ;
        $let[rrare3;$randomText[$get[rare11];$get[rare12];$get[rare13];$get[rare14];$get[rare15];$get[rare16];$get[rare17];$get[rare18];$get[rare19]]]
    ]

    $let[rrare2;$randomText[$get[rare4];$get[rare5];$get[rare6];$get[rare7];$get[rare8];$get[rare9];$get[rare10]]]
    $let[rrare1;$randomText[$get[rare1];$get[rare2];$get[rare3]]]
        
    $c[!      THUMBNAIL      ]

    $let[t55;https://media.discordapp.net/attachments/701793335941136464/1288064073644376095/BlackTiger.png]
    $let[t54;https://media.discordapp.net/attachments/701793335941136464/1288064073321287711/BlackBear.png]

    $let[t53;https://media.discordapp.net/attachments/701793335941136464/1288064074789421077/USSR_Vulture-S2.png]
    $let[t52;https://media.discordapp.net/attachments/701793335941136464/1288064074365534208/USSR_Toucan-S2.png]
    $let[t51;https://media.discordapp.net/attachments/701793335941136464/1288064073983987787/USSR_Macaw-S2.png]

    $let[t50;https://media.discordapp.net/attachments/701793335941136464/1286734456077680826/GoldenShahbaz.png]
    $let[t49;https://media.discordapp.net/attachments/701793335941136464/1286734456690049024/Shahbaz.png]
    $let[t48;https://media.discordapp.net/attachments/701793335941136464/1286734151457968222/ShaheenFalcon.png]

    $let[t47;https://media.discordapp.net/attachments/701793335941136464/1286734150849663066/PakistanVulture.png]
    $let[t46;https://media.discordapp.net/attachments/701793335941136464/1286730610446041212/PakistanToucan.png]
    $let[t45;https://media.discordapp.net/attachments/701793335941136464/1286733633834713222/PakistanMacaw.png]

    $let[t44;https://media.discordapp.net/attachments/701793335941136464/1286734722700935188/kds2.png]

    $let[t43;https://media.discordapp.net/attachments/701793335941136464/1286734721174343740/Giraffe_family.png]
    $let[t42;https://media.discordapp.net/attachments/701793335941136464/1286734721425866884/WhiteGiraffe.png]
    $let[t41;https://media.discordapp.net/attachments/701793335941136464/1286734455423242424/BlackRhino.png]
    $let[t40;https://media.discordapp.net/attachments/701793335941136464/1286730608113881140/DemonPufferfish.png]
    $let[t39;https://media.discordapp.net/attachments/701793335941136464/1286730609326297214/LavaToucan.png]

    $let[t38;https://media.discordapp.net/attachments/701793335941136464/1286734721690112000/AquaYeti.png]
    $let[t37;https://media.discordapp.net/attachments/701793335941136464/1286734151109705748/PredatorFalcon.png]
    $let[t36;https://media.discordapp.net/attachments/701793335941136464/1286734455754457088/GoldenEagle.png]
    $let[t35;https://media.discordapp.net/attachments/701793335941136464/1286734456954294352/WhiteRhino.png]
    $let[t34;https://media.discordapp.net/attachments/701793335941136464/1286734150342148148/BlackLionCub.png]
    $let[t33;https://media.discordapp.net/attachments/701793335941136464/1286734150593675305/BlackLioness.png]
    $let[t32;https://media.discordapp.net/attachments/701793335941136464/1286734150128242698/BlackLion.png]
    $let[t31;https://media.discordapp.net/attachments/701793335941136464/1286733627601977477/MuskDeer-S2.png]
    $let[t30;https://media.discordapp.net/attachments/701793335941136464/1286733625928454275/StinkyPig-S2.png]

    $let[t29;https://media.discordapp.net/attachments/701793335941136464/1286734722113863712/TheSnowgirl.png]
    $let[t28;https://media.discordapp.net/attachments/701793335941136464/1286734722369851525/TheSnowman.png]
    $let[t27;https://media.discordapp.net/attachments/701793335941136464/1286734721904283729/TheBigfoot.png]
    $let[t26;https://media.discordapp.net/attachments/701793335941136464/1286734058289762485/Girabie.png]
    $let[t25;https://media.discordapp.net/attachments/701793335941136464/1286733633268355225/Jackass.png]
    $let[t24;https://media.discordapp.net/attachments/701793335941136464/1286734455092023296/BigGoat.png]
    $let[t23;https://media.discordapp.net/attachments/701793335941136464/1286734061607452752/WhiteLionCub.png]

    $let[t22;https://media.discordapp.net/attachments/701793335941136464/1286734061888606279/WhiteLioness.png]
    $let[t21;https://media.discordapp.net/attachments/701793335941136464/1286734061070454784/WhiteLion.png]
    $let[t20;https://media.discordapp.net/attachments/701793335941136464/1286734059422093375/WhiteTiger.png]
    $let[t19;https://media.discordapp.net/attachments/701793335941136464/1286733626628767816/GoldenPheasant.png]
    $let[t18;https://media.discordapp.net/attachments/701793335941136464/1286734059053256737/Momaffie_family.png]
    $let[t17;https://media.discordapp.net/attachments/701793335941136464/1286734058642210939/Momaffie.png]
    $let[t16;https://media.discordapp.net/attachments/701793335941136464/1286733626905464942/MarshDeer-S2.png]
    $let[t15;https://media.discordapp.net/attachments/701793335941136464/1286733625592905891/pinkypig-S2.png]
    $let[t14;https://media.discordapp.net/attachments/701793335941136464/1286733625265623082/white_dove.png]
    $let[t13;https://media.discordapp.net/attachments/701793335941136464/1286734060042977393/BlackManedLion.png]
    $let[t12;https://media.discordapp.net/attachments/701793335941136464/1286734060387041394/LionCub.png]
    $let[t11;https://media.discordapp.net/attachments/701793335941136464/1286730607287730186/BlackPanther.png]

    $let[t10;https://media.discordapp.net/attachments/701793335941136464/1286730608390701066/FieryToucan.png]
    $let[t9;https://media.discordapp.net/attachments/701793335941136464/1286730609888067654/Leopard.png]
    $let[t8;https://media.discordapp.net/attachments/701793335941136464/1286730608680370289/Jaguar.png]
    $let[t7;https://media.discordapp.net/attachments/701793335941136464/1286733626133708861/Doe-S2.png]
    $let[t6;https://media.discordapp.net/attachments/701793335941136464/1286734060651286589/Lioness.png]
    $let[t5;https://media.discordapp.net/attachments/701793335941136464/1286730611494621268/YellowPufferfish.png]
    $let[t4;https://media.discordapp.net/attachments/701793335941136464/1286733627836600431/BlueMacaw.png]

    $let[t3;https://media.discordapp.net/attachments/701793335941136464/1286734456429744221/Markhor.png]
    $let[t2;https://media.discordapp.net/attachments/701793335941136464/1286730609045143632/KeelBilledToucan.png]
    $let[t1;https://media.discordapp.net/attachments/701793335941136464/1286730607816343573/ChocoToucan.png]



    $let[desc10;$get[rrare10]]
    $let[desc9;$get[rrare9]]
    $let[desc8;$get[rrare8]]
    $let[desc7;$get[rrare7]]
    $let[desc6;$get[rrare6]]
    $let[desc5;$get[rrare5]]
    $let[desc4;$get[rrare4]]
    $let[desc3;$get[rrare3]]
    $let[desc2;$get[rrare2]]
    $let[desc1;$get[rrare1]]
    $let[desc0;nothing]

    $let[clr10;B80000]
    $let[clr9;50351E]
    $let[clr8;12713a]
    $let[clr7;d61b4a]
    $let[clr6;452591]
    $let[clr5;750e0e]
    $let[clr4;fffff1]
    $let[clr3;f3ab0f]
    $let[clr2;ffff00]
    $let[clr1;c0c0c0]
    $let[clr0;d0321d]


            
    $switch[$get[p];

        $case[10;$switch[$get[rrare10];
            $case[$get[rare53];$let[th;53]]
            $case[$get[rare52];$let[th;52]]
            $case[$get[rare51];$let[th;51]]]]
        ]

        $case[9;$switch[$get[rrare9];
            $case[$get[rare50];$let[th;50]]
            $case[$get[rare49];$let[th;49]]
            $case[$get[rare48];$let[th;48]]]]
        ]

        $case[8;$switch[$get[rrare8];
            $case[$get[rare47];$let[th;47]]
            $case[$get[rare46];$let[th;46]]
            $case[$get[rare45];$let[th;45]]]]
        ]

        $case[7;$switch[$get[rrare7];
            $case[$get[rare29];$let[th;29]]
            $case[$get[rare28];$let[th;28]]
            $case[$get[rare27];$let[th;27]]
            $case[$get[rare44];$let[th;44]]]]
        ]

        $case[6;$switch[$get[rrare6];
            $case[$get[rare43];$let[th;43]]
            $case[$get[rare42];$let[th;42]]
            $case[$get[rare41];$let[th;41]]
            $case[$get[rare40];$let[th;40]]
            $case[$get[rare39];$let[th;39]]]]
        ]

        $case[5;$switch[$get[rrare5];
            $case[$get[rare55];$let[th;55]]
            $case[$get[rare54];$let[th;54]]
            $case[$get[rare38];$let[th;38]]
            $case[$get[rare37];$let[th;37]]
            $case[$get[rare36];$let[th;36]]
            $case[$get[rare35];$let[th;35]]
            $case[$get[rare34];$let[th;34]]
            $case[$get[rare33];$let[th;33]]
            $case[$get[rare32];$let[th;32]]
            $case[$get[rare31];$let[th;31]]
            $case[$get[rare30];$let[th;30]]]]
        ]

        $case[4;$switch[$get[rrare4];
            $case[$get[rare26];$let[th;26]]
            $case[$get[rare25];$let[th;25]]
            $case[$get[rare24];$let[th;24]]
            $case[$get[rare23];$let[th;23]]
            $case[$get[rare22];$let[th;22]]
            $case[$get[rare21];$let[th;21]]
            $case[$get[rare20];$let[th;20]]]]
        ]

        $case[3;$switch[$get[rrare3];
            $case[$get[rare29];$let[th;29]]
            $case[$get[rare28];$let[th;28]]
            $case[$get[rare27];$let[th;27]]
            $case[$get[rare19];$let[th;19]]
            $case[$get[rare18];$let[th;18]]
            $case[$get[rare17];$let[th;17]]
            $case[$get[rare16];$let[th;16]]
            $case[$get[rare15];$let[th;15]]
            $case[$get[rare14];$let[th;14]]
            $case[$get[rare13];$let[th;13]]
            $case[$get[rare12];$let[th;12]]
            $case[$get[rare11];$let[th;11]]]]
        ]

        $case[2;$switch[$get[rrare2];
            $case[$get[rare10];$let[th;10]]
            $case[$get[rare9];$let[th;9]]
            $case[$get[rare8];$let[th;8]]
            $case[$get[rare7];$let[th;7]]
            $case[$get[rare6];$let[th;6]]
            $case[$get[rare5];$let[th;5]]
            $case[$get[rare4];$let[th;4]]]]
        ]

        $case[1;$switch[$get[rrare1];
            $case[$get[rare3];$let[th;3]]
            $case[$get[rare2];$let[th;2]]
            $case[$get[rare1];$let[th;1]]]]
        ]
    ]

    $log[-$get[th]-]
    $let[th;$replace[$get[th]; ;]]
    $log[-$get[th]-]


    $let[thum;$get[t$get[th]]]
    $let[MC;$get[m$get[mode]$get[p]]]
    $let[f;$get[$get[p]]]
    $let[desc;$get[desc$get[p]]]
    $let[clr;$get[clr$get[p]]]

    $if[$and[$getUserVar[dev]!=false;$isNumber[$message[1]];$message[1]>0];
        $if[$get[rare$message[1]]==;
            $let[desc;undefined]
            $let[thum;]
        ;
            $let[desc;$get[rare$message[1]]]
            $let[thum;$get[t$message[1]]]
        ]
    ]


    $if[$get[p]==0;
        $let[msgdesc;## $randomText[You tried to get rares but you got nothing;You tried to get rares but ended up with nothing;You went raretrying but found nothing this time;You tried your luck with rares but didn’t find any;You were farming for rares but got nothing special;You tried evolving into a rare but failed].] 
    ;
        $let[msgdesc;## $randomText[You tried to get rares and you got;You tried to get rares and picked;You tried your luck with rares and got;You went after rares and got;You tried evolving into a rare and succeeded with] __$get[desc]__]
    
        $if[$get[MC]!=0;
            $let[msgdesc;$get[msgdesc] $randomText[earning;gaining;collecting;scoring] $separateNumber[$get[MC];.]$getGlobalVar[emoji]]
        ]
  
        $let[msgdesc;$get[msgdesc]!]
    ] 

    $c[TODO========================================================================]

    $if[$and[$get[p]==7;$get[desc]==$get[rare44];$and[$env[userPacks;legacySP];$env[userPacks;goldenSP];$env[userPacks;lockedSP];$env[userPacks;storefrontSP]]];
        
        $addActionRow
        $addStringSelectMenu[luckkdmenu-$authorID;Choose an upgrade:]
        $addOption[King Dragon;;$getUserVar[rtMode]luckkd-$authorID;<:kingdragonseason2:1280238249360494825>]
    
        $if[$env[userPacks;legacySP];
            $addOption[King Dragon;;$getUserVar[rtMode]luckoldkd-$authorID;<:king_dragon:715588377650528398>]
        ]
        
        $if[$env[userPacks;goldenSP];
            $addOption[Golden King Dragon;;$getUserVar[rtMode]luckgkd-$authID;<:golden_kd:73548382105056053>;]
        ]
    
        $if[$env[userPacks;lockedSP];
            $addOption[King Ripper;;$getUserVar[rtMode]luckkr-$authorID;<:king_ripper:735483931851227264>]
            $addOption[King Stan;;$getUserVar[rtMode]luckkst-$authorID;<:king_stan:735484001275609118>]
            $addOption[King Shah;;$getUserVar[rtMode]luckksh-$authorID;<:king_shah:735484059500806174>]
            $addOption[Queen Celeste;;$getUserVar[rtMode]luckqc-$authorID;<:queen_celeste:735484190187061268>]
            $addOption[Queen Scarlet;;$getUserVar[rtMode]luckqs-$authorID;<:queen_scarlet:735484138949312582>]
        ]
    
        $if[$env[userPacks;storefrontSP];
            $addOption[Queen Flame;;$getUserVar[rtMode]luckqf-$authorID;<:queen_flame:884030972629229568>]
        ]
    
        $let[MC;0]
        $let[thum;]
        $let[msgdesc;## Choose an upgrade:\n# <:kingdragonseason2:1280238249360494825> $if[$env[userPacks;legacySP];<:king_dragon:715588377650528398>] $if[$env[userPacks;goldenSP];<:golden_kd:735483821050560583>] $if[$env[userPacks;lockedSP];<:king_ripper:735483931851227264> <:king_stan:735484001275609118> <:king_shah:735484059500806174> <:queen_celeste:735484190187061268> <:queen_scarlet:735484138949312582>] $if[$env[userPacks;storefrontSP];<:queen_flame:884030972629229568>]]
    ]
  
    $callFunction[sumMC;$get[MC]]  

    $sendMessage[$channelID;
        $color[$get[clr]]
        $description[$get[msgdesc]]
        $thumbnail[$get[thum]]
        $author[$nickname • MUID: $getUserVar[MUID];$userAvatar]
        $footer[$if[$get[p]>0;Rarity: 1/$get[f] • ]Raretry mode: $getUserVar[rtMode]]
    ]

    $callFunction[logSchema;$commandName]
  `
}]

// The code is quite lengthy and complex. To continue modifying it, let's focus on improving readability and maintainability.
// Here's an example of how you can refactor the thumbnail and description logic into reusable functions:

// Define a function to get the thumbnail based on rarity and animal
function getThumbnail(rarity, animal) {
    const thumbnails = {
        10: {
            rare53: "https://media.discordapp.net/attachments/701793335941136464/1288064074789421077/USSR_Vulture-S2.png",
            rare52: "https://media.discordapp.net/attachments/701793335941136464/1288064074365534208/USSR_Toucan-S2.png",
            rare51: "https://media.discordapp.net/attachments/701793335941136464/1288064073983987787/USSR_Macaw-S2.png",
        },
        9: {
            rare50: "https://media.discordapp.net/attachments/701793335941136464/1286734456077680826/GoldenShahbaz.png",
            rare49: "https://media.discordapp.net/attachments/701793335941136464/1286734456690049024/Shahbaz.png",
            rare48: "https://media.discordapp.net/attachments/701793335941136464/1286734151457968222/ShaheenFalcon.png",
        },
        8: {
            rare47: "https://media.discordapp.net/attachments/701793335941136464/1286734150849663066/PakistanVulture.png",
            rare46: "https://media.discordapp.net/attachments/701793335941136464/1286730610446041212/PakistanToucan.png",
            rare45: "https://media.discordapp.net/attachments/701793335941136464/1286733633834713222/PakistanMacaw.png",
        },
        7: {
            rare44: "https://media.discordapp.net/attachments/701793335941136464/1286734722700935188/kds2.png",
            rare29: "https://media.discordapp.net/attachments/701793335941136464/1286734722113863712/TheSnowgirl.png",
            rare28: "https://media.discordapp.net/attachments/701793335941136464/1286734722369851525/TheSnowman.png",
            rare27: "https://media.discordapp.net/attachments/701793335941136464/1286734721904283729/TheBigfoot.png",
        },
        6: {
            rare43: "https://media.discordapp.net/attachments/701793335941136464/1286734721174343740/Giraffe_family.png",
            rare42: "https://media.discordapp.net/attachments/701793335941136464/1286734721425866884/WhiteGiraffe.png",
            rare41: "https://media.discordapp.net/attachments/701793335941136464/1286734455423242424/BlackRhino.png",
            rare40: "https://media.discordapp.net/attachments/701793335941136464/1286730608113881140/DemonPufferfish.png",
            rare39: "https://media.discordapp.net/attachments/701793335941136464/1286730609326297214/LavaToucan.png",
        },
        5: {
            rare55: "https://media.discordapp.net/attachments/701793335941136464/1288064073644376095/BlackTiger.png",
            rare54: "https://media.discordapp.net/attachments/701793335941136464/1288064073321287711/BlackBear.png",
            rare38: "https://media.discordapp.net/attachments/701793335941136464/1286734721690112000/AquaYeti.png",
            rare37: "https://media.discordapp.net/attachments/701793335941136464/1286734151109705748/PredatorFalcon.png",
            rare36: "https://media.discordapp.net/attachments/701793335941136464/1286734455754457088/GoldenEagle.png",
            rare35: "https://media.discordapp.net/attachments/701793335941136464/1286734456954294352/WhiteRhino.png",
            rare34: "https://media.discordapp.net/attachments/701793335941136464/1286734150342148148/BlackLionCub.png",
            rare33: "https://media.discordapp.net/attachments/701793335941136464/1286734150593675305/BlackLioness.png",
            rare32: "https://media.discordapp.net/attachments/701793335941136464/1286734150128242698/BlackLion.png",
            rare31: "https://media.discordapp.net/attachments/701793335941136464/1286733627601977477/MuskDeer-S2.png",
            rare30: "https://media.discordapp.net/attachments/701793335941136464/1286733625928454275/StinkyPig-S2.png",
        },
        4: {
            rare26: "https://media.discordapp.net/attachments/701793335941136464/1286734058289762485/Girabie.png",
            rare25: "https://media.discordapp.net/attachments/701793335941136464/1286733633268355225/Jackass.png",
            rare24: "https://media.discordapp.net/attachments/701793335941136464/1286734455092023296/BigGoat.png",
            rare23: "https://media.discordapp.net/attachments/701793335941136464/1286734061607452752/WhiteLionCub.png",
            rare22: "https://media.discordapp.net/attachments/701793335941136464/1286734061888606279/WhiteLioness.png",
            rare21: "https://media.discordapp.net/attachments/701793335941136464/1286734061070454784/WhiteLion.png",
            rare20: "https://media.discordapp.net/attachments/701793335941136464/1286734059422093375/WhiteTiger.png",
        },
        3: {
            rare19: "https://media.discordapp.net/attachments/701793335941136464/1286733626628767816/GoldenPheasant.png",
            rare18: "https://media.discordapp.net/attachments/701793335941136464/1286734059053256737/Momaffie_family.png",
            rare17: "https://media.discordapp.net/attachments/701793335941136464/1286734058642210939/Momaffie.png",
            rare16: "https://media.discordapp.net/attachments/701793335941136464/1286733626905464942/MarshDeer-S2.png",
            rare15: "https://media.discordapp.net/attachments/701793335941136464/1286733625592905891/pinkypig-S2.png",
            rare14: "https://media.discordapp.net/attachments/701793335941136464/1286733625265623082/white_dove.png",
            rare13: "https://media.discordapp.net/attachments/701793335941136464/1286734060042977393/BlackManedLion.png",
            rare12: "https://media.discordapp.net/attachments/701793335941136464/1286734060387041394/LionCub.png",
            rare11: "https://media.discordapp.net/attachments/701793335941136464/1286730607287730186/BlackPanther.png",
        },
        2: {
            rare10: "https://media.discordapp.net/attachments/701793335941136464/1286730608390701066/FieryToucan.png",
            rare9: "https://media.discordapp.net/attachments/701793335941136464/1286730609888067654/Leopard.png",
            rare8: "https://media.discordapp.net/attachments/701793335941136464/1286730608680370289/Jaguar.png",
            rare7: "https://media.discordapp.net/attachments/701793335941136464/1286733626133708861/Doe-S2.png",
            rare6: "https://media.discordapp.net/attachments/701793335941136464/1286734060651286589/Lioness.png",
            rare5: "https://media.discordapp.net/attachments/701793335941136464/1286730611494621268/YellowPufferfish.png",
            rare4: "https://media.discordapp.net/attachments/701793335941136464/1286733627836600431/BlueMacaw.png",
        },
        1: {
            rare3: "https://media.discordapp.net/attachments/701793335941136464/1286734456429744221/Markhor.png",
            rare2: "https://media.discordapp.net/attachments/701793335941136464/1286730609045143632/KeelBilledToucan.png",
            rare1: "https://media.discordapp.net/attachments/701793335941136464/1286730607816343573/ChocoToucan.png",
        },
    };

    return thumbnails[rarity]?.[animal] || null;
}

// Define a function to get the description based on rarity
function getDescription(rarity) {
    const descriptions = {
        10: "$get[rrare10]",
        9: "$get[rrare9]",
        8: "$get[rrare8]",
        7: "$get[rrare7]",
        6: "$get[rrare6]",
        5: "$get[rrare5]",
        4: "$get[rrare4]",
        3: "$get[rrare3]",
        2: "$get[rrare2]",
        1: "$get[rrare1]",
        0: "nothing",
    };

    return descriptions[rarity] || "unknown";
}

// Example usage in your code
const rarity = 10; // Replace with dynamic value
const animal = "rare53"; // Replace with dynamic value

const thumbnail = getThumbnail(rarity, animal);
const description = getDescription(rarity);
const raresGroup = { 10: ["$get[rare51]", "$get[rare52]", "$get[rare53]"] };



// You can now replace the repetitive logic in your code with these functions to make it more concise and maintainable.
