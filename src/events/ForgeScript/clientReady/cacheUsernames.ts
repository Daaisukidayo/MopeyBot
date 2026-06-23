export default {
  type: 'clientReady',
  code: `
    $arrayForEach[$getGlobalVar[allUserIDs];id;$username[$env[id]]]
  `
}