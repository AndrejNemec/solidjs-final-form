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
npm i solidjs-final-form
# or
yarn add solidjs-final-form
# or
pnpm add solidjs-final-form
```
---

### Simple usage:
```tsx
import {Show} from 'solid-js'
import {createForm} from 'solidjs-final-form'
import {valiForm} from 'solidjs-final-form/adapters/valibot'
import {email, minLength, object, string} from "valibot"; //Optional (pnpm add valibot)

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
        validate: valiForm(object({
            email: string([email(), minLength(20)]),
            password: string([minLength(10)]),
        })) //Optional (pnpm add valibot)
    }))

    const handleSubmit = (event: Event) => {
        event.preventDefault()
        form.handleSubmit()
    }

    return (
        <SignInForm.Provider>
            <form onSubmit={handleSubmit}>
                <SignInForm.Field name='email'>
                    {(props, state) => (
                        <div>
                            <label for="email">Password</label>
                            <input
                                id="email"
                                type="email"
                                {...props}
                            />
                            <Show when={state().touched && state().error}>
                                <span>{state().error}</span>
                            </Show>
                        </div>
                    )}
                </SignInForm.Field>

                <SignInForm.Field name='password'>
                    {(props, state) => (
                        <div>
                            <label for="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                {...props}
                            />
                            <Show when={state().touched && state().error}>
                                <span>{state().error}</span>
                            </Show>
                        </div>
                    )}
                </SignInForm.Field>

                <button type="submit">Submit</button>
            </form>
        </SignInForm.Provider>
    )
}
```
