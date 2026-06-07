// TODO

export default {
  type: 'clientReady',
  code: `
    $c[
      $jsonLoad[db;$getDB]
    ]
  `
}