import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest'
import { defaults as tsjPreset } from 'ts-jest/presets'

const config: JestConfigWithTsJest = {
  verbose: true,
  transform: {
    ...tsjPreset.transform,
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      {
        "@/utils": ["./src/utils/index"],
        "@/types": ["./src/types/index"],
        "@/i18npro": ["./src/i18npro/index"],
      },
      {
        prefix: "<rootDir>/",
      }
    ),
  },
};

export default config