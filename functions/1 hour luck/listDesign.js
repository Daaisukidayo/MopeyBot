export default {
  name: 'listDesign',
  params: [{ "name": "arrayName", "required": false }],
  code: `
    $let[arrayName;$default[$env[arrayName];content]]
    $addMediaGallery[$addMediaItem[https://i.postimg.cc/65z7tRMd/upperRow.png]]
    $addTextDisplay[# $arrayJoin[$get[arrayName];\n# ]]
    $addMediaGallery[$addMediaItem[https://i.postimg.cc/yY7JMny1/lowerRow.png]]
  `
}