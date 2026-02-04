export default {
  type: 'clientReady',
  code: `
    $jsonLoad[locales;$getGlobalVar[allLocales]]

    $arrayForEach[locales;locale;
      $jsonLoad[ui;$readFile[src/locales/$env[locale;name]/ui.json]]
      $jsonLoad[data;$readFile[src/locales/$env[locale;name]/data.json]]
      $setGlobalVar[ui_$env[locale;name];$env[ui]]
      $setGlobalVar[data_$env[locale;name];$env[data]]
      $logger[Info;Cached locale «$env[locale;name]»]
    ]
  `
}