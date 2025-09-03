export default function timeLeft (time, id) {
  return `
    $sendMessage[$channelID;# <@${id}> You have ${time} left!]
  `
}