import { FormDirectives } from '@solidjs-final-form/core'

declare module "solid-js" {
  namespace JSX {
    interface Directives extends FormDirectives {}
  }
}
