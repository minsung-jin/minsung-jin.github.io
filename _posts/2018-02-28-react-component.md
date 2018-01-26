# Componet

## Create Component

### src/index.js

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/app';

    const rootElement = document.getElementById('root');    
    ReactDOM.render(<App />, rootElement);

### src/components/app.js

    import React from 'react';

    class App extends React.Component {
        render(){
            return  (
                <div>
                    <Header/>
                    <Content/>
                </div>
            );
        }
    }

    export default App;

* 컴포넌트를 만들때는 `React.component` 클래스를 상속하여 만든다.
* `<Header/>` `<Content/>` 컴포넌트를 만들어 보자.

### src/components/app.js 에 컴포넌트 추가

    import React from 'react';

    class App extends React.Component {
        render(){
            return  (
                <div>
                    <Header/>
                    <Content/>
                </div>
            );
        }
    }

    class Header extends React.Component {
        render(){
            return (
                <h1>Header</h1>
            );
        }
    }

    class Content extends React.Component {
        render(){
            return (
                <div>
                    <h2>Content</h2>
                    <p> Hey! </p>
                </div>
            );
        }
    }

    export default App;

* Class 를 여러개 포함시켜 작성 할 수 있지만, 파일로 분리하여 모듈화하면 유지 보수가 편하다.

### src/components/header.js

    import React from 'react';
    
    class Header extends React.Component {
        render(){
            return (
                <h1>Header</h1>
            );
        }
    }

    export default Header;

* 모듈에서도 `react` 를 import 시켜야 한다.

### src/components/content.js

    import React from 'react';
    
    class Content extends React.Component {
        render(){
            return (
                <div>
                    <h2>Content</h2>
                    <p> Hey! </p>
                </div>
            );
        }
    }

    export default Content;

### src/components/app.js 에 모듈화된 componet 추가

    import React from 'react';
    import Header from './header';
    import Content from './content';

    class App extends React.Component {
        render(){
            return  (
                <div>
                    <Header/>
                    <Content/>
                </div>
            );
        }
    }

    export default App;

### index.html

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

### props

* `props` 는 컴포넌트에서 사용 할 데이터 중 변동되지 않는 데이터에 이용된다. **parent** 컴포넌트에서 **child** 컴포넌트로 데이터를 전달 할 때, `props`가 사용된다.

#### props 추가하기

* 컴포넌트에서 immutable 데이터가 필요 하면, `render()` 메소드의 내부에 안에 `{ this.props.propsName }` 형식으로 넣고, 컴포넌트를 사용 할 때, `< >` 안에 `propsName="value"` 를 넣어 값을 설정한다.

##### header.js

    import React from 'react';

    class Header extends React.Component {
        render(){
            return (
                <h1>{ this.props.title }</h1>
            );
        }
    }

    export default Header;

##### content.js

    import React from 'react';

    class Content extends React.Component {
        render(){
            return (
                <div>
                    <h2>{ this.props.title }</h2>
                    <p> { this.props.body } </p>
                </div>
            );
        }
    }

    export default Content;

* contentTitle 와 contentBody props 를 넣었다.

#### props 사용하기

* App 컴포넌트에도 props를 넣어주고, App 컴포넌트에서 사용되는 props 값을 child 컴포넌트들로 아래와 같이 전달한다.

##### app.js

    import React from 'react';
    import Header from './header';
    import Content from './content';

    class App extends React.Component {
        render(){
            return  (
                <div>
                    <Header title={ this.props.headerTitle }/>
                    <Content title={ this.props.contentTitle }
                            body={ this.props.contentBody }/>
                </div>
            );
        }
    }

    export default App;

##### index.js

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/app';
    
    const rootElement = document.getElementById('root');    
    ReactDOM.render(<App headerTitle = "Welcome!"
                        contentTitle = "Developer,"
                        contentBody = "Welcome to Web"/>, rootElement);

#### props 기본값 설정

* props 값을 임의로 지정해주지 않았을 때 사용하는 기본값을 설정하는 방법
* 컴포넌트 클래스 하단에 `className.defaultProps = { proName: value}` 를 추가한다.

##### app.js

    import React from 'react';
    import ReactDOM from 'react-dom';
    import Header from './header';
    import Content from './content';

    class App extends React.Component {
        render(){
            return  (
                <div>
                    <Header title={ this.props.headerTitle }/>
                    <Content title={ this.props.contentTitle }
                            body={ this.props.contentBody }/>
                </div>
            );
        }
    }

    App.defaultProps = {
        headerTitle: 'Default header',
        contentTitle: 'Default contentTitle',
        contentBody: 'Default contentBody'
    };

    export default App;

##### index.js

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/app';
    
    const rootElement = document.getElementById('root');    
    ReactDOM.render(<App />, rootElement);

#### Type Validate

* 컴포넌트에서 원하는 props의 Type 과 전달 된 props 의 Type 이 일치하지 않을 때 콘솔에서 오류 메시지가 나타나게 하는 방법은 컴포넌트 클래스의 `propTypes` 객체를 설정하면 된다.
* 필수 `props`를 지정하는 방법으로도 사용한다.

##### content.js

    import React from 'react';    

    class Content extends React.Component {
        render(){
            return (
                <div>
                    <h2>{ this.props.title }</h2>
                    <p> { this.props.body } </p>
                </div>
            );
        }
    }

    Content.propTypes = {
        title: React.PropTypes.string,
        body: React.PropTypes.string.isRequired
    };

    export default Content;

* 두 props 의 Type을 모두 string 으로 지정하고, **body** 는 .isRequired 를 추가하여 필수 props 로 설정 한다.

##### app.js

    import React from 'react';
    import ReactDOM from 'react-dom';
    import Header from './header';
    import Content from './content';

    class App extends React.Component {
        render(){
            return  (
                <div>
                    <Header title={ this.props.headerTitle }/>
                    <Content title={ this.props.contentTitle }
                            body={ this.props.contentBody }/>
                </div>
            );
        }
    }

    App.defaultProps = {
        headerTitle: 'Default header',
        contentTitle: 5,
        contentBody: undefined
    };

    export default App;

* contentTitle 에 숫자를 지정하였고, contentBody에는 빈 값을 전달하도록 설정하였다.
* Validation 이 실패하면 브라우저에서 오류를 발생 시킨다.

### State

* 컴포넌트에서 유동적인 데이터를 다룰 때, `state` 를 사용한다. React.js 어플리케이션을 만들때에는 state 를 사용하는 컴포넌트의 갯수를 최소화 하는것이 중요하다.
* 예를들어 10개의 컴포넌트에서 유동적인 데이터를 사용 한다면, 각 데이터에 state를 사용하지 않고, props를 사용하고 10개의 컴포넌트를 포함시키는 container 컴포넌트를 사용하는게 효율적이다.

#### State Example

    import React from 'react';

    class StateExample extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                header: "Header Initial state",
                content: "Content Initial State"
            };
        }

        updateHeader(text){
            this.setState({
                header: "Header has changed"
            });
        }

        render() {
            return (
                <div>
                    <h1>{this.state.header}</h1>
                    <h2>{this.state.content}</h2>
                    <button onClick={this.updateHeader.bind(this)}>Update</button>
                </div>
            );
        }
    }

    export default StateExample;

* state 의 초기값을 설정 할 때는 constructor 메소드에서 `this.state = { }` 를 통하여 설정한다.
* state 를 렌더링 할 때는 `{ this.state.stateName }` 을 사용한다.
* state 를 업데이트 할 때는 `{ this.setState }` 메소드를 사용한다.
* ES6 클래스에서는 **auto binding** 이 되지 않으므로, setState 메소드를 사용하게 될 메소드를 **bind** 해주어야 한다. (bind 하지 않으면 React Component 가 가지고있는 멤버함수 및 객체에 접근 할 수 없다.)

### State and Props

* 유동적인 데이터를 렌더링하며, parent 컴포넌트와 communicate 하는 컴포넌트를 만들어 보자.

#### randomNumber.js

    import React from 'react';
    import ReactDOM from 'react-dom';

    class RandomNumber extends React.Component {
        updateNumber(){
            let value = Math.round(Math.random()*100);
            this.props.onUpdate(value);
        }

        constructor(props){
            super(props);
            this.updateNumber = this.updateNumber.bind(this);
        }

        render(){
            return (
                <div>
                    <h1>RANDOM NUMBER: { this.props.number }</h1>
                    <button onClick={this.updateNumber}>Randomize</button>
                </div>
            );
        }
    }

    export default RandomNumber;

* 랜덤 숫자를 나타내는 **h1** element 와 클릭하면 새로운 랜덤값으로 바뀌는 **button** element를 렌더링한다.
* 이 컴포넌트에서는 두 가지 prop 을 사용한다.
    * **number** : 랜던값
    * **onUpdate** : function 형태의 prop 으로서, parent 컴포넌트에 정의된 메소드를 실행 할 수 있게 한다.
* **this.props.onUpdate(value);** props 로 받은 함수를 실행한다.
* **constructor(props)** React 컴포넌트의 생성자 이다. **super(props)** 로 상속받은 **React.Component** 의 생성자 메소드를 실행한 후, 입력한 코드를 실행한다. **updateNumber** 메소드에서 this.props 에 접근 할 수 있도록 **binding** 을 한다.

#### app.js

    import React from 'react';
    import ReactDOM from 'react-dom';
    import Header from './header';
    import Content from './content';
    import RandomNumber from './randomNumber';

    class App extends React.Component {

        constructor(props){
            super(props);

            this.state = {
                value: Math.round(Math.random()*100)
            };

            this.updateValue = this.updateValue.bind(this);
        }

        updateValue(randomValue){
            this.setState({
                value: randomValue
            });
        }

        render(){
            return  (
                <div>
                    <Header title={ this.props.headerTitle }/>
                    <Content title={ this.props.contentTitle }
                            body={ this.props.contentBody }/>
                        <RandomNumber number={this.state.value}
                                    onUpdate={this.updateValue} />
                </div>
            );
        }
    }

    App.defaultProps = {
        headerTitle: 'Default header',
        contentTitle: 'Default contentTitle',
        contentBody: 'Default contentBody'
    };

    export default App;

* **randomNumber.js** 를 import 한다.
* 초기 state 를 설정한다.
* **updateValue()** 메소드에서 **this.setState** 에 접근 할 수 있도록 **bind** 한다.
* **state** 를 변경 할 때는 **setState( {key: value} )** 메소드 를 사용한다.
* **RandomNumber** 컴포넌트를 사용한다.

#### props vs state

* parent 컴포넌트에 의해 값이 변경 될 수 있는가?
    * props : yes
    * state : no
* 컴포넌트 내부에서 변경 될 수 있는가?
    * props : no
    * state : yes