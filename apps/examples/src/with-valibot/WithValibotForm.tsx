import {createForm} from '@solidjs-final-form/core'
import {valiForm} from "@solidjs-final-form/valibot-adapter";
import {email, minLength, object, string} from "valibot";

type SignInData = {
  email: string
  password: string
}

export const WithValibotForm = () => {
  const [form, Form] = createForm<SignInData>(() => ({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, form, callback) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
    },
    validate: valiForm(object({
      email: string([email('Email is not valid.')]),
      password: string([minLength(1, 'Min length is 1')]),
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
        <h2 class='text-xl font-semibold mt-10'>Simple form</h2>

        <div class='flex flex-col gap-2.5'>
          <label for='email'>
            Email
          </label>
          <input id='email' type="text" name='email' use:field/>
          <span class='text-red-700' use:error='email'/>
        </div>
        <div class='flex flex-col gap-2.5'>
          <label for='password'>
            Password
          </label>
          <input id='password' type="password" name='password' use:field/>
          <span class='text-red-700' use:error='password'/>
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
