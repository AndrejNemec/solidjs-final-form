import {valiForm} from "@solidjs-final-form/valibot-adapter";
import {array, minLength, object, string} from "valibot";
import {createFormWithArray} from "@solidjs-final-form/arrays";
import {For, Index, Show} from "solid-js";
import {stateToInputProps} from "@solidjs-final-form/core";

type UserTodos = {
  username: string
  todos: {
    title: string
    description: string
  }[]
}

export const FormWithArrays = () => {
  const [form, Form] = createFormWithArray<UserTodos>(() => ({
    initialValues: {
      username: '',
      todos: [],
    },
    onSubmit: async (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
    },
    validate: valiForm(object({
      username: string([minLength(5, 'Min length is 5')]),
      todos: array(object({
        title: string([minLength(3, 'Min length is 3')]),
        description: string([minLength(10, 'Min length is 10')]),
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
        <h2 class='text-xl font-semibold mt-10'>Array form</h2>

        <div class='flex flex-col gap-2.5'>
          <label for='username'>
            Username
          </label>
          <input id='username' type="text" name='username' use:field/>
          <span class='text-red-700' use:error='username'/>
        </div>
        <div class='flex flex-col gap-2.5'>
          <Form.FieldArray name='todos'>
            {(fields, utils) => (
              <div class='flex flex-col gap-5'>
                <Index each={fields()}>
                  {(field, index) => (
                    <div class='flex flex-col gap-2'>
                      <span class='block text-xl text-center'>Todo #{index + 1}</span>
                      <Form.Field name={`${field()}.title`}>
                        {(state) => (
                          <div>
                            <div class='flex flex-col gap-2.5'>
                              <label for={`${field()}.title`}>
                                Title
                              </label>
                              <input
                                {...stateToInputProps(state)}
                                id={`${field()}.title`}
                                type="text"
                              />
                              <Show when={state.touched && state.error}>
                                <span class='text-red-700'>
                                  {state.error}
                                </span>
                              </Show>
                            </div>
                          </div>
                        )}
                      </Form.Field>
                      <Form.Field name={`${field()}.description`}>
                        {(state) => (
                          <div class='gap-1'>
                            <div class='flex flex-col gap-2.5'>
                              <label for={`${field()}.description`}>
                                Title
                              </label>
                              <input
                                {...stateToInputProps(state)}
                                id={`${field()}.description`}
                                type="text"
                              />
                              <Show when={state.touched && state.error}>
                                <span class='text-red-700'>
                                  {state.error}
                                </span>
                              </Show>
                            </div>
                          </div>
                        )}
                      </Form.Field>

                      <button type='button' onClick={() => utils.remove(index)}>
                        Remove todo
                      </button>
                    </div>
                  )}
                </Index>
                <button
                  type='button'
                  onClick={() => utils.push({title: 'New todo title', description: 'New todo description'})}
                >
                  Add todo
                </button>
              </div>
            )}
          </Form.FieldArray>

        </div>
        <button type="submit">Submit</button>

        <div class='flex gap-5'>
          <div>
            <h3 class='mt-5 text-lg font-semibold'>Values:</h3>
            <code>
              <pre>{JSON.stringify(form.state.values, null, 2)}</pre>
            </code>
          </div>
          <div>
            <h3 class='mt-5 text-lg font-semibold'>Errors:</h3>
            <code>
              <pre>{JSON.stringify(form.state.errors, null, 2)}</pre>
            </code>
          </div>
        </div>
      </form>
    </Form.Provider>
  )
}
