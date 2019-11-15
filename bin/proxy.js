#!/usr/bin/env node
// 引入koa
const koa = require('koa');
const path = require('path')
const static = require('koa-static');
const cors = require('koa2-cors');
const proxy = require('koa-proxy');


process.title = 'roty-server';

const app = new koa();


app.use(cors());

app.use(proxy({
    host: 'http://localhost:1901'
}));

// 配置静态web服务的中间件
// app.use(static(path.resolve(process.cwd(), './')));
// 监听端口
app.listen(3001, function () {
    console.log('启动成功');
})