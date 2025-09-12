export default {
  name: 'showTime',
  params: [{ 
      "name": "ID", 
      "required": false 
    }],
  code: `
    $let[ID;$default[$env[ID];$authorID]]
    $let[T;$getUservar[1htime|$channelID;$get[ID]]]
    $return[⁘ Time: \`$parseDigital[$get[T]000]\`]
  `
}