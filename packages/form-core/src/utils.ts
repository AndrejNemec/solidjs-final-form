import {
  FieldState,
  FieldSubscription,
  fieldSubscriptionItems,
  FormSubscription,
  formSubscriptionItems
} from "final-form";
import {useFormContext} from "./Provider";
import {Accessor, onCleanup} from "solid-js";

export const allFormSubscriptions: FormSubscription = formSubscriptionItems.reduce((result, key) => {
  result[key] = true;
  return result;
}, {});

export const allFieldSubscriptions: FieldSubscription = fieldSubscriptionItems.reduce((result, key) => {
  result[key] = true;
  return result;
}, {});


export interface StateToInputPropsReturnType<FormValues, F extends keyof FormValues = keyof FormValues> {
  get name(): string

  get checked(): boolean | undefined

  get value(): string | number | undefined

  onInput(event: Event | FormValues[F]): void

  onFocus(): void

  onBlur(): void
}

export const stateToInputProps = <FormValues = any, F extends keyof FormValues = keyof FormValues>(
  state: FieldState<FormValues[F]>,
  isCheckbox: boolean = false,
): StateToInputPropsReturnType<FormValues, F> => {
  return {
    get name() {
      return state.name
    },

    get checked() {
      if (isCheckbox) {
        return state.value as boolean
      }
      return undefined
    },

    get value() {
      return state.value as string | number | undefined
    },

    onInput: (event: Event | FormValues[F]) => {
      if (typeof event === 'object' && 'target' in event) {
        const input = event.currentTarget as HTMLInputElement
        if (input.type === 'checkbox') {
          state.change(input.checked as FormValues[F])
          return
        }
        state.change(input.value as FormValues[F])
        return
      }
      state.change(event)
    },

    onBlur: () => {
      state.blur()
    },

    onFocus: () => {
      state.focus()
    }
  }
}
