<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solidjs-final-form&background=tiles&project=%20" alt="solidjs-final-form">
</p>

# Solid final form

[![npm version](https://badge.fury.io/js/@solidjs-final-form%2Fcore.svg)](https://badge.fury.io/js/@solidjs-final-form%2Fcore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
**Solid final form** is a comprehensive library that bridges the robust form management capabilities of Final Form with the reactive and efficient rendering of Solid.js. Designed specifically for Solid.js developers, this package offers an elegant and powerful solution for creating, managing, and validating forms with ease.

---

## Quick start

### Installation:

```bash
npm i @solidjs-final-form/core final-form
# or
yarn add @solidjs-final-form/core final-form
# or
pnpm add @solidjs-final-form/core final-form
```
---



### Simple usage:
**For TypeScript users:**
Add directives to your `global.d.ts`
```ts
import { FormDirectives } from '@solidjs-final-form/core'

declare module "solid-js" {
  namespace JSX {
    interface Directives extends FormDirectives {}
  }
}
```

```tsx
import {Show} from 'solid-js'
import {createForm} from '@solidjs-final-form/core'

type SignInData = {
    email: string
    password: string
}

export const SignInForm = () => {
    const [form, Form] = createForm<SignInData>(() => ({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values, form, callback) => {
            console.log(values)
        },
        validate: (values) => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Required'
            }
            if (!values.password) {
                errors.password = 'Required'
            }
            return errors
        }
    }))

     const { directives: { field, error } } = form

    const handleSubmit = (event: Event) => {
        event.preventDefault()
        form.handleSubmit()
    }

    return (
        <Form.Provider>
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" name='email' use:field/>
                <span use:error='email'/>
              </div>
              <div>
                <input type="password" name='password' use:field/>
                <span use:error='password'/>
              </div>
              <button type="submit">Submit</button>
            </form>
        </Form.Provider>
    )
}
```


### With valibot validation library:
### Installation:

```bash
npm i @solidjs-final-form/valibot-adapter valibot
# or
yarn add @solidjs-final-form/valibot-adapter valibot
# or
pnpm add @solidjs-final-form/valibot-adapter valibot
```

Example:

```tsx
import {Show} from 'solid-js'
import {createForm} from '@solidjs-final-form/core'
import {valiForm} from '@solidjs-final-form/valibot-adapter'
import {email, minLength, string, object} from "valibot";

type SignInData = {
  email: string
  password: string
}

export const SignInForm = () => {
  const [form, Form] = createForm<SignInData>(() => ({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values, form, callback) => {
      console.log(values)
    },
    validate: valiForm(object({
      email: string([email("Email is not valid"), minLength(5, "Email is too short")]),
      password: string([minLength(10, "Password is too short")]),
    }))
  }))

  const {directives: {field, error}} = form

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    form.handleSubmit()
  }

  return (
    <Form.Provider>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name='email' use:field/>
          <span use:error='email'/>
        </div>
        <div>
          <input type="password" name='password' use:field/>
          <span use:error='password'/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Form.Provider>
  )
}
```


### With arrays:
### Installation:

```bash
npm i @solidjs-final-form/arrays final-form-arrays
# or
yarn add @solidjs-final-form/arrays final-form-arrays
# or
pnpm add @solidjs-final-form/arrays final-form-arrays
```

Example:

```tsx
import {Show, Index} from 'solid-js'
import {createFormWithArray} from '@solidjs-final-form/arrays'
import {valiForm} from '@solidjs-final-form/valibot-adapter'
import {email, minLength, string, object, array} from "valibot";

type SignInData = {
    email: string
    password: string
    todos: {
        title: string
        description: string
    }[]
}

export const SignInForm = () => {
    const [form, Form] = createFormWithArray<SignInData>(() => ({
        initialValues: {
            email: '',
            password: '',
            todos: []
        },
        onSubmit: async (values, form, callback) => {
            console.log(values)
        },
        validate: valiForm(object({
            email: string([email("Email is not valid"), minLength(5, "Email is too short")]),
            password: string([minLength(10, "Password is too short")]),
            todos: array(object({
                title: string([minLength(5, "Title is too short")]),
                description: string([minLength(10, "Description is too short")]),
            }))
        }))
    }))

    const {directives: {field, error}} = form

    const handleSubmit = (event: Event) => {
        event.preventDefault()
        form.handleSubmit()
    }

    return (
        <Form.Provider>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name='email' use:field/>
                    <span use:error='email'/>
                </div>
                <div>
                    <input type="password" name='password' use:field/>
                    <span use:error='password'/>
                </div>
                <div>
                    <Form.FieldArray name='todos'>
                        {(fields, utils) => (
                            <div>
                                <Index each={fields}>
                                    {(field, index) => (
                                        <div>
                                            <div>
                                                <input type="text" name={`${field}.title`} use:field/>
                                                <span use:error={`${field}.title`}/>
                                            </div>
                                            <div>
                                                <input type="text" name={`${field}.description`} use:field/>
                                                <span use:error={`${field}.description`}/>
                                            </div>
                                          <button type="button" onClick={() => utils.remove(index)}>Remove todo</button>
                                        </div>
                                    )}
                                </Index>
                              <button type="button" onClick={() => utils.push({title: '', description: ''})}>Add todo</button>
                            </div>
                        )}
                    </Form.FieldArray>
                </div>
                <button type="submit">Submit</button>
            </form>
        </Form.Provider>
    )
}
```
