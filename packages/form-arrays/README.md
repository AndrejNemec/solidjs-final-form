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
        <SignInForm.Provider>
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
        </SignInForm.Provider>
    )
}
```