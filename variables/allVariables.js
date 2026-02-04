import { userVariables } from './user.js'
import { guildVariables } from './guild.js'
import { specialVariables } from './special.js'
import { configVariables } from './config.js'
import { timeoutTimeVariables } from './timeoutTime.js'
import { helpVariables } from './command/help.js'
import { kingDragonVariables } from './command/kingDragon.js'
import { historyVariables } from './command/history.js'
import { playVariables } from './command/play.js'
import { raretryVariables } from './command/raretry.js'
import { raretryrunVariables } from './command/raretryrun.js'
import { shopVariables } from './command/shop.js'
import { challengeVariables } from './command/challenge.js'
import { hlsimulatorVariables } from './command/hlsimulator.js'

export const allVariables = Object.assign(
  {}, 
  userVariables, 
  guildVariables,
  specialVariables,
  configVariables,
  timeoutTimeVariables,
  helpVariables,
  kingDragonVariables,
  historyVariables,
  playVariables,
  raretryVariables,
  raretryrunVariables,
  shopVariables,
  challengeVariables,
  hlsimulatorVariables,
)