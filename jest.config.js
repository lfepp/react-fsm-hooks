module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpe?g|png|otf|eot|ttf|woff|woff2|svg|css|gif)$':
      '<rootDir>/src/tests/fileMock.ts',
  },
  modulePaths: ['<rootDir>/src'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testRegex: '\\.spec\\.(j|t)sx?$',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
};
