import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "allUserIDs",
  description: "ids of everyone who accepted the rules, read from the saved profiles. oldest MUID first",
  output: ArgType.Json,
  code: `
    $arrayLoad[users]
    $arrayForEach[$searchDB[userProfile];record;
      $jsonLoad[profile;$jsonGet[record;value]]
      $if[$jsonGet[profile;verified];
        $arrayPushJSON[users;$objectOf[id;"$jsonGet[record;id]";muid;$jsonGet[profile;muid]]]
      ]
    ]
    $return[$arrayPluck[$arraySortBy[users;asc;muid];id]]
  `,
})
