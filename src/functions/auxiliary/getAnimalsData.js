export default {
  name: 'getAnimalsData',
  code: `
    $return[$readFile[src/json/animals.json]]
  `
}