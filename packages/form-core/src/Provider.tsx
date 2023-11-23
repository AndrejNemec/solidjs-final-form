import {createForm as createFinalForm, FormState} from "final-form";
import {createContext, ParentProps, splitProps, useContext} from "solid-js";
import {createFormDirectives} from "./createFormDirectives";

export type FormContextType<FormValues, InitialFormValues = Partial<FormValues>> = {
  api: ReturnType<typeof createFinalForm<FormValues, InitialFormValues>>
  directives: ReturnType<typeof createFormDirectives<FormValues, InitialFormValues>>
  state: FormState<FormValues, InitialFormValues>
  handleSubmit: () => void
}

export const FormContext = createContext<FormContextType<unknown>>({} as FormContextType<unknown>)

export const useFormContext = <FormValues = unknown>() => {
  return useContext(FormContext) as FormContextType<FormValues>;
}

export interface ProviderProps<FormValues, InitialFormValues = Partial<FormValues>> extends ParentProps<FormContextType<FormValues, InitialFormValues>> {

}

export const Provider = <FormValues, InitialFormValues = Partial<FormValues>>(props: ProviderProps<FormValues, InitialFormValues>) => {
  const [local, context] = splitProps(props, ["children"])

  return (
    <FormContext.Provider value={context as FormContextType<unknown, unknown>}>
      {local.children}
    </FormContext.Provider>
  )
}
