import {Accessor, createContext, createSignal, JSX, onCleanup, onMount, ParentProps, useContext} from "solid-js";
import {
  Config,
  createForm as createFinalForm,
  FieldSubscription,
  fieldSubscriptionItems,
  FormState,
  formSubscriptionItems
} from "final-form";
import {createField, CreateFieldProps} from "./createField";
import {Field, FieldProps} from "./Field";
import arrayMutators from 'final-form-arrays'
import {FieldArray, FieldArrayProps} from "./FieldArray";
import {createFieldArray, CreateFieldArrayProps} from "./createFieldArray";

const all: FieldSubscription = formSubscriptionItems.reduce((result, key) => {
  result[key] = true;
  return result;
}, {});

type Context<FormValues> = {
  finalFormApi: ReturnType<typeof createFinalForm<FormValues>>
  state: Accessor<FormState<FormValues>>
}

export const FormContext = createContext<Context<any>>({} as Context<any>)

export const useFormState = <FormValues = unknown>() => {
  return useContext(FormContext) as Context<FormValues>;
}

export interface CreateFormOptions<FormValues> extends Config<FormValues> {
}

export const createForm = <FormValues, InitialFormValues = Partial<FormValues>>(
  options: () => CreateFormOptions<FormValues>
) => {
  const finalForm = createFinalForm<FormValues, InitialFormValues>({
    ...options(),
    mutators: {...arrayMutators, ...options().mutators}
  })

  const [state, setState] = createSignal<FormState<FormValues, InitialFormValues>>(finalForm.getState())

  const subscriptions: Array<() => void> = [];

  onMount(() => {
    subscriptions.push(
      finalForm.subscribe(
        setState,
        all
      )
    );
  });

  onCleanup(() => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  });

  const Provider = (props: ParentProps<{}>): JSX.Element => {
    return (
      <FormContext.Provider value={{finalFormApi: finalForm, state} as any}>
        {props.children}
      </FormContext.Provider>
    )
  }

  return [
    {
      state,
      handleSubmit: finalForm.submit,
      finalFormApi: finalForm,
    },
    {
      Provider: Provider,
      useFormState: useFormState<FormValues>,
      createField: <F extends keyof FormValues>(name: F, props: () => CreateFieldProps<FormValues, F>) => createField(name, props),
      createFieldArray: <F extends keyof FormValues>(name: F, props: () => CreateFieldArrayProps<FormValues, F>) => createFieldArray(name, props),
      Field: <F extends keyof FormValues>(props: FieldProps<FormValues, F>) => Field(props),
      FieldArray: <F extends keyof FormValues>(props: FieldArrayProps<FormValues, F>) => FieldArray(props)
    }
  ]
}
