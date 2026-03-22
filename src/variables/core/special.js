export default {
  allUserIDs: [],
  allTesterIDs: [],

  maxID: 0,
  backupLogCount: 0,

  allLocales: [
    {
      name: "EN",
      description: "English"
    },
    {
      name: "RU",
      description: "Русский"
    }
  ],

  styles: ["Success", "Secondary", "Primary", "Danger"],

  timeouts: {},
  intervals: {},

  endingsMap: {
    'e': ['о', 'а', 'ов'],
    'i': ['а', 'и', ''],
    'm': ['', 'а', 'ов'],
    'y': ['я', 'и', 'ей'],
    're': ['ое', 'их', 'их'],
  }
}