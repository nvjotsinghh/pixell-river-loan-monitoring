module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: "tsconfig.json",
    }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transformIgnorePatterns: [
    "node_modules/(?!(jose)/)"
  ],
  moduleNameMapper: {
    "^firebase-admin/app$": "<rootDir>/test/__mocks__/firebase-admin-app.ts",
    "^firebase-admin/auth$": "<rootDir>/test/__mocks__/firebase-admin-auth.ts",
  },
};