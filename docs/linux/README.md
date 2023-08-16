# linux 

## JDK 的安装

### 创建目录并解压

1. 在 /usr/local/ 下创建 java ⽂件夹并进⼊

```shell
cd /usr/local
sudo mkdir java
cd java
```

2. 将上⾯准备好的 JDK 安装包解压到 /usr/local/java 中即可

```shell
sudo tar -zxvf ~/Downloads/jdk-8u351-linux-i586.tar.gz -C ./
```

解压完之后， /usr/local/java ⽬录中会出现⼀个jdk1.8.0_351的⽬录

### 配置JDK环境变量

1. 修改/etc/profile文件权限及编辑/etc/profile文件

```shell
sudo chmod o+w /etc/profile
vi /etc/profile
```

2. 编辑 /etc/profile ⽂件，在⽂件尾部加⼊如下 JDK 环境配置即可.

```shell
JAVA_HOME=/usr/local/java/jdk1.8.0_351
CLASSPATH=$JAVA_HOME/lib/
PATH=$PATH:$JAVA_HOME/bin
export PATH JAVA_HOME CLASSPATH
```

3.执⾏如下命令让环境变量⽣效

```shell
source /etc/profile
```

#### 验证JDK安装结果

```shell
java -version
```

## 防火墙

添加端口

```shell
firewall-cmd --permanent --zone=public --add-port=42616/tcp
```

删除端口

```shell
firewall-cmd --permanent --zone=public --remove-port=8084/tcp
```

查看放行的端口

```shell
firewall-cmd --list-all
```

刷新防火墙状态

```shell
firewall-cmd --reload
```

## Github Action 部署

#### 一、为啥子要使用 Github Action?
随着前后端项目的分离，前端项目的部署无非就是把打包之后的代码丢到 nginx 指定的静态资源目录下就完事了，但是随着项目升级迭代，每次都需要进行 打包、登录服务器、上传代理。频繁地操作让人很难受。所以目前市面上有很多自动化构建工具，比如 jenkins之类的。之前在网上看到 Github Action 后，便想尝试一下，下面是我进行配置的过程，大部分来自Ctrl C, 遇到的一些问题谨在此做一个记录。

#### 二、在 github 页面进行配置

##### 1. 生成 token
（1）登录 Github 后点击右上角的头像，选择 Settings
![Settings](https://upload-images.jianshu.io/upload_images/25245988-286cd2b66cf3057b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（2）在左侧列表中选择 Delveloper Settings
![Delveloper Settings](https://upload-images.jianshu.io/upload_images/25245988-3b3d5e43a6952bfc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（3）选择 Personal access tokens
![Personal access tokens](https://upload-images.jianshu.io/upload_images/25245988-0b9400cfba12d9b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（4） 点击 Generate new token 按钮、出现以下界面
![Generate new token](https://upload-images.jianshu.io/upload_images/25245988-908b681967c8f2a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（5）输入note，选择 repo 和 workflow，然后点击最下面的  Generate token，记得复制保存生成的 token
（6）回到需要配置的项目中，点击仓库的 Settings， 点击Add a new secret按钮，自己起个Secret名称并填入刚申请的token值，点击Add secret按钮。并且配置服务器 Host、端口、服务器登录密码、用户名（自动部署时将链接该服务器）
![image.png](https://upload-images.jianshu.io/upload_images/25245988-2ae0d1bed8c7e528.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 2.编写 yml 文件
（1）点击 Action 按钮
![image.png](https://upload-images.jianshu.io/upload_images/25245988-069095d59c3b7a90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（2）编写 Aciton
```
name: Auto Publish Website # 自动部署的名称
on:
  push:
    tags: # 当我们提交代码为tag 是以'v'开头的时候才会触发自动部署到服务端 如 git push tag v0.1.0
      - 'v*'
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest # 运行环境，告诉它运行在什么环境
    steps: # 步骤

    # 第一步：下载源码（CI/CD拉取代码到自己的本地）
    - name: Checkout
      uses: actions/checkout@main

    # 第二步：打包构建
    - name: Build
      uses: actions/setup-node@master
    - run: npm install # 安装第三方包
    - run: npm run build # 打包
    - run: tar -zcvf release.tgz dist
    # 把dist等文件，打包压缩为release.tgz

    # 第三步：发布 Release
    - name: Create Release # 创建Release，可以在仓库看到一个个版本
      id: create_release
      uses: actions/create-release@master
      env:
        GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }} # 之前GitHub添加的Token
      with:
        tag_name: ${{ github.ref }} # (tag)标签名称
        release_name: Release ${{ github.ref }}
        draft: false # 是否是草稿
        prerelease: false # 是否是预发布

    # 第四步：上传构建结果到 Release（把打包的tgz上传到Release）
    - name: Upload Release Asset
      id: upload-release-asset
      uses: actions/upload-release-asset@master
      env:
        GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
      with:
        upload_url: ${{ steps.create_release.outputs.upload_url }} # 上传地址，通过创建Release获取到的
        asset_path: ./release.tgz # 要上传文件
        asset_name: release.tgz # 上传后的文件名
        asset_content_type: application/x-tgz

    # 第五步：部署到服务器
    - name: Deploy
      uses: appleboy/ssh-action@master # 使用ssh链接服务器
      with:
        host: ${{ secrets.HOST }} #配置的服务器地址
        username: ${{ secrets.USERNAME }} #配置的服务器用户名
        password: ${{ secrets.PASSWORD }} #配置的密码
        port: ${{ secrets.PORT }} #配置的端口
        script: | # 执行命令（运行到服务器）cd：要确保服务器有这个目录； wget：下载上一步的release到服务器； tar：解压； 安装依赖；启动服务
          cd /data/www/oppnys.com
          wget https://github.com/oppnys/oppnys.com/releases/latest/download/release.tgz -O release.tgz
          tar zxvf release.tgz
          yes | cp -r -f dist/* ./
```
##### 3. 当我们每次提交代码为tag时，是以'v'开头的时候才会触发自动部署到服务端 ，比如：
```
git push tag v0.1.0
```

#### 三、写到最后
花了一天时间研究了这个，读了网上好多案例，终于整出来了，不知道对不对，但是在我的项目中是跑起来的！



