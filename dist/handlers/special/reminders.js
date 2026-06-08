"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        name: 'handleReminders',
        code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[allReminders;$getGlobalVar[allReminders]]
    $jsonLoad[userReminders;$getUserVar[userReminders]]

    $remindersEmbed
    $newCommandTimeout
  `
    }, {
        name: 'remindersEmbed',
        code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;reminders.title]]
      $addSeparator[Large]

      $arrayForEach[allReminders;reminder;
        $let[hasReminder;$arrayIncludes[userReminders;$env[reminder]]]
        $let[isEnabled;$if[$get[hasReminder];$tl[$get[l];ui;reminders.enabled];$tl[$get[l];ui;reminders.disabled]]]
        $let[style;$if[$get[hasReminder];Success;Danger]]

        $addSection[
          $addTextDisplay[## _$tl[$get[l];data;reminders.$env[reminder]]_]
          $addButton[$env[reminder]-reminder-$authorID;$get[isEnabled];$get[style]]
        ]
      ]
    ;$getGlobalVar[defaultColor]]
  `
    }];
//# sourceMappingURL=reminders.js.map