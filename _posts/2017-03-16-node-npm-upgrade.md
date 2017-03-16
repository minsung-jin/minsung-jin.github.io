---
layout: post
title: Node.js & NPM upgrade
---

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

