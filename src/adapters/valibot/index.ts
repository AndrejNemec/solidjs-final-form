import {safeParseAsync} from "valibot";
import {FieldValidator, ValidationErrors} from "final-form";
import {BaseSchema, BaseSchemaAsync} from "valibot/dist";
import set from 'lodash.set'

export const valiForm = <FormValues>(schema: BaseSchema<FormValues> | BaseSchemaAsync<FormValues>) => {
  return async (values: FormValues): Promise<ValidationErrors> => {
    const result = await safeParseAsync(schema, values) as any //TODO: Remove any
    if (result.success) {
      return
    }

    const errors: Record<string, unknown> = {};

    for (; result.issues.length;) {
      const error = result.issues[0];
      if (!error.path) {
        continue;
      }
      const _path = error.path.map(({key}) => key).join('.')
      set(errors, _path, error.message);
      result.issues.shift()
    }

    return errors;
  }
}


export const valiField = <FormValues>(schema: BaseSchema<FormValues> | BaseSchemaAsync<FormValues>): FieldValidator<any> => {
  return async (value) => {
    const result = await safeParseAsync(schema, value) as any //TODO: Remove any
    if (result.success) {
      return
    }
    return result?.issues?.[0]?.message
  }
}
