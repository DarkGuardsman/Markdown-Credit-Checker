module.exports = {
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json", "mjs"],
    transform: {
        '^.+\\.(js|jsx|mjs)?$': 'babel-jest'
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    testMatch: [
        '<rootDir>/**/*.test.(js|jsx|ts|tsx|mjs)', '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx|mjs))'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};