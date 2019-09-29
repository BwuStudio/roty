#!/usr/bin/env node
const path = require('path')
const typescript2 = require('rollup-plugin-typescript2')
const rollup = require('rollup');

process.title = 'roty-watch';

var m = path.resolve(process.cwd(), './input.ts')




const inputOptions = {
    input: m,
    plugins: [
        typescript2({
            clean: true,
            typescript: require('typescript'),
            tsconfigOverride: {
                compilerOptions: { 
                    target:'es5',
                    lib:['dom','es6'],
                    declaration: false,
                    baseUrl:path.resolve(__dirname,'../'),
                    paths:{'tslib':['tslib.d.ts']} }
            }
        })
    ],
}

const outputOptions = {
    file: path.resolve(process.cwd(), './output.js'),
    format: 'iife',
}

const watchOptions = {
    ...inputOptions,
    output: [outputOptions],
    watch: {
        chokidar:false,
        include:path.resolve(process.cwd(), './**/*')
    }
}

const watcher = rollup.watch(watchOptions);

watcher.on('event', event => {
    // event.code 会是下面其中一个：
    //   START        — 监听器正在启动（重启）
    //   BUNDLE_START — 构建单个文件束
    //   BUNDLE_END   — 完成文件束构建
    //   END          — 完成所有文件束构建
    //   ERROR        — 构建时遇到错误
    //   FATAL        — 遇到无可修复的错误

    console.log(event.code)
  });