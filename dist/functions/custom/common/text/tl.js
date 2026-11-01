"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "tl",
    description: "a text from the locale files by its path",
    output: forgescript_1.ArgType.Unknown,
    params: [
        {
            name: "path",
            description: "the path + the language, like 'ui.errors.test.en-US'. w/o the language it's the caller's userProfile one, else the default",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "args",
            description: "values for {0}, {1}... texts also take {0:ord} for ordinals and {0|form|forms} for plurals",
            type: forgescript_1.ArgType.String,
            required: false,
            rest: true,
        },
    ],
    code: `
    $arrayLoad[rawPath;.;$trim[$replace[$trimLines[$env[path]];\n;]]]

    $c[first part = locale file (ui, data...), last = language]
    $let[type;$arrayShift[rawPath]]
    $let[locale;$jsonGet[rawPath;-1]]

    $c[the file and resolved paths are both cached]
    $if[$hasCache[locale;$get[type]]==false;
      $if[$fileExists[res/locale/$get[type].json];
        $setCache[locale;$get[type];$readFile[res/locale/$get[type].json]]
      ;
        $return[❌ invalid locale type ($default[$get[type];undefined])]
      ]
    ]

    $c[a text w/o the language at the end gets the caller's profile one, else the default. a whole group comes back as it is]
    $if[$jsonGet[$getGlobalVar[allLocales];$get[locale]]==;
      $if[$jsonGet[$getCache[locale;$get[type]];$spread[$arrayJoin[rawPath;.];.];$getGlobalVar[defaultLocale]]!=;
        $let[locale;$default[$env[userProfile;language];$getGlobalVar[defaultLocale]]]
        $arrayPush[rawPath;$get[locale]]
      ]
    ]

    $let[path;$arrayJoin[rawPath;.]]

    $if[$hasCache[locale;$get[type].$get[path]]==false;
      $setCache[locale;$get[type].$get[path];$jsonGet[$getCache[locale;$get[type]];$spread[$get[path];.]]]
    ]
    $getCache[locale;$get[type].$get[path];value]

    $c[missing text in a known language falls back to the default one (plurals too), logged once per text]
    $let[defaultLocale;$getGlobalVar[defaultLocale]]
    $if[$and[$env[value]==;$get[locale]!=$get[defaultLocale];$jsonGet[$getGlobalVar[allLocales];$get[locale]]!=];
      $if[$hasCache[locale;missing|$get[type].$get[path]]==false;
        $setCache[locale;missing|$get[type].$get[path];true]
        $logger[Warn;No $get[locale] text at $get[type].$get[path]: the $get[defaultLocale] one is shown]
      ]
      $!arrayPop[rawPath]
      $arrayPush[rawPath;$get[defaultLocale]]
      $let[locale;$get[defaultLocale]]
      $let[path;$arrayJoin[rawPath;.]]
      $if[$hasCache[locale;$get[type].$get[path]]==false;
        $setCache[locale;$get[type].$get[path];$jsonGet[$getCache[locale;$get[type]];$spread[$get[path];.]]]
      ]
      $getCache[locale;$get[type].$get[path];value]
    ]

    $if[$env[value]==;
      $return[❌ invalid path ($get[path])]
    ]

    $c[ordinals {0:ord} and plurals {0|form|forms} come out of the text itself, so they go first. Intl picks the form: en needs 2, ru 3]
    $if[$jsonSize[args]>0;
      $jsonLoad[formOfCategory;$objectOf[one;0;two;1;few;1;other;1;many;2;zero;2]]
      $arrayForEach[args;arg;
        $if[$includes[$env[value];{$env[i]:ord}];
          $jsonSet[value;$replace[$env[value];{$env[i]:ord};$advancedOrdinal[$env[arg];$get[locale]]]]
        ]
        $if[$includes[$env[value];{$env[i]|];
          $let[form;$jsonGet[formOfCategory;$pluralRule[$env[arg];$get[locale]]]]
          $createRegex[findForms;{$env[i][|\\][^{}\\]+};g]
          $arrayLoad[tokens;¦;$regexMatch[findForms;$env[value];¦]]
          $arrayForEach[tokens;token;
            $arrayLoad[forms;|;$advancedReplace[$env[token];{$env[i]|;;};]]
            $jsonSet[value;$replace[$env[value];$env[token];$jsonGet[forms;$min[$get[form];$math[$jsonSize[forms] - 1]]]]]
          ;j]
        ]
      ;i]
    ]

    $c[global placeholders, still on the bare text. the prefix is the server's or the default one in DMs]
    $if[$includes[$env[value];{EMOJI};{BLANK};{PREFIX}];
      $jsonSet[value;$advancedReplace[$env[value];{EMOJI};$getGlobalVar[mopecoin];{BLANK};$getGlobalVar[blank];{PREFIX};$getPrefix]]
    ]

    $c[args go in last through a marker each, so a {1} or {PREFIX} typed into one stays as it is]
    $if[$jsonSize[args]>0;
      $arrayForEach[args;arg;$jsonSet[value;$replace[$env[value];{$env[i]};\u0001$env[i]\u0001]];i]
      $arrayForEach[args;arg;$jsonSet[value;$replace[$env[value];\u0001$env[i]\u0001;$replace[$env[arg];\u0001;]]];i]
    ]

    $return[$env[value]]
  `,
});
//# sourceMappingURL=tl.js.map