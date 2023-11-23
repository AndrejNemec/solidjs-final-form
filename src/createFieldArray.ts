import {Accessor, createMemo} from "solid-js";
import {createField, CreateFieldProps} from "./createField";
import {useFormState} from "./createForm";

type ArrayElement<ArrayType> = ArrayType extends (infer ElementType)[] ? ElementType : ArrayType;

export interface CreateFieldArrayProps<FormValues, F extends keyof FormValues = keyof FormValues> extends CreateFieldProps<FormValues, F> {
}

export interface CreateFieldArrayUtils<FormValues, F extends keyof FormValues = keyof FormValues, ArraySingleValue = ArrayElement<FormValues[F]>> {
  push: (value: ArraySingleValue) => void
  insert: (index: number, value: ArraySingleValue) => void
  concat: (value: Array<ArraySingleValue>) => void
  move: (from: number, to: number) => void
  pop: () => void
  remove: (index: number) => void
  removeBatch: (index: Array<number>) => void
  shift: () => void
  swap: (indexA: number, indexB: number) => void
  unshift: (value: ArraySingleValue) => void
  update: (index: number, value: ArraySingleValue) => void
}


export const createFieldArray = <
  FormValues,
  F extends keyof FormValues = keyof FormValues,
  ArraySingleValue = ArrayElement<FormValues[F]>
>(
  name: F,
  props?: () => CreateFieldArrayProps<FormValues, F>
): [Accessor<string[]>, CreateFieldArrayUtils<FormValues, F, ArraySingleValue>] => {
  const context = useFormState<FormValues>()
  const [, state] = createField<FormValues, F>(name, props)
  const fields = createMemo(() => {
    const len = state().length || 0

    return Array.from({length: len}, (_, i) => {
      return `${name as string}[${i}]`
    })
  })

  const push = (value: ArraySingleValue) => {
    context.finalFormApi.mutators.push(name, value)
  }

  const insert = (index: number, value: ArraySingleValue) => {
    context.finalFormApi.mutators.insert(name, index, value)
  }

  const concat = (value: Array<ArraySingleValue>) => {
    context.finalFormApi.mutators.concat(name, value)
  }

  const move = (from: number, to: number) => {
    context.finalFormApi.mutators.move(name, from, to)
  }

  const pop = () => {
    context.finalFormApi.mutators.pop(name)
  }

  const remove = (index: number) => {
    context.finalFormApi.mutators.remove(name, index)
  }

  const removeBatch = (index: Array<number>) => {
    context.finalFormApi.mutators.removeBatch(name, index)
  }

  const shift = () => {
    context.finalFormApi.mutators.shift(name)
  }

  const swap = (indexA: number, indexB: number) => {
    context.finalFormApi.mutators.swap(name, indexA, indexB)
  }

  const unshift = (value: ArraySingleValue) => {
    context.finalFormApi.mutators.unshift(name, value)
  }

  const update = (index: number, value: ArraySingleValue) => {
    context.finalFormApi.mutators.update(name, index, value)
  }

  return [fields, {
    push,
    insert,
    concat,
    move,
    pop,
    remove,
    removeBatch,
    shift,
    swap,
    unshift,
    update
  }]
}
