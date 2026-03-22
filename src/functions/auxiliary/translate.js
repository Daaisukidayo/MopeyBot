export default [{
  name: "tl",
  description: "Returns a text from the locale file based on the provided path in key(s).value format.",
  output: "String",
  params: [
    {
      name: "key",
      description: "The key path to the desired content. First key must be either 'ui' or 'data' to specify the type of locale.",
      required: true,
    },
    {
      name: "args",
      description: "Arguments to replace {PLACEHOLDERS} in the content.",
      required: false,
      rest: true,
    },
  ],
  code: `
    $arrayLoad[lKeys;.;$env[key]]
    $let[type;$dump[$arraySplice[lKeys;0;1];0]]

    $if[$env[funcCache;allLocales]==;
      $jsonSet[funcCache;allLocales;$getGlobalVar[allLocales]]
    ]

    $let[lang;$function[
      $if[$get[lang]!=;
        $return[$env[funcCache;allLocales;$get[lang];name]]
      ]
      $return[$env[funcCache;allLocales;$env[userProfile;language];name]]
    ]]

    $jsonLoad[value;$getGlobalVar[$get[type]_$get[lang]]]

    $if[$env[value]==;
      $return[invalid\_language\_$get[lang]|$env[key]]
    ]

    $loop[$arrayLength[lKeys];
      $jsonLoad[value;$env[value;$env[lKeys;$sub[$env[i];1]]]]
    ;i;true]

    $if[$env[value]==;
      $return[invalid\_key|$env[key]]
    ]

    $if[$arrayLength[args]==0;
      $return[$env[value]]
    ]

    $loop[$arrayLength[args];
      $let[i;$sub[$env[i];1]]
      $let[arg;$env[args;$get[i]]]
      
      $jsonSet[value;$replace[$env[value];{$get[i]};$get[arg];-1]]

      $if[$includes[$env[value];{$get[i]:ord}];
        $jsonSet[value;$replace[$env[value];{$get[i]:ord};$advOrdinal[$get[arg];$get[lang]];-1]]
      ]
      
      $createRegex[findKey;\{$get[i]:([a-z\\]+)\};g]
      $arrayLoad[keysToProcess;,;$regexMatch[findKey;$env[value];,]]
        
      $loop[$arrayLength[keysToProcess];
        $let[currentKey;$replaceRegex[$env[keysToProcess;$sub[$env[j];1]];[{}0-9:\\];g;;-1]]
        $jsonSet[value;$replace[$env[value];{$get[i]:$get[currentKey]};$pluralize[$get[arg];$get[currentKey]];-1]]
      ;j;true]
      
      $deleteRegex[findKey]
    ;i;true]

    $let[__prefix;$function[
      $if[$guildID!=;
        $return[$getGuildVar[prefix]]
      ]
      $return[$getGlobalVar[prefix]]
    ]]

    $jsonSet[value;$replace[$env[value];{EMOJI};$getGlobalVar[emoji];-1]]
    $jsonSet[value;$replace[$env[value];{PREFIX};$get[__prefix];-1]]

    $return[$env[value]]
  `
},{
  name: "pluralize",
  description: "Returns the correct form of a word based on the provided number and language.",
  output: "String",
  params: [
    {
      name: "__number",
      description: "The number to determine the correct form for.",
      required: true
    },
    {
      name: "__key",
      description: "The key for the word to pluralize.",
      required: true
    },
  ],
  code: `    
    $if[$env[funcCache;endingsMap]==;
      $jsonSet[funcCache;endingsMap;$getGlobalVar[endingsMap]]
    ]

    $if[$env[funcCache;endingsMap;$env[__key]]==;
      $return[error\_no\_key\_$env[__key]]
    ]
    
    $let[absN;$math[$abs[$env[__number]] % 100]]
    $let[n1;$math[$get[absN] % 10]]

    $if[$and[$get[absN]>10;$get[absN]<20];
      $return[$env[funcCache;endingsMap;$env[__key];2]]
    ]
    $if[$and[$get[n1]>1;$get[n1]<5];
      $return[$env[funcCache;endingsMap;$env[__key];1]]
    ]
    $if[$get[n1]==1;
      $return[$env[funcCache;endingsMap;$env[__key];0]]
    ]

    $return[$env[funcCache;endingsMap;$env[__key];2]]
  `
}]
