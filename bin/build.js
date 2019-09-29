#!/usr/bin/env node
const path = require('path')
const typescript2 = require('rollup-plugin-typescript2')
const typescript = require('rollup-plugin-typescript')
const rollup = require('rollup');
process.title = 'roty-build';


const inputOptions = {
    input: path.resolve(process.cwd(), './input.ts'),
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
                    paths:{'tslib':['tslib.d.ts']} },
            }
        })
    ],
}

const outputOptions = {
    file: path.resolve(process.cwd(), './output.js'),
    format: 'iife',
}


async function build() {
    // create a bundle

    const bundle = await rollup.rollup(inputOptions);
    const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

build();