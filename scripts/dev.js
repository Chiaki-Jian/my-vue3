const { build } = require("esbuild");
const { resolve } = require('path')
// 使用minimist解析用户输入的指令
const args = require("minimist")(process.argv.slice(2));

const target = args._[0] || 'reactivity'
const format = args.f || 'global'
// 
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))

// iife => (function(){})()
// cjs(node) => module.exports
// esm(浏览器中的esmodule) => import
const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)

// 使用esbuild
// esbuild天生支持ts
build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile,
  bundle: true, // 将所有包全部打包到一起
  sourcemap: true,
  format: outputFormat, // 输出格式
  globalName: pkg.buildOptions?.name, // 打包全局名字
  platform: format === 'cjs' ? 'node' : 'browser',
  watch: { // 监控文件变化
    onRebuild(error) {
      if (!error) {
        console.log('rebuilt~');
      }
    }
  }
}).then(() => {
  console.log('watching~');
})