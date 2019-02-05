import test from 'ava'
import createTest from './src'

const reactRequireTest = createTest({
  plugins: ['@babel/plugin-syntax-jsx', 'react-require'],
})

test('react-require', t => {
  reactRequireTest(
    {
      source: `
        const MyComponent = (a, b) =>
          <div>JSX</div>
      `,
      expected: `
        import React from 'react'
        const MyComponent = (a, b) =>
          <div>JSX</div>
      `,
    },
    t,
  )
})

const implicitReturnTest = createTest({plugins: ['implicit-return']})

test('implicit-return', t => {
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

const implicitFunctionTest = createTest({plugins: ['implicit-function']})

test('implicit-function', t => {
  implicitFunctionTest(
    {
      source: `
        const somen = ~(1 + 2)
      `,
      expected: `
        const somen = () => 1 + 2
      `,
    },
    t,
  )
})
