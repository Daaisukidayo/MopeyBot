export default {
  name: 'addCheats',
  code: `
    $if[$env[playData]==;$return]
    $if[$and[$env[playData;isDead]==false;$env[userProfile;testerMode]];;$return]
    $addActionRow
    $addButton[devUpArrow-play-$authorID;;Success;🔼]
    $addButton[devUpdateArrow-play-$authorID;;Success;🔃]
    $addButton[devDownArrow-play-$authorID;;Success;🔽]
    
  `
}