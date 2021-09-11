module.exports = {
  presets: [
    '@vue/app'
  ],
 //plugins: ['dynamic-import-node']
 "plugins": [
  ["dynamic-import-node", { "noInterop": true }]
]
}