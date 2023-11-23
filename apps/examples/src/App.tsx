import type {Component} from 'solid-js'
import {SimpleForm} from "./simple/SimpleForm.tsx";
import {FormWithArrays} from "./with-arrays/FormWithArrays.tsx";
import {WithAutoFocusOnFirstErrorForm} from "./with-auto-focus-on-first-error/WithAutoFocusOnFirstErrorForm.tsx";
import {WithValibotForm} from "./with-valibot/WithValibotForm.tsx";

const App: Component = () => {
  return (
    <main>
      <div class='p-2 containter mx-auto max-w-[600px]'>
        <h1 class='text-2xl font-semibold mb-5 text-center'>Forms</h1>
        <div class='flex flex-col gap-5'>
          <SimpleForm/>
          <FormWithArrays/>
          <WithAutoFocusOnFirstErrorForm/>
          <WithValibotForm/>
        </div>
      </div>
    </main>
  )
}

export default App
