import { ForgeFunction } from "@tryforge/forgescript"

export default [
  new ForgeFunction({
    name: "handleChangelog",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[changelog;$jsonGet[$readFile[res/locale/changelog.json];$get[l]]]

    $changelogEmbed
  `
  }),
  new ForgeFunction({
    name: "changelogEmbed",
    code: `
    $addContainer[
      $addTextDisplay[$arrayJoin[changelog;\n]]
    ;$getGlobalVar[defaultColor]]
  `
  })
]
