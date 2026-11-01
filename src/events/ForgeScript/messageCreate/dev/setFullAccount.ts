import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "setfullaccount",
  aliases: ["sfa"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$isDev]

    $!jsonSet[userProfile;user_packs;$arrayPluck[$getGlobalVar[shopItems];id]]
    $callMethod[userProfile;save]
    $jsonLoad[userPacks;$jsonGet[userProfile;user_packs]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $!grantPackSkins[userSkins;userPacks]
    $setUserVar[userSkins;$env[userSkins]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## ✅ Successfully added every bundle into your account!]
    ;$getGlobalVar[defaultColor]]
  `,
})
