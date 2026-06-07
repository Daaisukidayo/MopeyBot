export default {
  name: 'setNewTier',
  code: `
    $if[$env[playData]==;$return]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]
    $let[XP;$env[playData;XP]]
    $loop[17;
      $let[value1;$env[xpPerTier;$env[i];0]]
      $let[value2;$math[$env[xpPerTier;$env[i];1] - 1]]

      $if[$inRange[$get[XP];$get[value1];$get[value2]];
        $!jsonSet[playData;tier;$env[i]]
        $break
      ]
    ;i;true]
  `
}