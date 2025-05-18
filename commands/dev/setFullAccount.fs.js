module.exports = {
  name: "setfullaccount",
  aliases: ["sfa"],
  type: "messageCreate",
  code: `
    $onlyIf[$getUserVar[dev]]
    $jsonLoad[userPacks;$getUserVar[userPacks]]
    $!jsonSet[userPacks;lockedSP;true]
    $!jsonSet[userPacks;storefrontSP;true]
    $!jsonSet[userPacks;goldenSP;true]
    $!jsonSet[userPacks;legacySP;true]
    $!jsonSet[userPacks;halloweenSP;true]
    $!jsonSet[userPacks;landGTSP;true]
    $!jsonSet[userPacks;desertGTSP;true]
    $!jsonSet[userPacks;arcticGTSP;true]
    $!jsonSet[userPacks;oceanGTSP;true]
    $setUserVar[userPacks;$env[userPacks]]
    # ✅ Your account has been set to full account!
  `
}