export default {
  name: 'addCheats',
  code: `
    $if[$env[playData]==;$return]
    $if[$and[$env[playData;isDead]==false;$env[userProfile;testerMode]]==false;$return]

    $addActionRow
    $addButton[play_chooseUpgrade-devUpArrow-$authorID;;Success;🔼]
    $addButton[play_chooseUpgrade-devUpdateArrow-$authorID;;Success;🔃]
    $addButton[play_chooseUpgrade-devDownArrow-$authorID;;Success;🔽]
    
  `
}