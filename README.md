# 溯源云平台 小程序

小程序后台账号：suyuan@flian.com

当前版本： 1.0.4 体验版

后台API URL： https://zt.fulldao.cn


## Setup
项目根目录和 /src 下都要运行 ```yarn``` 命令安装 node modules

项目根目录下安装的是开发工具相关的 npm 包，主要用于运行 gulp 和进行 eslint 代码检查

/src 是小程序项目目录，需要在微信开发者工具中指定 /src 为项目目录，并运行 「构建 npm 」命令。

## Development

启动 gulp 进行 SASS 编译：

在根目录下运行 ```yarn dev``` , 可以实时编译.scss文件到同目录的.wxss文件。


## Deployment
在微信开发者工具中点击上传，并设置版本号和备注。

## 扫二维码拉起小程序

扫二维码拉起小程序的URL地址：http://flian.iask.in/tracing/

只要二维码的 URL 开头包含以上网址即可拉起小程序，目前在开发阶段最多支持 5 个二维码，修改当前支持的二维码需在小程序后台配置。

目前这个URL的 service 是在测试服务器上的 nginx 中配置的。