import { ForgeFunction } from "@tryforge/forgescript"

export default [
  new ForgeFunction({
    name: "handleAnnouncements",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[announce;$jsonGet[$readFile[res/locale/announcement.json];$get[l]]]

    $announcementsEmbed
  `
  }),
  new ForgeFunction({
    name: "announcementsEmbed",
    code: `
    $addContainer[
      $addTextDisplay[$tl[ui.announcements.title.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$arrayJoin[announce;\n]]
    ;$getGlobalVar[defaultColor]]
  `
  })
]
