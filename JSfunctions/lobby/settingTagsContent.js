export default function settingTagsContent (defaultArrayName = 'lobbyTags', newArrayName = 'tagsContent') {
  return `
    $if[$arrayLength[${defaultArrayName}]!=0;
      $arrayMap[${defaultArrayName};tag;
        $return[$env[allLobbyTagsContent;$env[tag]]]
      ;${newArrayName}]
    ;
      $arrayLoad[${newArrayName}; ;None]
    ]
  `
}