export default { 
  name: "addAuthorDisplay",
  description: "Adds an text display to the embed, showing the author's username and MUID.",
  params: [
    {
      name: "hideUserAvatar",
      type: "Boolean",
      required: false
    }
  ],
  brackets: false,
  code: `
    $let[hideUserAvatar;$nullish[$env[hideUserAvatar];true]]
    $let[authorContent;$function[
      $if[$env[userProfile;acceptedRules];
        $return[# \`$username[$env[userProfile;ID]]#$env[userProfile;MUID]\`]
      ]
      $return[# \`$username[$env[userProfile;ID]]\`]
    ]]

    $if[$get[hideUserAvatar];
      $addSection[
        $addTextDisplay[$get[authorContent]]
        $addThumbnail[$userAvatar[$env[userProfile;ID];4096]]
      ]
    ;
      $addTextDisplay[$get[authorContent]]
    ]
    $addSeparator[Large]
  `
}