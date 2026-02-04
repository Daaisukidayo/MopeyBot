export default {
  name: 'timeLeft',
  params: [
    {
      name: 'time',
      required: true
    },
    {
      name: 'designation',
      required: true
    }
  ],
  code: `
    $sendMessage[$channelID;$tl[ui.challenge.timeLeft_$env[designation];<@$get[id]>;$env[time]]]
  `
}