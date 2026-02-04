export default {
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
      $!jsonSet[funcCache;allLocales;$getGlobalVar[allLocales]]
    ]

    $let[lang;$function[
      $if[$get[lang]!=;
        $return[$env[funcCache;allLocales;$get[lang];name]]
      ;
        $return[$env[funcCache;allLocales;$env[userProfile;language];name]]
      ]
    ]]

    $jsonLoad[value;$getGlobalVar[$get[type]_$get[lang]]]

    $if[$env[value]==;
      $return[InvalidLanguage:$get[lang]|$env[key]]
    ]

    $loop[$arrayLength[lKeys];
      $jsonLoad[value;$env[value;$env[lKeys;$sub[$env[i];1]]]]
      $if[$env[value]==;
        $return[InvalidKey|$env[key]]
      ]
    ;i;true]


    $if[$env[args]==;
      $return[$env[value]]
    ]

    $loop[$arrayLength[args];
      $let[i;$sub[$env[i];1]]
      $let[arg;$env[args;$get[i]]]
      $!jsonSet[value;$replace[$env[value];{$get[i]};$get[arg];-1]]
      $if[$includes[$env[value];{$get[i]:ord}];
        $!jsonSet[value;$replace[$env[value];{$get[i]:ord};$ordinal[$get[arg]];-1]]
      ]
    ;i;true]

    $!jsonSet[value;$replace[$env[value];{EMOJI};$getGlobalVar[emoji];-1]]
    $!jsonSet[value;$replace[$env[value];{PREFIX};$if[$guildID!=;$getGuildVar[prefix];$getGlobalVar[prefix]];-1]]

    $return[$env[value]]
  `
}
