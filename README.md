# my-vue3
实现vue3相关功能

## 初始化vue3项目

### 初始化项目

+ 使用pnpm构建项目

  ```bas
  // 全局安装pnpm
  npm install -g pnpm
  
  // pnpm初始化项目
  pnpm init
  ```

  

+ 使用pnpm方式安装依赖会使依赖包全部在==node_modules/.pnpm==文件夹中，不方便引用，因此需将依赖包外置在node_modules文件夹中：

  根部录下新增.npmrc文件

  ```.npmrc
  // .npmrc
  shamefully-hoist = true
  ```

+ 安装开发依赖库

  "esbuild": "^0.14.50",

   "minimist": "^1.2.6",

   "typescript": "^4.7.4"

  ```bash
  pnpm install esbuild minimist typescript
  ```

  
