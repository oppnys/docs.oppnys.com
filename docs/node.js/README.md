# Node.js

## 一、常见的全局对象

### 1、process 对象

> process 对象提供了 Node 进程中相关的信息，比如 Node 的运行环境，参数信息等

### 2、console 对象

> 提供了简单的调试控制台

* console.log()
  
* console.info()
  
* console.error()
  
* console.clear()
  
* console.trace()
  
* console.time()
  
* console.timeEnd()

### 3、定时器函数

* setTimeout()
  
* setInterval()
  
* setImmediate()
  
* process.nextTick()  

### 4、global

## 二、 内置模块

### 1、路径管理 path

#### 获取文件路径信息

* 获取文件路径
  
    * path.dirname(filePath: string)
    
        ```javascript
        const path = require('path')
        const dirname = '/User/oppnys/abc.txt'
        const dirname = path.dirname(basePath)  // /User/oppnys
        ```

* 获取文件名称   

    * path.basename(filePath: string)
   
       ```javascript
       const path = require('path')
       const basePath = '/User/oppnys/abc.txt'
       const basename = path.basename(basePath)  // abc.txt
        ```

* 获取文件扩展名
  
    * path.extname(filePath: string)
    
        ```javascript
        const path = require('path')
        const basePath = '/User/oppnys/abc.txt'
        const extname = path.extname(basePath)  // .txt
        ```


#### 文件路径拼接

* path.join(...paths: string[])

    ```javascript
    const path = require('path')
    const basePath = '/Users/oppnys'
    const fileName = 'abc.txt'
    const joinPath = path.join(basePath, fileName) // /Users/oppnys/abc.txt
    ```

* path.resolve(...paths: string[])
  
    ```javascript
    const path = require('path')
    const basePath = '/Users/oppnys'
    const fileName = 'abc.txt'
    const filePath = path.resolve(basePath, fileName) // /Users/oppnys/abc.txt
    ```
    
    :::tip
    resolve 判断拼接的路径字符串中，是否有以 `/` 或 `./` 或 `../` 开头的路径
    :::

    ```javascript
    const path = require('path')
    const basePath = 'Users/oppnys'
    const fileName = 'abc.txt'
    path.join(basePath, fileName) // Users/oppnys/abc.txt
    path.resolve(basePath, fileName) // /Users/dongtian/workspace/nodejs-example/Users/oppnys/abc.txt
    ```

### 2、文件系统 fs

#### 读取文件信息

* fs.stat(path: string, callback: Function)
  
> 异步读取文件信息

```javascript
const fs = require('fs')
const path = require('path')
const fileName = 'abc.txt'
const filePath = path.resolve(__dirname, fileName)
fs.stat(filePath, (err, info)=>{
    console.log(info)
})
```

* fs.statSync(path: string): Stats

> 同步读取文件信息

```javascript
const fs = require('fs')
const path = require('path')
const fileName = 'abc.txt'
const filePath = path.resolve(__dirname, fileName)

const fileInfo = fs.statSync(filePath)
console.log(fileInfo)
// Stats {
//     dev: 16777231,
//     mode: 33188,
//     nlink: 1,
//     uid: 501,
//     gid: 20,
//     rdev: 0,
//     blksize: 4096,
//     ino: 69818255,
//     size: 46,
//     blocks: 8,
//     atimeMs: 1681026909535.5366,
//     mtimeMs: 1681026836497.4744,
//     ctimeMs: 1681026836497.4744,
//     birthtimeMs: 1681025685481.022,
//     atime: 2023-04-09T07:55:09.536Z,
//     mtime: 2023-04-09T07:53:56.497Z,
//     ctime: 2023-04-09T07:53:56.497Z,
//     birthtime: 2023-04-09T07:34:45.481Z
// }

```

* fs.promises.stat(path: string)

> Promise 方式

```javascript
const fs = require('fs')
const path = require('path')
const fileName = 'abc.txt'
const filePath = path.resolve(__dirname, fileName)

fs.promises.stat(filePath).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```

#### 文件描述符

* fs.open(path: string)

> 异步读取文件描述符

* fs.openSync(path: string): number

> 同步读取文件描述符

```javascript
const fs = require('fs')
const path = require('path')

const fileName = 'abc.txt'
const filePath = path.resolve(__dirname, fileName)

fs.open(filePath, (err, fd)=>{
    if(err) return
    console.log(fd)
    fs.fstat(fd, (_, info)=>{
        console.log(info)
    })
})
```

#### 文件写操作

* fs.writeFile(path: string, data: string|Buffer [, options], callback: Function)

> 异步操作

```javascript
const fs = require('fs')
const path = require('path')

const fileName = 'abc.txt'
const filePath = path.resolve(__dirname, fileName)

// 文件写入
const content = `你好啊， 李银河\n`
fs.writeFile(filePath, content, {flag: 'a', encoding: 'utf-8'}, (err => {
    if (err){
        console.log(err)
        return
    }
}))
```

* fs.writeFileSync(path: string, data: string|Buffer[, options]): void

> 同步操作

```javascript
const fs = require('fs')
const path = require('path')

const fileName = 'abc.txt'
const filePath = path.resolve(__dirname, fileName)

// 文件写入
const content = `你好啊， 李银河\n`
fs.writeFileSync(filePath, content, {flag: 'a', encoding: 'utf-8'})
```

#### 文件读操作

* fs.readFile(path: string[, options], callback: Function)

> 异步读取文件操作

```javascript
const fs = require('fs')
const path = require('path')

const fileName = 'abc.txt'
const filePath = path.resolve(__dirname, fileName)
fs.readFile(filePath, {encoding: 'utf8'},(err, data)=>{
    console.log(data)
})
```

* fs.readFileSync(path: string[, options]): string|Buffer

> 同步读取文件

```javascript
const fs = require('fs')
const path = require('path')

const fileName = 'abc.txt'
const filePath = path.resolve(__dirname, fileName)
const fileDate = fs.readFileSync(filePath, {encoding: 'utf8'})
console.log(fileDate)
```

#### 文件夹相关操作

```javascript
const fs = require('fs')
const path = require('path')

const dirName = './data';
const dirPath = path.resolve(__dirname, dirName)
// 0. 判断文件夹是否存在
if(!fs.existsSync(dirPath)){
   // 1. 创建文件夹
   fs.mkdir(dirPath, {}, (err => {
       console.log(err)
   }))
}

// 2. 读物文件夹中的所有文件
// fs.readdir(dirPath, (err, files) => {
//     if(err) return
//     console.log(files)
// })

// function getFiles(dirname) {
//     fs.readdir(dirname, {withFileTypes: true},(err, files)=>{
//         for (const file of files) {
//             // const stat = fs.statSync(path.resolve(dirname, file))
//             // console.log(stat.isDirectory())
//             if(file.isDirectory()){
//                 getFiles(path.resolve(dirname, file.name))
//             } else {
//                 console.log(file.name)
//             }
//         }
//     })
// }
// getFiles(dirPath)

// 3. 修改文件名称
fs.rename(dirPath, path.resolve(__dirname, './now'), (err)=>{
    console.log(err)
})

```

### 3. 事件 events

#### 注册事件

* emitter.on(eventName: string, callback: Function)

```javascript
const events = require('events')
const emitter = new events.EventEmitter()

function listener(args) {
    console.log('touch', args)
}
emitter.on('touch', listener)
```

#### 注册只能触发一次的事件

* emitter.once(eventName: string, callback: Function)

```javascript
const events = require('events')
const emitter = new events.EventEmitter()

emitter.once('touch', (args)=>{
    console.log('touch 1', args)
})
```

#### 触发事件

* emitter.emit(eventName: string[, options])

```javascript

const events = require('events')
const emitter = new events.EventEmitter()
emitter.emit('touch', {name: 'oppnys'}) 
```