import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "clearskins",
  aliases: ["cs"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]

    $!jsonSet[userProfile;user_packs;$arrayOf]
    $callMethod[userProfile;save]
    $setUserVar[userSkins;$arrayOf]
    $c[worn skins would stay on the animals otherwise]
    $setUserVar[userWardrobe;$objectOf]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## 🗑️ Removed every bundle and skin from your account!]
    ;$getGlobalVar[defaultColor]]
  `,
})
