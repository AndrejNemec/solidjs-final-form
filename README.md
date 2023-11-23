<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-final-form&background=tiles&project=%20" alt="solid-final-form">
</p>

# Solid final form

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

**Solid final form** is a comprehensive library that bridges the robust form management capabilities of Final Form with the reactive and efficient rendering of Solid.js. Designed specifically for Solid.js developers, this package offers an elegant and powerful solution for creating, managing, and validating forms with ease.

---

## Quick start

### Installation:

```bash
npm i solid-final-form
# or
yarn add solid-final-form
# or
pnpm add solid-final-form
```
---

### Simple usage:
```tsx
import {Show} from 'solid-js'
import {createForm} from 'solid-final-form'
import {valiForm} from 'solid-final-form/adapters/valibot'
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
