import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'addCheats',
  deacription: "Adds cheat buttons for a player's play session",
  code: `
    $if[$env[playData]==;$return]
    $if[$and[$env[playData;isDead]==false;$env[userProfile;testerMode]]==false;$return]

    $addActionRow
    $addButton[play_chooseUpgrade-devUpArrow-$authorID;;Success;🔼]
    $addButton[play_chooseUpgrade-devUpdateArrow-$authorID;;Success;🔃]
    $addButton[play_chooseUpgrade-devDownArrow-$authorID;;Success;🔽]
    
  `
})