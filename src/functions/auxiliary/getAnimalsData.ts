export default {
  name: 'getAnimalsData',
  output: "Json",
  code: `
    $return[$readFile[res/data/animals.json]]
  `
}