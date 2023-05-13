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
firewall-cmd --permanent --zone=public --add-port=8848/tcp
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