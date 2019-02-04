# babel-microtest

[![Build Status](https://travis-ci.org/harrysolovay/babel-microtest.svg?branch=master)](https://travis-ci.org/harrysolovay/babel-microtest)

`babel-microtest` is a way of checking that your Babel 7 presets/plugins transform code as expected. It was created to solve **2 key problems** relating to plugin development:

1. interoperability with any testing framework
2. code comparison (avoiding test failure over negligible differences such as semicolons and line breaks)

## Installation

```shell
$ npm install babel-microtest
```

## Usage

`my-test.js`

```js
// use whatever your favorite testing framework (this demo uses Ava)
import test from 'ava'

// import the lib
import createTest from 'babel-microtest'

// test options (in this case, we're gonna test 'babel-plugin-implicit-return'):
const options = {
  plugins: ['implicit-return'], // or import and pass the plugin directly
}

// create the test instance
const implicitReturnTest = createTest(options)

// using Ava
test('implicit return test title', t => {
  implicitReturnTest(
    {
      source: `
        function add(a, b) {
          a + b
        }
      `,
      expected: `
        function add(a, b) {
          return a + b
        }
      `,
    },
    t,
  )
})

// ^ we pass `t` as the 2nd argument, but could substitute it with any
// object containing the testing framework's pass and fail fns
```
