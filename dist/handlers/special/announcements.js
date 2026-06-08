"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        name: 'handleAnnouncements',
        code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[locales;$getGlobalVar[allLocales]]
    $let[locale;$env[locales;$env[userProfile;language];name]]
    $jsonLoad[announcement;$readFile[res/locale/announcement.json]]
    $jsonLoad[announce;$env[announcement;$get[locale]]]

    $announcementsEmbed
  `
    }, {
        name: 'announcementsEmbed',
        code: `
    $addContainer[
      $addTextDisplay[$tl[$get[l];ui;announcements.title]]
      $addSeparator[Large]
      $addTextDisplay[$arrayJoin[announce;\n]]
    ;$getGlobalVar[defaultColor]]
  `
    }];
//# sourceMappingURL=announcements.js.map