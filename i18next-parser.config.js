module.exports = {
  input: './src/**/*.{ts,tsx}',
  output: './public/locales/$LOCALE/$NAMESPACE.json',
  defaultNamespace: 'common',
  defaultValue: '__MISSING_VALUE__',
  locales: ['en', 'ru'],
  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
  },
  sort: true,
};
