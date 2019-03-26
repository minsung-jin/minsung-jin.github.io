---
layout: post
title: Node.js & NPM upgrade
---

# Install

* [nodesource](https://github.com/nodesource/distributions) 에서 데비안 계열과 레드햇 계열 설치 방법은 참고 할 수 있다.

### 기존에 이미 node.js가 설치되어 있는 경우 먼저 제거한다.

- 기존 npm module 제거
```
$ pm ls -gp | awk -F/ '/node_modules/ && !/node_modules.*node_modules/ {print $NF}' | xargs npm -g rm
```
- 기존 node.js 제거
```
$ cd /usr/local
/usr/local# sudo rm -r bin/node bin/npm include/node lib/node_modules share/man/man/node.1
$ cd ~
$ rm -r .npm
```

### node.js 를 사용자 계정으로 설치

##### [nvm](https://github.com/creationix/nvm) 설치
using cURL
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
or Wget:
```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

* 사용자 계정이 activation 될 때 node.js 도 activation 되도록 설정
    * 사용자 계정의 .bashrc 에 nvm use v6.x 를 추가 후 .bashrc 실행
```
$. .bashrc
```

Windows 의 경우

nvm windows 버전 설치: https://github.com/coreybutler/nvm-windows 를 통해 설치

### nvm 을 이용하여 sudo permission 없이 node.js 설치

* 32bit 와 64bit를 명시하려면 아래와 같이 추가
```
$ nvm install 10.15.3 64
```

* 사용자 계정이 activation 될 때 node.js 도 activation 되도록 설정
    * 사용자 계정의 .bashrc 에 nvm use v6.x 를 추가 후 .bashrc 실행
```
$. .bashrc
```

# Node.js upgrade

##### 기존에 Node.js가 설치 되어있는 상태에서 Node.js를 최신버전으로 upgrade 하는 방법

 - 현재 NodeJs 버전 확인하기
 ```
 λ node -v
 v6.10.0
 ```
 - 강제로 캐시 삭제
 ```
 $ sudo npm cache clean -f
 npm WARN using --force I sure hope you know what you are doing.
 ```
 - n 모듈 설치
 ```
 $ sudo npm install -g n
 /usr/local/bin/n -> /usr/local/lib/node_modules/n/bin/n
 /usr/local/lib
 └ n@2.1.0
 ```
 - n 모듈을 사용하여 Node.js 설치
 ```
 $ sudo n stable

     install : node-v6.0.0
         mkdir : /usr/local/n/versions/node/6.0.0
         fetch : https://nodejs.org/dist/v6.0.0/node-v6.0.0-linux-x64.tar.gz
 #################################################################### 100.0%
    installed : v6.0.0
 ```
 - 다른 버전의 Node.js를 설치하려면 아래와 같이 명령어 입력
 ```
 sudo n 5.11.0
 ```
 - 새로운 Node.js 버전 확인하기
 ```
 $ node -v
 v6.0.0
 ```
 - 여기서 버전이 바뀌지 않았거나 에러가 발생한다면, 파일링크를 직접 설정
 ```
 $ sudo ln -sf /usr/local/n/versions/node/6.0.0/bin/node /usr/bin/node
 ```

# NPM upgrade

 - 현재 npm 버전 확인하기
 ```
 $ npm -v
 3.6.0
 ```
 - npm 으로 npm 설치
 ```
 $ sudo npm install -g npm
 /usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
 /usr/local/lib
 └ npm@3.8.8
 ```
 - 새로운 npm 버전 확인하기
 ```
 $ npm -v
 3.8.8
 ```
