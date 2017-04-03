> React 작업환경 설정

# Hello React

### Global Package Install
 - babel : 아직 ECMAScript6를 지원하지 않는 환경에서 ECMAScript6 Syntax를 사용 할 수 있게 함.
```
$ npm install -g babel
```

### Create Project
 - helloReact 라는 디렉토리 생성 후 npm init 명령어를 사용하여 Node.js 프로젝트를 생성.
 ```
 $ mkdir helloReact && cd helloReact
 $ npm init
```

### Dependuncy & Plugin Install
 - React관련 패키지를 -save 옵션을 통하여 package.json에 의존 패키지들을 추가 함.
```
 $ npm install --save react react-dom
```
 - babel에서 사용 될 플러그인 설치
 - 해당 모듈들은 개발환경에서만 사용되므로 -save-dev 옵션으로 설치
```
$ npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 webpack webpack-dev-server
```
 - webpack과 webpack-dev-server를 로컬모듈로 설치하는 이유는 webpack의 livereload와 비슷한 기능인 --hot 옵션을 사용하기 위함
 - webpack을 실행할 때는 ```./node_modules/.bin/webpack-dev-server --hot``` 이런식으로 실행 할 수 있음
 - 현재 설치된 의존 모듈은 다음과 같다
```
  "dependencies": {
    "react": "^15.4.2",
    "react-dom": "^15.4.2"
  },
  "devDependencies": {
    "babel-core": "^6.24.0",
    "babel-loader": "^6.4.1",
    "babel-preset-es2015": "^6.24.0",
    "babel-preset-react": "^6.23.0",
    "webpack": "^2.3.2",
    "webpack-dev-server": "^2.4.2"
  }
```

### Directory 구조
```
hello-react
├── package.json         
├── public            # 서버 public path
│   └── index.html    # 메인 페이지
├── src               # React.js 프로젝트 루트
│   ├── components    # 컴포넌트 폴더
│   │   └── App.js    # App 컴포넌트
│   └── index.js      # Webpack Entry Point
└── webpack.config.js # Webpack 설정파일
```
 - Webpack Entry Point는 Webpack 모듈에서 가장 처음으로 읽어들일 파일이다.
 - 이파일에서부터 시작해서, 해당 파일에서 import한 다른 모듈들을 불러온다.
 - 아래와 같이 디렉토리 구조를 생성한다.
```
mkdir src src/components public && touch public/index.html src/components/App.js src/index.js webpac
```

### Compiler, Server, Loader 설정
 - webpack 설정하기
 - ECMAScript6를 컴파일해주고 개발서버를 열어주는 webpack의 설정파일을 수정.
 - webpack.config.js
```
module.exports = {
    entry: './src/index.js',
 
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
 
    devServer: {
        inline: true,
        port: 7777,
        contentBase: __dirname + '/public/'
    },
 
    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
};
```
 - webpack의 역할은 entry부터 시작하여 필요한 모듈들을 모두 불러와서 한 파일로 합쳐 bundle.js에 저장한다.
 - 추가적으로 모듈을 통하여 ES6문법으로 작성된 코드를 ES5 형태로 변환도 해준다.
 - 개발서버의 포트는 ```7777```로 설정되어 있다.
 - 개발서버는 파일이 변동될 때마다 다시 컴파일하고, 연결된 브라우저를 새로고침해주는 기능을 가지고 있다.
 - package.json
```
  "scripts": {
    "start": "webpack-dev-server --hot --host 127.0.0.1"
  },
```
 - npm start 명령어를 콘솔에서 입력 했을때, webpack-dev-server가 실행 되도록 ```package.json```의 ```scripts```에 추가 한다.
 - ```--host```옵션을 추가하지 않으면 localhost가 아닌 외부에서 접근이 불가함.

 ### HTML, JS

  - index.html
  - ```div id="app"```을 react 프로젝트의 root element로 지정
  - webpack에서 react라이브러리 및 기타 자바스크립트 파일들이 하나로 합쳐진 ```bundle.js```를 로드
```
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <title>React App</title>
   </head>
 
   <body>
      <div id="root"></div>
      <script src="bundle.js"></script>
   </body>
</html>
```
 - ```src/components/App.js```
 - 파일 및 컴포넌트의 첫 문자를 대문자로 하는 react의 naming convention을 지킨다.
 - ```import``` ES6에서 새로 도입된 키워드 ```require('...')```의 역할을 함
 - ```export``` ES6에서 새로 도입된 키워드 ```module.export = App```과 같다.
```
import React from 'react';
 
class App extends React.Component {
    render(){
 
        return (
                <h1>Hello React</h1>
        );
    }
}
 
export default App;
```
 - src/index.js
 - App 컴포넌트를 불러와서 root element에 렌더링 한다.
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
 
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

### Webpack-dev-server RUN
```
$ npm start
```
또는 아래와 같이 실행 가능하다.
```
$ ./node-module/.bin/webpack-dev-server --hot --host 127.0.0.1
```
 - 브라우저에서 ```http://localhost:7777```의 주소로 확인가능
