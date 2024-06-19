// 引入一个包    实际上就是一个node.js里面的一个模块，主要是用来拼接路径的
const path = require('path');
// webpack 中所有的配置信息都应该卸载module.exports中
module.exports = {
    // entry: 指定入口文件
    entry: "./src/index.ts",
    // 入口文件指定完成之后对文件进行打包，把文件输出到指定的位置  【指定打包文件所在的目录】
    output: {
        // 指定打包文件的目录     __dirname,是一个成员，用来动态获取当前文件模块所属的绝对路径
        //  所以说path:path.resolve(__dirname,"dist")就是在打包之后的文件夹上拼接了一个文件夹，在打包时，直接生成。
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的文件名
        filename: "bundle.js"
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            // 用ts-loader 处理以ts结尾的文件
            {
                // test 指定的是规则生效的文件
                test: /\.ts$/,    // 表示去【匹配所有以ts结尾的文件
                // t要使用的loader
                use: 'ts-loader',
                // 要排除的文件
                exclude: /node-modules/
            }
        ]
    }
}
