export default [{
  name: "tl",
  description: "Returns a text from the locale file based on the provided path in key(s).value format.",
  output: "Unknown",
  params: [
    {
      name: "_locale",
      description: "The locale to use.",
      required: true,
    },
    {
      name: "_type",
      description: "Whether to use specific locale file, e.g. 'ui', 'data'.",
      required: true,
    },
    {
      name: "_path",
      description: "The key path to the desired content, e.g. 'errors.test'.",
      required: true,
    },
    {
      name: "_args",
      description: "Arguments to replace {PLACEHOLDERS} in the content.",
      required: false,
      rest: true,
    },
  ],
  code: `
    $arrayLoad[unwrappedPath;.;$trim[$trimLines[$env[_path]]]]
    $let[type;$trim[$trimLines[$toLowerCase[$env[_type]]]]]
    $let[locale;$trim[$trimLines[$env[_locale]]]]

    $c[
      $if[$and[$isNumber[$get[locale]]==false;$get[locale]!=*];
        $return[❌ invalid locale ($get[locale]) | $env[_path]]
      ]
    ]

    $jsonLoad[allLocales;$getGlobalVar[allLocales]]
    

    $if[$hasCache[$get[type]]==false;
      $if[$fileExists[res/locale/$get[type].json];
        $setCache[$get[type];$readFile[res/locale/$get[type].json]]
      ;
        $return[❌ invalid locale type ($default[$get[type];undefined]) | $env[_path]]
      ]
    ]

    $getCache[$get[type];$get[type]]

    $if[$get[locale]!=*;
      $c[
        $let[locale;$env[allLocales;$get[locale];name]]
      ]
      $arrayPush[unwrappedPath;$get[locale]]
    ]

    $jsonLoad[value;$env[$get[type]]]

    $loop[$arrayLength[unwrappedPath];
      $jsonLoad[value;$env[value;$env[unwrappedPath;$sub[$env[i];1]]]]
    ;i;true]

    $if[$env[value]==;
      $return[❌ invalid path ($env[_path])]
    ]

    $loop[$arrayLength[_args];
      $let[i;$sub[$env[i];1]]
      $let[arg;$env[_args;$get[i]]]
      
      $jsonSet[value;$replace[$env[value];{$get[i]};$get[arg];-1]]

      $if[$includes[$env[value];{$get[i]:ord}];
        $jsonSet[value;$replace[$env[value];{$get[i]:ord};$advOrdinal[$get[arg];$get[locale]];-1]]
      ]
      
      $createRegex[findKey;\{$get[i]:([a-z\\]+)\};g]
      $arrayLoad[keysToProcess;,;$regexMatch[findKey;$env[value];,]]
        
      $loop[$arrayLength[keysToProcess];
        $let[currentKey;$replaceRegex[$env[keysToProcess;$sub[$env[j];1]];[{}0-9:\\];g;;-1]]
        $jsonSet[value;$replace[$env[value];{$get[i]:$get[currentKey]};$pluralize[$get[arg];$get[currentKey]];-1]]
      ;j;true]
      
      $deleteRegex[findKey]
    ;i;true]

    $let[prefix;$function[
      $if[$guildID!=;
        $return[$getGuildVar[prefix]]
      ]
      $return[$getGlobalVar[prefix]]
    ]]

    $jsonSet[value;$advancedReplace[$env[value];{EMOJI};$getGlobalVar[mopecoin];{BLANK};$getGlobalVar[blank];{PREFIX};$get[prefix]]]

    $return[$env[value]]
  `
},{
  name: "pluralize",
  description: "Returns the correct form of a word based on the provided number and language.",
  output: "String",
  params: [
    {
      name: "_number",
      description: "The number to determine the correct form for.",
      required: true
    },
    {
      name: "_key",
      description: "The key for the word to pluralize.",
      required: true
    },
  ],
  code: `
    $jsonLoad[endingsMap;$getGlobalVar[endingsMap]]

    $if[$env[endingsMap;$get[locale];$env[_key]]==;
      $return[❌ no key ($env[_key])]
    ]
    
    $let[absN;$math[$abs[$env[_number]] % 100]]
    $let[n1;$math[$get[absN] % 10]]

    $if[$and[$get[absN]>10;$get[absN]<20];
      $return[$env[endingsMap;$get[locale];$env[_key];2]]
    ]
    $if[$and[$get[n1]>1;$get[n1]<5];
      $return[$env[endingsMap;$get[locale];$env[_key];1]]
    ]
    $if[$get[n1]==1;
      $return[$env[endingsMap;$get[locale];$env[_key];0]]
    ]

    $return[$env[endingsMap;$get[locale];$env[_key];2]]
  `
}]
