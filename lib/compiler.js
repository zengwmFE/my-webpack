const { getAST,getDependencies,transform } =  require('./parser')

const path  = require('path')
const fs = require('fs')
module.exports = class Compiler {
  constructor(options) {
      const {entry,output} = options
      this.entry = entry
      this.output = output
      this.modules = []
  }
  buildModule(filename,isEntry) {
      let ast = null
      if(isEntry){
          // 如果是入口文件的话，那么直接获取文件，转成ast
          ast = getAST(filename)
      }else{
        // 需要完整路径
        const absolutePath = path.join(process.cwd(),'./src')
        console.log(filename)
        ast = getAST(path.join(absolutePath,filename))
      }
      return {
        filename,
        dependencies: getDependencies(ast),
        source: transform(ast)
      }
  }
  run() {
      const entryModule = this.buildModule(this.entry,true)
      this.modules.push(entryModule)
      this.modules.map(_module=>{
          _module.dependencies.map(dependence=>{
              // 分析在文件中所拿到的依赖项，这个时候不是入口文件
              this.modules.push(this.buildModule(dependence))
          })
      })
      console.log(this.modules)
      this.emitFiles()
  }
  emitFiles(){
      // 计算应该输出到的路径
      const outputPath = path.join(this.output.path,this.output.filename)
      let module = ''
      this.modules.map(_module=>{
          module += `'${_module.filename}': function(require,module,exports){${_module.source}},`
      })
      // 生成bundle,构建出和webpack一样的包
      let bundle = `(function(modules){
        function __require__(filename){
            var fn = modules[filename];
            var module = {
                exports: {}
            };
            fn(__require__,module,module.exports);
            return module.exports
        }
        __require__('${this.entry}')
      })({${module}})`
      // 输出文件
      fs.writeFileSync(outputPath,bundle,'UTF-8')

  }
};
