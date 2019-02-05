import {transform} from '@babel/core'
import {diffSentences} from 'diff'
import 'colors'

// prettier-ignore
const strip = str =>
  str
    .replace(/\r?\n|\r|,| +?/g, '')
    .replace(/"|'/g, "\'")
    .split(';')
    .join('')

const equal = (a, b) => a == b

export default options => {
  const transformWithOptions = source => transform(source, options).code
  return ({source, expected}, {pass, fail}) => {
    const transformed = transformWithOptions(source)
    const processed = [transformed, expected].map(strip)
    equal(...processed)
      ? pass()
      : console.log(
          'Rough diff (stripped of line breaks, whitespace and quotations)\n\n',
          diffSentences(...processed)
            .map(part => {
              const color = part.added ? 'green' : part.removed ? 'red' : 'grey'
              return part.value[color]
            })
            .join('\n'),
        ) || fail()
  }
}
