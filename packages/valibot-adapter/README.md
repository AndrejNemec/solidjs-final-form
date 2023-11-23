<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solidjs-final-form&background=tiles&project=%20" alt="solidjs-final-form">
</p>

# Solid final form - valibot adapter

[![npm version](https://badge.fury.io/js/@solidjs-final-form%2Fvalibot-adapter.svg)](https://badge.fury.io/js/@solidjs-final-form%2Fvalibot-adapter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
**Solid final form** is a comprehensive library that bridges the robust form management capabilities of Final Form with the reactive and efficient rendering of Solid.js. Designed specifically for Solid.js developers, this package offers an elegant and powerful solution for creating, managing, and validating forms with ease.

---

## Quick start

### Installation:

```bash
npm i @solidjs-final-form/valibot-adapter
# or
yarn add @solidjs-final-form/valibot-adapter
# or
pnpm add @solidjs-final-form/valibot-adapter
```
---



### Simple usage:
**For TypeScript users:**
Add directives to your `global.d.ts`
```ts
import { FormDirectives } from '@solidjs-final-form/core'

declare module "solid-js" {
  namespace JSX {
    interface Directives extends FormDirectives {}
  }
}
```

### Examples:
- [Simple example](https://github.com/AndrejNemec/solidjs-final-form/blob/master/apps/examples/src/simple/SimpleForm.tsx)
- [With valibot](https://github.com/AndrejNemec/solidjs-final-form/blob/master/apps/examples/src/with-valibot/WithValibotForm.tsx)
  - Require `npm i valibot`
  - Require `npm i @solidjs-final-form/valibot-adapter`
- [With auto-focus on first error](https://github.com/AndrejNemec/solidjs-final-form/blob/master/apps/examples/src/with-auto-focus-on-first-error/WithAutoFocusOnFirstErrorForm.tsx)
- [With array fields and valibot validation](https://github.com/AndrejNemec/solidjs-final-form/blob/master/apps/examples/src/with-arrays/FormWithArrays.tsx)
  - Require `npm i valibot`
  - Require `npm i @solidjs-final-form/valibot-adapter`
  - Require `npm i @solidjs-final-form/arrays`
