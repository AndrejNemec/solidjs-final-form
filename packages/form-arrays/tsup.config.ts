import { defineConfig } from 'tsup'
import * as preset from 'tsup-preset-solid'

const preset_options: preset.PresetOptions = {
  // array or single object
  entries: [
    // default entry (index)
    {
      // entries with '.tsx' extension will have `solid` export condition generated
      entry: 'src/index.tsx',
      // will generate a separate development entry
      dev_entry: true
    },
  ],
  // Set to `true` to remove all `console.*` calls and `debugger` statements in prod builds
  drop_console: true
}


export default defineConfig(config => {
  const watching = !!config.watch
  const parsed_options = preset.parsePresetOptions(preset_options, watching)
  return preset.generateTsupOptions(parsed_options)
})
