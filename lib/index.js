const Compiler = require('./compiler')
const options = require('../simplePack.config')
const parser = require('./parser')
const path = require('path')
new Compiler(options).run();
// const ast = parser.getAST(path.join(__dirname,'../src/index.js'))
// console.log(parser.getDependencies(ast))
// console.log(parser.transform(ast))