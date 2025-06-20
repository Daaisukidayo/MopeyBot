module.exports = [
{
  name: "1hlinv",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$mentioned[0]!=;
      $author[✖️ Invalid Arguments!]
      $description[## You must mention user(s)!]
      $color[$getGlobalVar[errorColor]]
    ]
    $arrayLoad[users; ;$messageContent]
    $log[$env[users]]
  `
}]