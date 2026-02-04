export default {
  name: 'weekday',
  code: `
    $return[$js[
      const date = new Date()
      const day = date.getUTCDay()
      day === 0 ? 7 : day
    ]]
  `
}