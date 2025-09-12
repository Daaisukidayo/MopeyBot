import playSnippets from '#snippets/playSnippets.js'
import uniSnippets from '#snippets/universalSnippets.js'

export default [{
  name: "play", 
  type: "messageCreate",
  description: "first time playing",
  code: `
    $reply
    ${playSnippets.loadJSON()}
    ${uniSnippets.checkProfile({addCooldown: false})}

    $onlyIf[$guildID!=;## You can't start the game in DMs!]
    $onlyIf[$env[userProfile;testerMode]]

    $onlyIf[$env[playData;started]==false;
      $description[## You already have an active game session!
      ### $hyperlink[Please end your previous game!;https://discord.com/channels/$env[playData;GuildID]/$env[playData;ChannelID]/$env[playData;MessageID]]]
      $callFunction[embed;error]
      $addActionRow
      $addButton[messagemissing-play-$authorID;Can't find the message;Danger]
    ]
    
    $try[
      $getEmbeds[$env[playData;ChannelID];$env[playData;MessageID]]
    ;
      ${playSnippets.removeAllProgress()}
      
      $jsonLoad[playData;$getGlobalVar[userPlayData]]
      $!jsonSet[playData;started;true]
    ]

    $!jsonSet[playData;tier;1]
    ${uniSnippets.luckGenerator(raresGroupsKey())}
    $setUserVar[allRareAttemptsInfo;$env[allRareAttemptsInfo]]
    ${playSnippets.animalsButtonsGenerator()}
    ${playSnippets.exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]

    $let[msgID;$sendMessage[$channelID;;true]]

    $!jsonSet[playData;MessageID;$get[msgID]]
    $!jsonSet[playData;ChannelID;$channelID]
    $!jsonSet[playData;GuildID;$guildID]
    $!jsonSet[playData;started;true]
    $setUserVar[userPlayData;$env[playData]]
  `
}]

function raresGroupsKey() {
  return JSON.stringify([
    "pigeon|pigeon|whiteDove", 
    "pig|pig|pinkyPig|stinkyPig",
    "deer|deer|doe|marshDeer",
    "reindeer|reindeer|muskDeer",
    "swinehoe|swinehoe|goldenPheasant",
    "donkey|donkey|jackass",
    "macaw|macaw|blueMacaw|rareMacaw",
    "giraffe|giraffe|momaffie|momaffieFamily|girabie",
    "cheetah|cheetah|jaguar|leopard|blackPanther",
    "toucan|toucan|chocoToucan|keelBilledToucan|fieryToucan|lavaToucan|rareToucan",
    "pufferfish|pufferfish|yellowPufferfish|demonPufferfish",
    "bear|bear|blackBear",
    "tiger|tiger|whiteTiger|blackTiger",
    "lion|lion|lioness|lionCub|blackManedLion|whiteLionCub|whiteLioness|whiteLion|blackLionCub|blackLioness|blackLion",
    "falcon|falcon|predator|shaheen",
    "vulture|vulture|rareVulture",
    "rhino|rhino|whiteRhino|blackRhino",
    "baldEagle|baldEagle|goldenEagle|harpyEagle|greaterSpottedEagle",
    "markhor|undefined|markhor|bigGoat",
    "whiteGiraffe|undefined|whiteGiraffe|giraffeFamily",
    "yeti|yeti|aquaYeti",
    "rareBigfoot|undefined|shopBigfoot|rareBigfoot",
    "rareSnowman|undefined|shopSnowman|rareSnowman",
    "rareSnowgirl|undefined|shopSnowgirl|rareSnowgirl",
    "blackDragon|blackDragon|rareKingDragon"
  ]).replaceAll(']', '\\]')
}
