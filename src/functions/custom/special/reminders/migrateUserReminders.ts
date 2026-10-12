import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "migrateUserReminders",
  code: `
    $if[$getGlobalVar[userRemindersMigrated;false];$return]

    $arrayForEach[$getGlobalVar[allUserIDs];id;
      $jsonLoad[userReminders;$getUserVar[userReminders;$env[id]]]
      $if[$arraySome[userReminders;reminder;$jsonType[reminder]==string];
        $setUserVar[userReminders;$arrayUnique[$arrayMap[userReminders;reminder;$return[$env[reminder]]]];$env[id]]
      ]
    ]

    $setGlobalVar[userRemindersMigrated;true]
  `
})
