#!/usr/bin/env node
// 引入koa
const koa = require('koa');
const path = require('path')
const static = require('koa-static');

process.title = 'roty-server';

const app = new koa();


var cors = require('koa2-cors');
app.use(cors());

// 配置静态web服务的中间件
app.use(static(path.resolve(process.cwd(), './')));
// 监听端口
app.listen(3001, function () {
    console.log('启动成功');
})



