module.exports = {
    roots: [
        '<rootDir>/src/client'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    moduleNameMapper: {
        '\\.(css|less|scss)$': '<rootDir>/node_modules/jest-css-modules',
    },
    verbose: true,
    coveragePathIgnorePatterns: [
        '<rootDir>/src/client/index.tsx',
        '<rootDir>/src/client/components/LoginPage.tsx',
        '<rootDir>/src/client/components/RegisterPage.tsx'
    ],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50
        }
    }
};