import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "checkProfile",
  description: "checks the user's profile before a command runs",
  code: `
    $c[bot off = devs only]
    $onlyIf[$or[$isDev;$getGlobalVar[botEnabled]]]
    $onlyIf[$jsonGet[userProfile;banned]!=true]

    $c[list perms only if something's missing]
    $onlyIf[$hasPerms[$guildID;$botID;EmbedLinks;AttachFiles;AddReactions];
      $newError[I am missing some required permissions!
        $codeBlock[$arrayJoin[$arrayMap[$arrayOf[EmbedLinks;AttachFiles;AddReactions];perm;$return[$env[perm] $if[$hasPerms[$guildID;$botID;$env[perm]];✅;❌]]];\n]]
      ]
    ]
    $onlyIf[$jsonGet[userProfile;verified];$robotCheck]
  `,
})
