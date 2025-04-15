module.exports = [{
  name: 'raretryRun',
  type: 'messageCreate',
  code: `

    $onlyIf[1==2]
    $reply

    $callFunction[checking;]
    $let[cdTime;10s]
    $callFunction[cooldown;$get[cdTime]]

    $arrayLoad[globalChances;,;100,250,250,300,300,100,10000,3000,3000,700,500,500,500,10000,3000,3000,3000,3000,3000,250,250,250,10000,10000,250,250,250,1000,1000,1000,1000,1000,1000,1000,1000,1000,4000,4000,10000,3000,700,700,1000,1000,5000,5000,5000,700,700,600,10,10,10,2000,2000,1000,1000]
    $arrayLoad[animalsChances;,;]


$optOff[

  $c[+    TIER 17    ]

    $var[lkd;1000]
    $var[rlkd;1==$random[1;$sum[1;$var[lkd]]]]
    $var[rarelkd;King Dragon by luck <:kingdragonseason2:1280238249360494825> 🍀🍀]

  $c[+    TIER 15    ]

    $var[smans;2000]
    $var[rlsgirl;1==$random[1;$sum[1;$var[smans]]]]
    $var[rarelsgirl;The Snowgirl by luck <:TheSnowgirl:1284570612018315346> 🍀🍀]

    $var[rlsman;1==$random[1;$sum[1;$var[smans]]]]
    $var[rarelsman;The Snowman by luck <:TheSnowman:1284570594075218014> 🍀🍀]

    $var[lbfoot;1000]
    $var[rlbfoot;1==$random[1;$sum[1;$var[lbfoot]]]]
    $var[rarelbfoot;The Big Foot by luck <:TheBigfoot:1285617256562425967> 🍀🍀]

    $var[shops;10]
    $var[rssgirl;1==$random[1;$sum[1;$var[shops]]]]
    $var[raressgirl;The Snowgirl <:TheSnowgirl:1284570612018315346>]

    $var[rssman;1==$random[1;$sum[1;$var[shops]]]]
    $var[raressman;The Snowman <:TheSnowman:1284570594075218014>]

    $var[rsbfoot;1==$random[1;$sum[1;$var[shops]]]]
    $var[raresbfoot;The Big Foot <:TheBigfoot:1285617256562425967>]




    $var[ayeti;600]
    $var[rayeti;25>=$random[1;$sum[1;$var[ayeti]]]]
    $var[rareayeti;Aqua Yeti <:AquaYeti:1284570581093711914> 🍀]

  $c[+    TIER 13    ]

    $var[wgirafs;700]
    $var[rgiraffamily;5>=$random[1;$sum[1;$var[wgirafs]]]]
    $var[raregiraffamily;Giraffe Family <:Giraffe_family:1284570523786936450> 🍀]

    $var[rwgiraf;20>=$random[1;$sum[1;$var[wgirafs]]]]
    $var[rarewgiraf;White Giraffe <:WhiteGiraffe:1284570509589352478> 🍀]


  $c[+    TIER 12    ]

    $var[eagles;5000]
    $var[rgseagle;1==$random[1;$sum[1;$var[eagles]]]]
    $var[raregseagle;Greater Spotted Eagle <:GoldenShahbaz:1284568382850727997> 🍀🍀🍀🍀]

    $var[rheagle;1==$random[1;$sum[1;$var[eagles]]]]
    $var[rareheagle;Harpy Eagle <:Shahbaz:1284568371043635352> 🍀🍀🍀🍀]

    $var[rgeagle;28>=$random[1;$sum[1;$var[eagles]]]]
    $var[raregeagle;Golden Eagle <:GoldenEagle:1284568352404279326> 🍀]


    $var[rhinos;1000]
    $var[rbrhino;2>=$random[1;$sum[1;$var[rhinos]]]]
    $var[rarebrhino;Black Rhino <:BlackRhino:1284568536362127493> 🍀]

    $var[rwrhino;4>=$random[1;$sum[1;$var[rhinos]]]]
    $var[rarewrhino;White Rhino <:WhiteRhino:1284568524806684724>]


    $var[goats;700]
    $var[rbgoat;15>=$random[1;$sum[1;$var[goats]]]]
    $var[rarebgoat;Big Goat <:BigGoat:1284568654092173404>]

    $var[rmarkh;600>=$random[1;$sum[1;$var[goats]]]]
    $var[raremarkh;Markhor <:Markhor:1284568638170595459>]



  $c[+    TIER 11    ]

    $var[ussrvult;10000]
    $var[russrvult;1==$random[1;$sum[1;$var[ussrvult]]]]
    $var[rareussrvult;USSR Vulture <:USSR_VultureS2:1288058686241243157> 🍀🍀🍀🍀🍀]

    $var[pvult;3000]
    $var[rpvult;1==$random[1;$sum[1;$var[pvult]]]]
    $var[rarepvult;Pakistan Vulture <:PakistanVulture:1284568287971377233> 🍀🍀🍀]


    $var[falcs;4000]
    $var[rshaheen;1==$random[1;$sum[1;$var[falcs]]]]
    $var[rareshaheen;Shaheen <:ShaheenFalcon:1284568268493033533> 🍀🍀🍀🍀]

    $var[rpredator;50>=$random[1;$sum[1;$var[falcs]]]]
    $var[rarepredator;Predator <:PredatorFalcon:1284568255599476786>]


    $var[lions;1000]
    $var[rblion;1==$random[1;$sum[1;$var[lions]]]]
    $var[rareblion;Black Lion <:BlackLion:1284568143435661374> 🍀🍀]

    $var[rwlion;5>=$random[1;$sum[1;$var[lions]]]]
    $var[rarewlion;White Lion <:WhiteLion:1284568130668199966>]

    $var[rbmlion;14>=$random[1;$sum[1;$var[lions]]]]
    $var[rarebmlion;Black-Maned Lion <:BlackManedLion:1284568114562076903>]

    $var[rbless;1==$random[1;$sum[1;$var[lions]]]]
    $var[rarebless;Black Lioness <:BlackLioness:1284568191569235999> 🍀🍀]

    $var[rwless;5>=$random[1;$sum[1;$var[lions]]]]
    $var[rarewless;White Lioness <:WhiteLioness:1284568171931766927>]

    $var[rless;114>=$random[1;$sum[1;$var[lions]]]]
    $var[rareless;Lioness <:Lioness:1284568161206800505>]

    $var[rblcub;1==$random[1;$sum[1;$var[lions]]]]
    $var[rareblcub;Black Lion Cub <:BlackLionCub:1284568232950366290> 🍀🍀]

    $var[rwlcub;5>=$random[1;$sum[1;$var[lions]]]]
    $var[rarewlcub;White Lion Cub <:WhiteLionCub:1284568220644409386>]

    $var[rlc;54>=$random[1;$sum[1;$var[lions]]]]
    $var[rarelc;Lion Cub <:LionCub:1284568208082341929>]


  $c[+    TIER 10    ]

    $var[bearandtiger;250]
    $var[rbbear;10>=$random[1;$sum[1;$var[bearandtiger]]]]
    $var[rarebbear;Black Bear <:BlackBear:1288058731363569684>]

    $var[rbtiger;1==$random[1;$sum[1;$var[bearandtiger]]]]
    $var[rarebtiger;Black Tiger <:BlackTiger:1288058719082643526> 🍀]

    $var[rwtiger;15>=$random[1;$sum[1;$var[bearandtiger]]]]
    $var[rarewtiger;White Tiger <:WhiteTiger:1284568061474508810>]

  $c[+    TIER 9    ]

    $var[puffs;10000]
    $var[rdfish;16>=$random[1;$sum[1;$var[puffs]]]]
    $var[raredfish;Demonfish <:DemonPufferfish:1284567803596116047> 🍀🍀]

    $var[rypfish;1650>=$random[1;$sum[1;$var[puffs]]]]
    $var[rareypfish;Yellow Pufferfish <:YellowPufferfish:1284567779156168846>]




    $var[bigcats;250]
    $var[rbpanther;1==$random[1;$sum[1;$var[bigcats]]]]
    $var[rarebpanther;Black Panther <:BlackPanther:1284567767764177028> 🍀]

    $var[rleo;4>=$random[1;$sum[1;$var[bigcats]]]]
    $var[rareleo;Leopard <:Leopard:1284567751641530579>]

    $var[rjag;5>=$random[1;$sum[1;$var[bigcats]]]]
    $var[rarejag;Jaguar <:Jaguar:1284567739440300052>]


    $var[ussrtoucan;10000]
    $var[russrtouc;1==$random[1;$sum[1;$var[ussrtoucan]]]]
    $var[rareussrtouc;USSR Toucan <:USSR_ToucanS2:1288058651075940382> 🍀🍀🍀🍀🍀]

    $var[toucans;3000]
    $var[rptouc;1==$random[1;$sum[1;$var[toucans]]]]
    $var[rareptouc;Pakistan Toucan <:PakistanToucan:1284567718351077386> 🍀🍀🍀]

    $var[rltouc;12>=$random[1;$sum[1;$var[toucans]]]]
    $var[rareltouc;Lava Toucan <:LavaToucan:1284567706171080725> 🍀]

    $var[rftouc;300>=$random[1;$sum[1;$var[toucans]]]]
    $var[rareftouc;Fiery Toucan <:FieryToucan:1284567688781238323>]

    $var[rkbtouc;600>=$random[1;$sum[1;$var[toucans]]]]
    $var[rarekbtouc;Keel-Billed Toucan <:KeelBilledToucan:1284567675212664964>]

    $var[rchtouc;900>=$random[1;$sum[1;$var[toucans]]]]
    $var[rarechtouc;Choco Toucan <:ChocoToucan:1284567662353059971>]


  $c[+    TIER 8    ]

    $var[girafs;500]
    $var[rgirabie;10>=$random[1;$sum[1;$var[girafs]]]]
    $var[raregirabie;Girabie <:Girabie:1284567631956807701>]

    $var[rmomaffamily;25>=$random[1;$sum[1;$var[girafs]]]]
    $var[raremomaffamily;Momaffie Family <:Momaffie_family:1284567618627571896>]

    $var[rmomaf;50>=$random[1;$sum[1;$var[girafs]]]]
    $var[raremomaf;Momaffie <:Momaffie:1284567606422147202>]


  $c[+    TIER 7    ]

    $var[ussrcaw;10000]
    $var[russrcaw;1==$random[1;$sum[1;$var[ussrcaw]]]]
    $var[rareussrcaw;USSR Macaw <:USSR_MacawS2:1288058610655690804> 🍀🍀🍀🍀🍀]

    $var[caw;3000]
    $var[rpcaw;1==$random[1;$sum[1;$var[caw]]]]
    $var[rarepcaw;Pakistan Macaw <:pakistan_macaw:1284540970876145704> 🍀🍀🍀]

    $var[rbcaw;300>=$random[1;$sum[1;$var[caw]]]]
    $var[rarebcaw;Blue Macaw <:blue_macaw:1284540918648541287>]

    $var[jackass;700]
    $var[rjackass;10>=$random[1;$sum[1;$var[jackass]]]]
    $var[rarejackass;Jackass <:Jackass:1284567568299851918>]


  $c[+    TIER 5    ]  

    $var[deers;300]
    $var[rmuskdeer;1==$random[1;$sum[1;$var[deers]]]]
    $var[raremuskdeer;Musk Deer <:musk_deer:1284540790583984139> 🍀]

    $var[rmarshdeer;3>=$random[1;$sum[1;$var[deers]]]]
    $var[raremarshdeer;Marsh Deer <:marsh_deer:1284520894894702788>]

    $var[rdoe;60>=$random[1;$sum[1;$var[deers]]]]
    $var[raredoe;Doe <:doe:1284520854276804680>]

    $var[gph;100]
    $var[rgph;5>=$random[1;$sum[1;$var[gph]]]]
    $var[raregph;Golden Pheasant <:GoldenPheasant:1285692782765408360>]

  $c[+    TIER 4    ]

    $var[pigs;250]
    $var[rspig;1==$random[1;$sum[1;$var[pigs]]]]
    $var[rarespig;Stinky Pig <:stinky_pig:1284520753793863831> 🍀]

    $var[rppig;25>=$random[1;$sum[1;$var[pigs]]]]
    $var[rareppig;Pinky Pig <:pinky_pig:1284520701541351454>]

  $c[+    TIER 2    ]

    $var[dove;100]
    $var[rdove;5>=$random[1;$sum[1;$var[dove]]]]
    $var[raredove;White Dove <:WhiteDove:1291258772492255263>]

  $c[+]

]


$var[dev;$getVar[devmode;$authorID]==true]
$var[desc;]

$if[$or[$var[rdove];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raredove]]
$endif
    
$if[$or[$var[rspig];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarespig]]
$endif
  
$if[$or[$var[rppig];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareppig]]
$endif
  
$if[$or[$var[rgph];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raregph]]
$endif  
  
$if[$or[$var[rmarshdeer];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raremarshdeer]]
$endif
  
$if[$or[$var[rdoe];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raredoe]]
$endif

$if[$or[$var[rmuskdeer];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raremuskdeer]]
$endif

$if[$or[$var[rjackass];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarejackass]]
$endif

$if[$or[$var[russrcaw];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareussrcaw]]
$endif
  
$if[$or[$var[rpcaw];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarepcaw]]
$endif
  
$if[$or[$var[rbcaw];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarebcaw]]
$endif
  
$if[$or[$var[rgirabie];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raregirabie]]
$endif
  
$if[$or[$var[rmomaffamily];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raremomaffamily]]
$endif

$if[$or[$var[rmomaf];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raremomaf]]
$endif
  
$if[$or[$var[russrtouc];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareussrtouc]]
$endif

$if[$or[$var[rptouc];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareptouc]]
$endif

$if[$or[$var[rltouc];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareltouc]]
$endif

$if[$or[$var[rftouc];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareftouc]]
$endif

$if[$or[$var[rkbtouc];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarekbtouc]]
$endif

$if[$or[$var[rchtouc];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarechtouc]]
$endif

$if[$or[$var[rbpanther];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarebpanther]]
$endif

$if[$or[$var[rleo];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareleo]]
$endif

$if[$or[$var[rjag];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarejag]]
$endif
  
$if[$or[$var[rdfish];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raredfish]]
$endif

$if[$or[$var[rypfish];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareypfish]]
$endif
  
$if[$or[$var[rbtiger];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarebtiger]]
$endif

$if[$or[$var[rwtiger];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarewtiger]]
$endif
  
$if[$or[$var[rbbear];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarebbear]]
$endif
  
$if[$or[$var[rblion];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareblion]]
$endif

$if[$or[$var[rbless];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarebless]]
$endif

$if[$or[$var[rblcub];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareblcub]]
$endif

$if[$or[$var[rwlion];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarewlion]]
$endif

$if[$or[$var[rwless];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarewless]]
$endif

$if[$or[$var[rwlcub];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarewlcub]]
$endif

$if[$or[$var[rbmlion];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarebmlion]]
$endif

$if[$or[$var[rlc];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarelc]]
$endif

$if[$or[$var[rless];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareless]]
$endif
  
$if[$or[$var[rshaheen];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareshaheen]]
$endif
    
$if[$or[$var[rpredator];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarepredator]]
$endif
  
$if[$or[$var[russrvult];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareussrvult]]
$endif
  
$if[$or[$var[rpvult];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarepvult]]
$endif
  
$if[$or[$var[rbgoat];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarebgoat]]
$endif
    
$if[$or[$var[rmarkh];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raremarkh]]
$endif
  
$if[$or[$var[rbrhino];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarebrhino]]
$endif

$if[$or[$var[rwrhino];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarewrhino]]
$endif
  
$if[$or[$var[rgseagle];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raregseagle]]
$endif

$if[$or[$var[rheagle];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareheagle]]
$endif

$if[$or[$var[rgeagle];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raregeagle]]
$endif
  
$if[$or[$var[rgiraffamily];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raregiraffamily]]
$endif

$if[$or[$var[rwgiraf];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarewgiraf]]
$endif
  
$if[$or[$var[rayeti];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rareayeti]]
$endif
  
$if[$or[$var[rsbfoot];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raresbfoot]]
$endif
  
$if[$or[$var[rlbfoot];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarelbfoot]]
$endif
  
$if[$or[$var[rssman];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raressman]]
$endif
  
$if[$or[$var[rlsman];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarelsman]]
$endif
  
$if[$or[$var[rssgirl];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[raressgirl]]
$endif
  
$if[$or[$var[rlsgirl];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarelsgirl]]
$endif
  
$if[$or[$var[rlkd];$var[dev]]==true]
  $var[desc;$var[desc]$var[n]## $var[rarelkd]]
$endif
  
$if[$var[desc]==]
  $var[desc;$var[n]## no rares]
$endif

$var[clr;228b22]
$var[text;$randomText[You attempted to obtain rares while upgrading from mouse to black dragon, and you received:;You aimed for rares during your evolution from mouse to black dragon, and you got:;You tried to acquire rares as you leveled up from mouse to black dragon, and you received:;While evolving from mouse to black dragon, you sought rares and obtained:;You were hoping for rares while upgrading from mouse to black dragon, and you received:;You attempted to get rares on your journey from mouse to black dragon, and you got:;While progressing from mouse to black dragon, you tried to select rares and got:;You went for rares while evolving from mouse to black dragon, and your result was:]]
$var[msgdesc;# $var[text] $var[desc]]



$color[$var[clr]]
$description[$var[msgdesc]]
$author[$nickname • MUID: $getVar[uid;$authorID]]$authorIcon[$authorAvatar]

`
}]