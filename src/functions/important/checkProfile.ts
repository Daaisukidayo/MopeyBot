export default {
  name: "checkProfile",
  description: "Checks the user's profile for specific conditions.",
  code: `
    $if[$env[userProfile;devMode]==0;
      $onlyIf[$getGlobalVar[botEnabled]]
    ]
    $onlyIf[$env[userProfile;isBanned]!=true]

    $arrayLoad[perms; ;EmbedLinks AttachFiles AddReactions]
    $arrayMap[perms;perm;$return[$env[perm] $if[$hasPerms[$guildID;$botID;$env[perm]];✅;❌]];cnt]
    $onlyIf[$hasPerms[$guildID;$botID;$spread[$arrayJoin[perms;,];,]];
      $newError[I am missing some required permissions!
        $codeBlock[$arrayJoin[cnt;\n]]
      ]
    ]
    $onlyIf[$env[userProfile;acceptedRules];$robotCheck]
    $onlyIf[$env[userProfile;onSlowmode]!=true]
  `
}