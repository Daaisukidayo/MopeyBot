export default function loadGlobalJSON() {
  return `
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $arrayLoad[styles;,;Success,Primary,Danger]
    $jsonLoad[allSettings;
      {
        "hidePoints": "Hide Points",
        "hideRares": "Hide Rares",
        "hideLimit": "Hide Rares Limit",
        "unlimitedRares": "Unlimited Rares",
        "difficulties": "Difficulties"
      }
    ]

    $jsonLoad[allSettingsEntries;$jsonEntries[allSettings]]
  `
}