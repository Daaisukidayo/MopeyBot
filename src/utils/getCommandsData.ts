import { join } from 'path'
import { readFileSync } from "fs"

const filePath = join(process.cwd(), 'res/data/commandsData.json')
export const commandsData = JSON.parse(readFileSync(filePath, 'utf8'))