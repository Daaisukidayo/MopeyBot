import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "tl",
  description: "Returns a text from the locale file based on the provided path in key(s).value format.",
  output: ArgType.Unknown,
  params: [
    {
      name: "_path",
      description: "The key path to the desired content, e.g. 'ui.errors.test.en-US'.",
      type: ArgType.String,
    },
    {
      name: "_args",
      description: "Arguments to replace {PLACEHOLDERS} in the content.",
      type: ArgType.String,
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
      
      $forOf[_args;arg;
        $c[Replace standard index placeholders like {0}, {1}]
        $jsonSet[value;$replace[$env[value];{$env[i]};$env[arg]]]

        $c[Handle ordinal numbers placeholder like {0:ord}]
        $if[$includes[$env[value];{$env[i]:ord}];
          $jsonSet[value;$replace[$env[value];{$env[i]:ord};$advancedOrdinal[$env[arg];$get[locale]]]]
        ]
        
        $c[Find and process pluralization keys like {0:keyName}]
        $createRegex[findKey;\{$env[i]:([a-z\\]+)\};g]
        $arrayLoad[keysToProcess;,;$regexMatch[findKey;$env[value];,]]
        
        $if[$arrayAt[keysToProcess;0]!=;
          $forOf[keysToProcess;key;
            $let[currentKey;$replaceRegex[$env[key];[{}0-9:\\];g;]]
            $jsonSet[value;$replace[$env[value];{$env[i]:$get[currentKey]};$pluralize[$env[arg];$get[currentKey];$get[locale]]]]
          ;j]
        ]
      ;i]
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
})