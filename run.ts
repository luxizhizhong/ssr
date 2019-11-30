#!/usr/bin/env ts-node

/*
** 自动生成 `README.md`
** create by @d1y in 2019-11-30
*/

import * as fs from 'fs'
import * as path from 'path'

const file: string = path.join(__dirname, './readme.md')

let lists: string[] = []

const gh: string = `https://cdn.jsdelivr.net/gh/luxizhizhong/ssr`
const keys: string[] = [
  'bin',
  'andriod',
  'iphone',
  'linux',
  'osx',
  'windows'
]
const append = (): string => {
  let result: string = ``
  const lists: string[] = fs.readdirSync(__dirname)
  lists.forEach(item=> {
    keys.forEach(dir=> {
      if (dir == item) {
        dir = firstLetterUpper(item)
        const subItems: string[] = fs.readdirSync(path.join(__dirname, `./${ item }`))
        let subStr = ``
        if (subItems.length) {
          result += `\n# ${ dir } \n`
          subItems.forEach(line=> {
            subStr += `\n- [${ line }](${ gh }/${ dir }/${ line }) \n`
          })
          result += subStr
        } else {
          // result += `\n_没有可用的_\n`
        }
      }
    })
  })
  return result
}

const firstLetterUpper = (str: string): string=> {
  return str.charAt(0).toUpperCase()+str.slice(1);
}

let text: string = `# is Free World\n [![](https://i.loli.net/2019/11/30/amfEgPbWCixty3U.png)](https://www.vultr.com/?ref=8170694-4F)\n`
lists.push(text)
lists.push(append())
const result = lists.join('\n')
fs.writeFile(file, result, err=> {
  if (!err) {
    console.log('成功')
  }
})
