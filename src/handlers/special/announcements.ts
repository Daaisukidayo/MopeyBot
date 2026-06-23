export default [{
  name: 'handleAnnouncements',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[announce;$env[$readFile[res/locale/announcement.json];$get[l]]]

    $announcementsEmbed
  `
},{
  name: 'announcementsEmbed',
  code: `
    $addContainer[
      $addTextDisplay[$tl[ui.announcements.title.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$arrayJoin[announce;\n]]
    ;$getGlobalVar[defaultColor]]
  `
}]