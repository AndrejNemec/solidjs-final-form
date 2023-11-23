import {onCleanup, onMount, ParentProps} from "solid-js";
import {
  Config,
  createForm as createFinalForm, Decorator,
  FormState
} from "final-form";
import {createField, CreateFieldProps} from "./createField";
import {Field, FieldProps} from "./Field";
import {createStore} from "solid-js/store";
import {allFormSubscriptions} from "./utils";
import {Provider, ProviderProps, useFormContext} from "./Provider";
import {createFormDirectives} from "./createFormDirectives";

export interface CreateFormOptions<FormValues, InitialFormValues = Partial<FormValues>> extends Config<FormValues, InitialFormValues> {
  decorators?: Decorator<FormValues, InitialFormValues>[]
}


export const createForm = <FormValues, InitialFormValues = Partial<FormValues>>(
  options: () => CreateFormOptions<FormValues, InitialFormValues>
) => {
  const finalForm = createFinalForm<FormValues, InitialFormValues>(options() as Config<FormValues>)
  const directives = createFormDirectives<FormValues, InitialFormValues>(finalForm);
  const [state, setState] = createStore<FormState<FormValues, InitialFormValues>>(finalForm.getState())
  const subscriptions: Array<() => void> = [];

  onMount(() => {
    finalForm.isValidationPaused() && finalForm.resumeValidation();
    subscriptions.push(
      finalForm.subscribe(state => {
          setState(state as FormState<FormValues, InitialFormValues>);
        },
        allFormSubscriptions
      )
    );
    options().decorators?.forEach(decorator => {
      subscriptions.push(decorator(finalForm))
    })
  });

  onCleanup(() => {
    finalForm.pauseValidation();
    subscriptions.reverse().forEach((unsubscribe) => unsubscribe());
  });

  return [
    {
      state,
      directives,
      handleSubmit: async () => {
        return await finalForm.submit()
      },
      api: finalForm,
    },
    {
      Provider: (props: ParentProps) => (
        <Provider api={finalForm} directives={directives} state={state} handleSubmit={finalForm.submit}>
          {props.children}
        </Provider>
      ),
      useFormState: useFormContext<FormValues>,
      Field: <F extends keyof FormValues>(props: FieldProps<FormValues, F>) => Field(props),
      createField: <F extends keyof FormValues>(name: F, props: () => CreateFieldProps<FormValues, F>) => createField(name, props),
    }
  ]
}
