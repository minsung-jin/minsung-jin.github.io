# Introduce

* It is the view layer for web applications.

## React ?

* Facebook에서 개발한 user interface library 로 개발자가 재사용 가능한 UI를 생성 할 수 있다. 
* Facebook, Instargram, Yahoo, Netfelx 를 포함한 많은 큰 서비스에서 사용되고 있다.
* Virtual DOM 이라는 개념을 사용하여 최소한의 DOM을 업데이트 하는 방식으로 UI를 렌더링 한다.

## Virtual DOM

* 실제 DOM 에 접근하여 조작하는 대신에, 이를 추상화 시킨 자바스크립트 객체를 구성하여 사용한다.
* 데이터가 변경되면 브라우저의 실제 DOM 은 아래와 같이 업데이트 한다.
    * 데이터가 업데이트되면, 전체 UI를 Virtual DOM에 리렌더링 한다.
    * 이전 Virtual DOM 에 있던 내용과 현재 Virtual DOM 의 내용을 비교 한다.
    * 변경사항만 실제 DOM 에 적용한다.
* UI를 업데이트하는 과정에서 생기는 복잡함을 모두 해소해 주고, 업데이트를 쉽게 접근 할 수 있게 한다.

## Specificity

* Virtual DOM 사용
* JSX 지원
    * DOM element를 XML과 비슷한 형태로 작성 한다.
    * 권상사항이고 필수는 아니다.
* Components 를 생성하고 재사용하여 생산성을 효율화 한다.

## Pros and Cons

* Virtual DOM을 사용하여 어플리케이션의 성는 향상
* Client / Server 양쪽에서 렌더링 가능하여 브라우저 초기 렌더링 시간을 줄일 수 있다.
* Component 의 가독성이 매우 높고 간단하여 유지보수가 편리하다.
* Framework 가 아닌 Library 로써 다른 Framework 와 같이 사용이 가능하다.
* 어플리케이션의 View 레이어만 다루므로 이외의 부분을 다른 기술을 사용해야 한다.
    * Ajax, Router, ...
* React v15 부터는 IE8 이하 버전을 지원하지 않는다.

## Hello React

* index.html, main.js, Hello.js 파일로 간단히 맛보기

### index.html

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
      </head>
      <body>
        <div id="app"></div>
        <script src="main.js"></script>
      </body>
    </html>

### Hello.js

    import React from 'react';

    function Hello () {
        return (
            <h1>Hello React!</h1>
        );
    }

    export default Hello;

* import 는 공식적으로 업데이트된 자바스크립트 문법(ES6)이며, `var React = require('react');` 와 동일한 의미이다.
* JSX 코드 `return (<h1>Hello React!</h1>)` 는 webpack 에서 번들링 과정을 거치면서 webpack 에서 사용하는 babel-loader를 통하여 Javascript 로 변환된다.

###    
    return React.createElement (
        "h1",
        null,
        "Hello React!"
    );

### main.js

    import React from 'react';
    import {render} from 'react-dom';
    import Hello from './Hello.js';

    render(<Hello/>, document.querySelector('#app'));

* Hello.js 에서 만든 컴포넌트를 불러와서 페이지에 렌더링 한다.
* React 컴포넌트를 렌더링 할 때에는 react-dom 모듈을 불러와서 render 함수를 통하여 렌더링 한다.
    * JSX 형태로 컴포넌트들 설정한다. `<컨포넌트이름/>`
    * id가 app인 element에 렌더링을 하게 설정한다.

### Component

* Hello.js 와 main.js를 변경하여 속성 추가

#### Hello.js
    import React from 'react';

    function Hello (props) {
        return (
            <h1>Hello {props.name}!</h1>
        );
    }

    export default Hello;

#### main.js
    import React from 'react';
    import {render} from 'react-dom';
    import Hello from './Hello.js';

    render(<Hello name="World"/>, document.querySelector('#app'));
