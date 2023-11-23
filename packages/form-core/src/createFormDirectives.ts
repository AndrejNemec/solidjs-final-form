import {Accessor, onCleanup} from "solid-js";
import {FieldValidator, FormApi} from "final-form";

export const createFormDirectives = <FormValues, InitialFormValues = Partial<FormValues>>(api: FormApi<FormValues, InitialFormValues>) => {
  const unsubscribes: Array<() => void> = [];

  const field = (
    ref: HTMLInputElement,
    getValidate?: Accessor<FieldValidator<FormValues[keyof FormValues]>>
  ) => {
    const name = ref.name as keyof FormValues;
    let removeListeners: () => void | undefined;
    unsubscribes.push(
      api.registerField(
        name,
        ({ value, change, focus, blur }) => {
          if (ref.type === "checkbox") {
            ref.checked = value as boolean
          } else {
            ref.value = String(value);
          }
          if (!removeListeners) {
            const onBlur = (event: Event) => blur();
            const onChange = (event: Event) => {
              const target = event.currentTarget as HTMLInputElement;
              if (target.type === "checkbox") {
                change(target.checked as FormValues[keyof FormValues])
                return;
              }
              change(target.value as FormValues[keyof FormValues]);
            }
            const onFocus = (event: Event) => focus();
            ref.addEventListener("blur", onBlur);
            ref.addEventListener("input", onChange);
            ref.addEventListener("focus", onFocus);
            removeListeners = () => {
              ref.removeEventListener("blur", onBlur);
              ref.removeEventListener("input", onChange);
              ref.removeEventListener("focus", onFocus);
            };
            unsubscribes.push(removeListeners);
          }
        },
        { value: true },
        {
          getValidator: () => {
            return getValidate?.()
          },
        }
      )
    );
  };

  const error = (
    ref: HTMLElement,
    getName: Accessor<keyof FormValues>
  ) => {
    const name = getName();

    const previousDisplay = ref.style.getPropertyValue("display");
    ref.style.setProperty('display', 'none')

    unsubscribes.push(
      api.registerField(
        name,
        ({ touched, error }) => {
          if (touched && error) {
            ref.style.setProperty('display', previousDisplay)
            ref.innerHTML = touched && error ? error : "";
            return
          }
          ref.style.setProperty('display', 'none')
        },
        { touched: true, error: true }
      )
    )
  }

  onCleanup(() => unsubscribes.forEach((unsubscribe) => unsubscribe()));

  return {
    field,
    error
  }
}

export interface FormDirectives {
  field?: FieldValidator<any>
  error: string
}
