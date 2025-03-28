module.exports = {
    name: "math",
    type: "messageCreate",
    code: `
    $reply

    $callFunction[checking;]
    $math[$message]`
}