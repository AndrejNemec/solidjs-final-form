import {Accessor, JSX, splitProps} from "solid-js";
import {createField, CreateFieldProps, CreateFieldReturnProps} from "./createField";
import {FieldState} from "final-form";
import {CreateFieldArrayProps} from "./createFieldArray";

export interface FieldProps<FormValues, F extends keyof FormValues = keyof FormValues> extends CreateFieldProps<FormValues, F> {
  name: F | string
  children: (props: CreateFieldReturnProps<FormValues, F>, state: Accessor<FieldState<FormValues[F]>>) => JSX.Element
}

export type Field<FormValues, F extends keyof FormValues = keyof FormValues> = (props: FieldProps<FormValues, F>) => JSX.Element

export const Field = <FormValues, F extends keyof FormValues = keyof FormValues>(props: FieldProps<FormValues, F>) => {
  const [localProps, otherProps] = splitProps(props, ['children', 'name'])
  const field = createField<FormValues, F>(localProps.name as string, () => otherProps)
  return localProps.children(field[0], field[1])
}
