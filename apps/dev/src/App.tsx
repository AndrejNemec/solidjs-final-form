import type {Component} from 'solid-js'
import styles from './App.module.css'
import {stateToInputProps, createForm} from "@solidjs-final-form/core";

type Test = {
  name: string,
  email: string
}

const App: Component = () => {
  const [form, SignInForm] = createForm<Test>(() => ({
    initialValues: {
      name: '',
      email: ''
    },
    onSubmit: async (values) => {
      console.log(values)
    },
    validateOnBlur: false
  }))

  const { field, error } = form.directives

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    form.handleSubmit()
  }

  return (
    <div class={styles.App}>
      <h1>Form test</h1>
      <SignInForm.Provider>
        <form
          classList={{[styles.flex]: true, [styles.flexCol]: true, [styles['gap-5']]: true}}
          onSubmit={handleSubmit}
        >
          <SignInForm.Field name='name'>
            {(state) => (
              <div>
                <input
                  type="text"
                  {...stateToInputProps(state)}
                />
                <span>{state.touched && state.error}</span>
              </div>
            )}
          </SignInForm.Field>

          {form.state.values.email}

         <div>
           {/*@ts-ignore*/}
           <input name='email' type="email" use:field={(value) => value.length > 5 && 'Error!!'}/>
           {/*@ts-ignore*/}
           <span use:error='email'/>
         </div>

          <button type='submit' disabled={form.state.submitting}>
            Submit form
          </button>
        </form>
      </SignInForm.Provider>
    </div>
  )
}

export default App
