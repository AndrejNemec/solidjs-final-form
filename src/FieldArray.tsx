import {Accessor, JSX, splitProps} from "solid-js";
import {createFieldArray, CreateFieldArrayProps, CreateFieldArrayUtils} from "./createFieldArray";

export interface FieldArrayProps<FormValues, F extends keyof FormValues = keyof FormValues> extends CreateFieldArrayProps<FormValues, F> {
  name: F
  children: (fields: Accessor<string[]>, utils: CreateFieldArrayUtils<FormValues, F>) => JSX.Element
}

export const FieldArray = <FormValues, F extends keyof FormValues = keyof FormValues>(props: FieldArrayProps<FormValues, F>) => {
  const [localProps, otherProps] = splitProps(props, ['children', 'name'])
  const field = createFieldArray<FormValues, F>(localProps.name, () => otherProps)
  return localProps.children(field[0], field[1])
}
