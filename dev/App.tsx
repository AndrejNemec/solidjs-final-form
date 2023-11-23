import type {Component} from 'solid-js'
import logo from './logo.svg'
import styles from './App.module.css'
import {createForm, Field} from "../src";
import {array, boolean, email, minLength, object, parseAsync, safeParseAsync, string} from "valibot";
import {valiField, valiForm} from "../src/adapters/valibot";
import {For, Index} from "solid-js";

type Test = {
  name: string, issues: {
    name: string
    description: string
  }[], yes: boolean
}

const App: Component = () => {
  const [form, SignInForm] = createForm<Test>(() => ({
    initialValues: {
      name: '',
      issues: []
    },
    onSubmit: async (values, form, callback) => {
      console.log(values)
    },
/*    validate: valiForm(object({
          name: string([email(), minLength(20)]),
          issues: array(string([email()]))
        })),*/
    validateOnBlur: false
  }))

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    form.handleSubmit()
  }

  return (
    <div class={styles.App}>
      <h1>Form test</h1>
      <SignInForm.Provider>
        <form classList={{[styles.flex]: true, [styles.flexCol]: true, [styles['gap-5']]: true}}
              onSubmit={handleSubmit}>
          <SignInForm.Field
            name='name'
            validate={valiField(string([email("My email is not valid!!!")]))}
          >
            {(props, state) => (
              <div>
                <input
                  type="text"
                  {...props}
                />
                <span>{state().touched && state().error}</span>
              </div>

            )}
          </SignInForm.Field>

          <SignInForm.FieldArray
            name='issues'
          >
            {(fields, utils) => (
              <div>
                <h2>Items</h2>
                <Index each={fields()}>
                  {(field, index) => (
                    <div>
                      <Field
                        name={`${field()}.name`}
                        validate={valiField(string([minLength(1, "Min length 1")]))}
                      >
                        {(props, state) => (
                          <div classList={{[styles.flex]: true, [styles.flexCol]: true, [styles['gap-2']]: true}}>
                            <input
                              type="text"
                              {...props}
                            />
                            <span>{state().touched && state().error}</span>
                          </div>
                        )}
                      </Field>

                      <Field
                        name={`${field()}.description`}
                        validate={valiField(string([minLength(1, "Min length 1")]))}
                      >
                        {(props, state) => (
                          <div classList={{[styles.flex]: true, [styles.flexCol]: true, [styles['gap-2']]: true}}>
                            <input
                              type="text"
                              {...props}
                            />
                            <span>{state().touched && state().error}</span>
                          </div>
                        )}
                      </Field>
                      <button type='button' onClick={() => utils.remove(index)}>Remove</button>
                    </div>
                  )}
                </Index>

                <button type='button' onClick={() => utils.push({ name: 'My issue 1', description: 'Issue!!!' })}>
                  Add item
                </button>
              </div>
            )}
          </SignInForm.FieldArray>
          <button type='submit' disabled={form.state().submitting}>
            Submit form
          </button>
        </form>
      </SignInForm.Provider>
    </div>
  )
}

export default App
