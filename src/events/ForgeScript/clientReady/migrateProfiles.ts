import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $c[one-time move of every saved profile to UserProfile. once a start logs 0 moved, drop this file and upgradeProfile]
    $let[moved;0]
    $arrayForEach[$searchDB[userProfile];record;
      $let[id;$jsonGet[record;id]]
      $jsonLoad[profile;$jsonGet[record;value]]
      $if[$isInstance[profile]==false;
        $upgradeProfile[profile;$get[id]]
        $new[fresh;UserProfile;$get[id]]
        $objectDefaults[profile;$env[fresh]]
        $setUserVar[userProfile;$env[profile];$get[id]]
        $deleteUserVar[dailyStreak;$get[id]]
        $deleteUserVar[caughtRaresInRaretry;$get[id]]
        $deleteUserVar[caughtRaresInRaretryrun;$get[id]]
        $letSum[moved;1]
      ]
    ]
    $logger[Info;Moved $get[moved] profiles to UserProfile]

    $c[clientReady cmds run side by side, so the refund goes here to see only class profiles]
    $refundMayBundle
    $dropRemovedSkins
  `,
})
