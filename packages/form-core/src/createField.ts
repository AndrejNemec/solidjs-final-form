import { onCleanup, onMount } from "solid-js";
import {FieldState, FieldValidator} from "final-form";
import {createStore} from "solid-js/store";
import {useFormContext} from "./Provider";
import {allFieldSubscriptions} from "./utils";

export interface CreateFieldProps<FormValues, F extends keyof FormValues = keyof FormValues> {
  validate?: FieldValidator<FormValues[F]>
  validateFields?: string[]
  initialValue?: FormValues[F]
  defaultValue?: FormValues[F]
  isEqual?: (a: any, b: any) => boolean
  beforeSubmit?: () => void | false
  afterSubmit?: () => void
  data?: any
}

export const createField = <FormValues, F extends keyof FormValues = keyof FormValues>(
  name: F | string,
  props?: () => CreateFieldProps<FormValues, F>
): FieldState<FormValues[F]> => {
  const context = useFormContext<FormValues>()
  let subscription: (() => void)

  const register = (callback: (state: FieldState<FormValues[F]>) => void, silent: boolean) =>
    context.api.registerField<F>(name as F, callback, allFieldSubscriptions, {
      getValidator: () => {
        return props().validate
      },
      defaultValue: props().defaultValue,
      initialValue: props().initialValue,
      validateFields: props().validateFields,
      isEqual: (a: any, b: any): boolean => {
        return props().isEqual?.(a, b) || a === b
      },
      beforeSubmit: props().beforeSubmit,
      afterSubmit: props().afterSubmit,
      data: props().data,
      silent
    });

  const [state, setState] = createStore<FieldState<FormValues[F]>>((() => {
    let initialState: FieldState<FormValues[F]>;

    // temporarily disable destroyOnUnregister
    const destroyOnUnregister = context.api.destroyOnUnregister;
    context.api.destroyOnUnregister = false;

    register((state) => {
      initialState = state
    }, true)()

    // return destroyOnUnregister to its original value
    context.api.destroyOnUnregister = destroyOnUnregister;

    return initialState;
  })())

  onMount(() => {
    subscription = register(setState, false)
  })

  onCleanup(() => {
    subscription?.()
  })

  return state
}
