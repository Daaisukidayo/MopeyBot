export default [{
  name: 'handleAnnouncements',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[locales;$getGlobalVar[allLocales]]
    $jsonLoad[announce;$readFile[src/locales/$env[locales;$env[userProfile;language];name]/announce.json]]

    $announcementsEmbed
  `
},{
  name: 'announcementsEmbed',
  code: `
    $addContainer[
      $addTextDisplay[$tl[ui.announcements.title]]
      $addSeparator[Large]
      $addTextDisplay[$arrayJoin[announce;\n]]
    ;$getGlobalVar[defaultColor]]
  `
}]