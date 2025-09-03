export default function settingTagsContent () {
  return `
    $if[$arrayLength[lobbyTags]!=0;
      $arrayMap[lobbyTags;tag;
        $return[$env[allLobbyTagsContent;$env[tag]]]
      ;tagsContent]
    ;
      $arrayLoad[tagsContent; ;None]
    ]
  `
}