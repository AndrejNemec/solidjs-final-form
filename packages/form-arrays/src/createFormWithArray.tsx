import {CreateFormOptions, createForm} from "@solidjs-final-form/core";
import arrayMutators from 'final-form-arrays'
import {FieldArray, FieldArrayProps} from "./FieldArray";
import {createFieldArray, CreateFieldArrayProps} from "./createFieldArray";

export interface CreateFormWithArrayOptions<
  FormValues,
  InitialFormValues = Partial<FormValues>> extends CreateFormOptions<FormValues, InitialFormValues> {
}

export const createFormWithArray = <FormValues, InitialFormValues = Partial<FormValues>>(
  options: () => CreateFormWithArrayOptions<FormValues, InitialFormValues>
) => {
  const [api, Form] = createForm<FormValues, InitialFormValues>(() => {
    const opts = options();
    const mutators = {
      ...arrayMutators,
      ...options().mutators || {}
    }
    return {
      ...opts,
      mutators
    }
  })


  return [
    api,
    {
      Provider: Form.Provider,
      useFormState: Form.useFormState,
      Field: Form.Field,
      createField: Form.createField,
      FieldArray: <F extends keyof FormValues>(props: FieldArrayProps<FormValues, F>) => FieldArray(props),
      createFieldArray: <F extends keyof FormValues>(name: F, props: () => CreateFieldArrayProps<FormValues, F>) => createFieldArray(name, props),
    } as const
  ] as const
}
