module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "jest": true,
  },
  "extends": [
      "airbnb-typescript",
      "plugin:react/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": `${__dirname}/tsconfig.json`,
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "import"
  ],
  "rules": {
      "react/react-in-jsx-scope": "off",
  }
};