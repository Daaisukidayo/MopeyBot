export default {
  name: "announcements",
  aliases: ["announce", "ann", "announcement"],
  type: "messageCreate",
  code: `
    $handleAnnouncements
  `
}