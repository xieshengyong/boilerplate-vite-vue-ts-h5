import { UserConfig, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import legacy from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from "vite-plugin-html";
import postCssPxToRem from "postcss-pxtorem";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === "build";

  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: false,
      }),
      legacy({
        targets: ["defaults", "not IE 11", "iOS >= 10.3", "safari >= 10", "Android > 39"],
      }),
    ],

    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "/src/styles/common.less";',
        },
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 100,
            propList: ["*"],
          }),
        ],
      },
    },

    base: isBuild ? (mode === "tx" ? "//game.gtimg.cn/images/ymzx/web202312pc/" : "//cdnchinacoding.treedom.cn/static/page/") : "/",

    build: {
      assetsInlineLimit: 1, // 图片转 base64 编码的阈值
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "index.html"),
          // index_qq: path.resolve(__dirname, 'index_qq.html'),
        },
        // output: {
        //   // 静态资源分类打包
        //   chunkFileNames: 'assets/js/[name]-[hash].js',
        //   entryFileNames: 'assets/js/[name]-[hash].js',
        //   assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // },
      },
      outDir: "dist/ossweb-img/",
      assetsDir: "./",
      target: ["ios11"],
    },

    assetsInclude: ["**/*.TTF", "**/*.mp3"],

    // server
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 3000, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: "0.0.0.0", // IP配置，支持从IP启动
    },
  };
};
