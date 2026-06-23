export default [{
  name: "tl",
  description: "Returns a text from the locale file based on the provided path in key(s).value format.",
  output: "Unknown",
  brackets: true,
  params: [
    {
      name: "_path",
      description: "The key path to the desired content, e.g. 'ui.errors.test.en-US'.",
      type: "String",
      required: true,
      rest: false,
    },
    {
      name: "_args",
      description: "Arguments to replace {PLACEHOLDERS} in the content.",
      type: "Unknown",
      required: false,
      rest: true,
    },
  ],
  code: `
    $c[Parse the full dot-separated path into an array]
    $arrayLoad[rawPath;.;$trim[$replace[$trimLines[$env[_path]];\n;]]]

    $c[Extract the first element as the file type (e.g., 'ui') and remove it from the array]
    $let[type;$env[$arraySplice[rawPath;0;1];0]]

    $c[Rebuild the remaining array elements back into a clean dotted path string]
    $let[path;$arrayJoin[$env[rawPath];.]]

    $c[Check if the entire locale JSON file is cached; if not, read and cache it]
    $if[$hasCache[locale;$get[type]]==false;
      $if[$fileExists[res/locale/$get[type].json];
        $setCache[locale;$get[type];$readFile[res/locale/$get[type].json]]
      ;
        $return[❌ invalid locale type ($default[$get[type];undefined])]
      ]
    ]

    $c[Check if this specific string path is already cached; if not, resolve it from the JSON cache and store it]
    $if[$hasCache[locale;$get[path]]==false;
      $setCache[locale;$get[path];$env[$getCache[locale;$get[type]];$spread[$get[path];.]]]
    ]
    $c[Load the final string into the 'value' environment variable]
    $getCache[locale;$get[path];value]

    $c[Return an error if the path resolved to nothing]
    $if[$env[value]==;
      $return[❌ invalid path ($get[path])]
    ]

    $c[Process dynamic arguments and placeholders inside the retrieved text]
    $if[$arrayLength[_args]>0;
      $c[Get the last element as the target locale (e.g., 'en-US')]
      $let[locale;$arrayAt[rawPath;-1]]
      
      $loop[$arrayLength[_args];
        $c[Creating index variable]
        $let[i;$sub[$env[i];1]]
        $c[Saving the current argument]
        $let[arg;$env[_args;$get[i]]]
        
        $c[Replace standard index placeholders like {0}, {1}]
        $jsonSet[value;$replace[$env[value];{$get[i]};$get[arg]]]

        $c[Handle ordinal numbers placeholder like {0:ord}]
        $if[$includes[$env[value];{$get[i]:ord}];
          $jsonSet[value;$replace[$env[value];{$get[i]:ord};$advOrdinal[$get[arg];$get[locale]]]]
        ]
        
        $c[Find and process pluralization keys like {0:keyName}]
        $createRegex[findKey;\{$get[i]:([a-z\\]+)\};g]
        $arrayLoad[keysToProcess;,;$regexMatch[findKey;$env[value];,]]
        
        $if[$arrayAt[keysToProcess;0]!=;
          $loop[$arrayLength[keysToProcess];
            $let[currentKey;$replaceRegex[$env[keysToProcess;$sub[$env[j];1]];[{}0-9:\\];g;]]
            $jsonSet[value;$replace[$env[value];{$get[i]:$get[currentKey]};$pluralize[$get[arg];$get[currentKey];$get[locale]]]]
          ;j;true]
        ]
      ;i;true]
    ]

    
    $c[Only look up prefixes and perform advanced replacement if global placeholders are present]
    $if[$includes[$env[value];{EMOJI};{BLANK};{PREFIX}];
      $c[Determine the correct bot prefix depending on whether it is a guild or DMs context]
      $let[prefix;$function[
        $if[$guildID!=;
          $return[$getGuildVar[prefix]]
        ]
        $return[$getGlobalVar[prefix]]
      ]]
  
      $c[Replace system tags with their actual global/guild variable values]
      $jsonSet[value;$advancedReplace[$env[value];{EMOJI};$getGlobalVar[mopecoin];{BLANK};$getGlobalVar[blank];{PREFIX};$get[prefix]]]
    ]

    $c[Return the final formatted and translated string]
    $return[$env[value]]
  `
},{
  name: "pluralize",
  description: "Returns the correct form of a word based on the provided number, key and language.",
  output: "String",
  params: [
    {
      name: "_number",
      description: "The number to determine the correct form for.",
      type: "Number",
      required: true,
      rest: false,
    },
    {
      name: "_key",
      description: "The key for the word to pluralize.",
      type: "String",
      required: true,
      rest: false,
    },
    {
      name: "_locale",
      description: "The locale to use for pluralization.",
      type: "String",
      required: true,
      rest: false,
    },
  ],
  code: `
    $c[Load the plural endings map from global variables]
    $jsonLoad[endingsMap;$getGlobalVar[endingsMap]]
    $let[locale;$env[_locale]]
    $let[key;$env[_key]]

    $c[Verify if the requested pluralization key exists for the current locale]
    $if[$env[endingsMap;$get[locale];$get[key]]==;
      $return[❌ invalid key ($get[key])]
    ]
    
    $c[Calculate absolute values modulo 100 and modulo 10 to determine plural forms]
    $let[absN;$math[$abs[$env[_number]] % 100]]
    $let[n1;$math[$get[absN] % 10]]

    $c[Rule for numbers 11-19 (e.g., 5-19 items -> Form index 2)]
    $if[$and[$get[absN]>10;$get[absN]<20];
      $return[$env[endingsMap;$get[locale];$get[key];2]]
    ]
    $c[Rule for numbers ending in 2, 3, 4 except 12-14 (e.g., 2-4 items -> Form index 1)]
    $if[$and[$get[n1]>1;$get[n1]<5];
      $return[$env[endingsMap;$get[locale];$get[key];1]]
    ]
    $c[Rule for numbers ending in 1 except 11 (e.g., 1 item -> Form index 0)]
    $if[$get[n1]==1;
      $return[$env[endingsMap;$get[locale];$get[key];0]]
    ]

    $c[Fallback rule for all other numbers (Form index 2)]
    $return[$env[endingsMap;$get[locale];$get[key];2]]
  `
}]