"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "tl",
    description: "Returns a text from the locale file based on the provided path in key(s).value format.",
    output: forgescript_1.ArgType.Unknown,
    params: [
        {
            name: "path",
            description: "The key path to the desired content, e.g. 'ui.errors.test.en-US'.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "args",
            description: "Arguments to replace {PLACEHOLDERS} in the content.",
            type: forgescript_1.ArgType.String,
            required: false,
            rest: true,
        },
    ],
    code: `
    $arrayLoad[rawPath;.;$trim[$replace[$trimLines[$env[path]];\n;]]]

    $c[The first part is the locale file (ui, data...)]
    $let[type;$arrayShift[rawPath]]

    $let[path;$arrayJoin[rawPath;.]]

    $c[Both the file and each resolved path are cached]
    $if[$hasCache[locale;$get[type]]==false;
      $if[$fileExists[res/locale/$get[type].json];
        $setCache[locale;$get[type];$readFile[res/locale/$get[type].json]]
      ;
        $return[❌ invalid locale type ($default[$get[type];undefined])]
      ]
    ]

    $if[$hasCache[locale;$get[type].$get[path]]==false;
      $setCache[locale;$get[type].$get[path];$jsonGet[$getCache[locale;$get[type]];$spread[$get[path];.]]]
    ]
    $getCache[locale;$get[type].$get[path];value]

    $if[$env[value]==;
      $return[❌ invalid path ($get[path])]
    ]

    $if[$jsonSize[args]>0;
      $c[The last part is the language]
      $let[locale;$jsonGet[rawPath;-1]]
      
      $arrayForEach[args;arg;
        $c[{0}, {1}...]
        $jsonSet[value;$replace[$env[value];{$env[i]};$env[arg]]]

        $c[Ordinals: {0:ord}]
        $if[$includes[$env[value];{$env[i]:ord}];
          $jsonSet[value;$replace[$env[value];{$env[i]:ord};$advancedOrdinal[$env[arg];$get[locale]]]]
        ]
        
        $c[Plurals: {0:keyName}]
        $createRegex[findKey;{$env[i]:([a-z\\]+)};g]
        $arrayLoad[keysToProcess;,;$regexMatch[findKey;$env[value];,]]
        
        $if[$jsonGet[keysToProcess;0]!=;
          $arrayForEach[keysToProcess;key;
            $let[currentKey;$replaceRegex[$env[key];[{}0-9:\\];g;]]
            $jsonSet[value;$replace[$env[value];{$env[i]:$get[currentKey]};$pluralize[$env[arg];$get[currentKey];$get[locale]]]]
          ;j]
        ]
      ;i]
    ]

    
    $if[$includes[$env[value];{EMOJI};{BLANK};{PREFIX}];
      $c[Global placeholders. The prefix is the server's, or the global one in DMs]
      $jsonSet[value;$advancedReplace[$env[value];{EMOJI};$getGlobalVar[mopecoin];{BLANK};$getGlobalVar[blank];{PREFIX};$getPrefix]]
    ]

    $return[$env[value]]
  `,
});
//# sourceMappingURL=tl.js.map