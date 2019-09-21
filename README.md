# react-nonconFORMist
Dealing with form and validation should be easy in any platform.

## Installation
```bash
$ npm install react-nonconformist
# Or with yarn
# $ yarn add react-nonconformist
```

## Usage

```js
import React, { useState } from 'react'
import Form, { createInput } from 'react-nonconformist'

const TextInput = createInput({})

const Register = function () {
  const [state, setState] = useState({})

  const set = values => setState({ ...state, values })

  return (
    <Form
      values={state}
      onChange={set}
      onSubmit={() => alert('Submited')}
    >
      {(connect, submit, isValid) => (
        <form onSubmit={submit}>
          <TextInput {...connect('name')} placeholder='Name' required />}
          <TextInput {...connect('email')} placeholder='Email' type='email' required />}
          <TextInput {...connect('password')} placeholder='Password' type='password' required />}
          <input type='submit' value='Register' />
        </form>
      )}
    </Form>
  )
}
```

## Understanding <Form>
`<Form>` is a container that understands and validate form through a `createInput` input.

### Creating a simple form
```js
import React, { Component } from 'react'
import Form from 'react-nonconformist'

const App = function () {
  const [state, setState] = useState({})

  const set = values => setState({ ...state, values })

  return (
    <Form
      values={state}
      onChange={set}
      onSubmit={() => alert('Submited')}
    >
      {(connect, submit) => (
        <form onSubmit={submit}>
        </form>
      )}
    </Form>
  )
}
```

### Connecting a Form with an input using createInput 
```js
import React, { Component } from 'react'
import Form, { createInput } from 'react-nonconformist'

const TextInput = createInput({})

const App = function () {
  const [state, setState] = useState({})

  const set = values => setState({ ...state, values })

  return (
    <Form
      values={state}
      onChange={set}
      onSubmit={() => alert('Submited')}
    >
      {(connect, submit) => (
        <form onSubmit={submit}>
          <TextInput {...connect('simpleTextInput')} />
        </form>
      )}
    </Form>
  )
}
```


### Enabling button only if everything is valid 
```js
import React, { Component } from 'react'
import Form, { createInput } from 'react-nonconformist'

const TextInput = createInput({})

const App = function () {
  const [state, setState] = useState({})

  const set = values => setState({ ...state, ...values })

  return (
    <Form
      values={state}
      onChange={set}
      onSubmit={() => alert('Submited')}
    >
      {(connect, submit, isValid) => (
        <form onSubmit={submit}>
          <TextInput {...connect('simpleTextInput')} required />
          <input type='submit' disabled={!isValid} value='Submit' />
        </form>
      )}
    </Form>
  )
}
```

Remember `onSubmit` it will only trigger when everything in your form is valid otherwise it won`t trigger anything.

## Understanding createInput
`createInput` is a simple HOC that helps your input to connect with `<Form>`.

### Creating a new input
```js
import React, { Component } from 'react'
import { createInput } from 'react-nonconformist'

class InputEmailComponent extends Component {
  render () {
    const { onChangeText, value, error, onBlur, onFocus } = this.props
    return (
      <div>
        <input 
          type='email' 
          value={value} 
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {error && <span>{error}</span>}
      </div>
    )
  }
}

const InputEmail = createInput({
  validate: ({ value }) => (/\S+@\S+\.\S+/).test(value),
  inputComponent: InputEmailComponent
})

const App = function () {
  return (
    <InputEmail />
  )
}
```