import {Accessor, createSignal, onCleanup, onMount, useContext} from "solid-js";
import {FieldState, FieldSubscription, fieldSubscriptionItems, FieldValidator} from "final-form";
import {FormContext} from "./createForm";

const all: FieldSubscription = fieldSubscriptionItems.reduce((result, key) => {
  result[key] = true;
  return result;
}, {});

export interface CreateFieldReturnProps<FormValues, F extends keyof FormValues = keyof FormValues> {
  ref(ref: HTMLInputElement): HTMLInputElement

  get checked(): boolean | undefined

  get value(): string | number | undefined

  onInput(event: Event | FormValues[F]): void

  onFocus(): void

  onBlur(): void
}

export interface CreateFieldProps<FormValues, F extends keyof FormValues = keyof FormValues> {
  validate?: FieldValidator<F>
  validateFields?: string[]
  defaultValue?: FormValues[F]
}

export const createField = <FormValues, F extends keyof FormValues = keyof FormValues>(
  name: F | string,
  props?: () => CreateFieldProps<FormValues, F>
): [CreateFieldReturnProps<FormValues, F>, Accessor<FieldState<FormValues[F]>>] => {
  const context = useContext(FormContext)
  let subscription: (() => void)
  let inputRef: HTMLInputElement

  const register = (callback: (state: FieldState<FormValues[F]>) => void, silent: boolean) =>
    context.finalFormApi.registerField<F>(name as any, callback, all, {
      getValidator: () => {
        return props().validate
      },
      defaultValue: props().defaultValue,
      validateFields: props().validateFields,
      isEqual: (a: any, b: any): boolean => a === b,
      silent,
      beforeSubmit: () => {
        console.log()
      },
      data: {
        getRef: () => inputRef
      }
    });

  const [state, setState] = createSignal<FieldState<FormValues[F]>>((() => {
    let initialState: FieldState<FormValues[F]>;

    // temporarily disable destroyOnUnregister
    const destroyOnUnregister = context.finalFormApi.destroyOnUnregister;
    context.finalFormApi.destroyOnUnregister = false;

    register((state) => {
      initialState = state
    }, true)()

    // return destroyOnUnregister to its original value
    context.finalFormApi.destroyOnUnregister = destroyOnUnregister;

    return initialState;
  })())

  onMount(() => {
    subscription = register(setState, false)
  })

  onCleanup(() => {
    subscription?.()
  })

  return [
    {
      ref(value) {
        inputRef = value
        return inputRef
      },
      get checked() {
        if (inputRef && inputRef.type === 'checkbox') {
          return state().value as boolean
        }
        return undefined
      },
      get value() {
        return state().value as string | number | undefined
      },
      onInput: (event: Event | FormValues[F]) => {
        if (typeof event === 'object' && 'target' in event) {
          const input = event.currentTarget as HTMLInputElement
          if (input.type === 'checkbox') {
            state().change(input.checked as FormValues[F])
            return
          }
          state().change(input.value as FormValues[F])
          return
        }
        state().change(event )
      },
      onBlur: () => {
        state().blur()
      },
      onFocus: () => {
        state().focus()
      }
    },
    state
  ]
}
