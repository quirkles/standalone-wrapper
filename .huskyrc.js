const tasks = arr => arr.join(' && ')

const lint = 'yarn lint'
const compileCheck = 'yarn compile-check'
const unitTests = 'ng test --watch false --browsers ChromeHeadless --codeCoverage'

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      lint,
      compileCheck,
      unitTests
    ])
  }
}
