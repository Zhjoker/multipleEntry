let fs=require('fs')
let htmlWebpackPlugin=require('html-webpack-plugin');

function getEntry(){
  let entrtConfig={};
  let files=fs.readdirSync('./src/pages');
  for(let i=0;i<files.length;i++){
    let fileName=files[i];
      entrtConfig[fileName]='./src/pages/'+fileName+'/index.js';
  }
  return entrtConfig;
}

function getHtmlTemplate(){
  let configs=[];
  let files=fs.readdirSync('./src/pages');
  for(let i=0;i<files.length;i++){
    let fileName=files[i];
     let htmlPlugin=new  htmlWebpackPlugin({
          filename: './'+fileName+'/index.html', // 输出目录
          template: './src/pages/'+fileName+'/index.html', // 模版文件
          inject: true, // 引入 js 的位置，body 底部
          chunks: [fileName],
          minify:{
            collapseWhitespace: true,
          },
      })
      configs.push(htmlPlugin)
  }
  return configs;

}
// {
//   collapseWhitespace:true //折叠空白区域 也就是压缩代码
// }
module.exports={
  getEntry,
  getHtmlTemplate
}