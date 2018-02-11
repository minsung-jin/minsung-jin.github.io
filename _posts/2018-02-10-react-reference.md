---
layout: post
title: React Reference
---

# Reference

* The ref is used to return a reference to the element. 
* Refs should be avoided in most cases, however, they can be useful when we need DOM measurements or to add methods to the components.

## Use Case

* String Attribute / Callback Function

### String Attribute

    class Hello extends React.Component {
        render() {
            return (
                <div> 
                    <input ref="myInput">
                    </input>
                </div>
            )
        }
  
        componentDidMount() {
            this.refs.myInput.value = "Hi, I used ref to do this";
        }
    }

    ReactDOM.render(
        <Hello/>,
        document.getElementById('app')
    );

* DOM에 ref="refName" 형식으로 ref를 지정한다.
* 문자열 형식으로 만든 ref 는 this.refs.refName으로 접근해야 한다.
* refs 를 사용 할 때는 컴포넌트가 렌더링 된 후 이여야 한다.

### Callback Function

    class Hello extends React.Component {
        render() {
            return (
                <div> 
                    <input ref={ref => this.input = ref}>
                    </input>
                </div>
            )
        }
        
        componentDidMount() {
            this.input.value = "I used ref to do this";
        }
    }

    ReactDOM.render(
        <Hello/>,
        document.getElementById('app')
    );

* { } 안에 함수를 넣어 ref 를 arrow function 을 사용하여 설정 함.
* 함수 안에서 어떤 변수가 ref 로 사용 될 지 직접 정의 함.
* 5번줄에서 썼던 변수를 ref 로 사용하면, String을 쓸 때 처럼 this.refs 를 사용하지 않아도 된다.

### Component example

    class Hello extends React.Component {
        handleClick() {
    	    this.textBox.input.value = "I used ref";
        } 
    
        render() {
            return (
                <div> 
                    <TextBox ref={ref=>this.textBox = ref}/>
                    <button onClick={this.handleClick.bind(this)}>Click Me</button>
                </div>
            )
        }
    }

    class TextBox extends React.Component {
        render() {
            return(
                <input ref={ref => this.input = ref}>
            </input>
            )
        }
    }

    ReactDOM.render(
        <Hello/>,
        document.getElementById('app')
    )

* TextBox 컴포넌트의 input 박스의 ref를 this.input으로 지정하였으며
* Hello 컴포넌트에서 TextBox 컴포넌트의 ref 를 this.textBox 로 지정하고
* ref 를 통하여 input 의 값을 변경한다.

## Example 

* input 과 button 이 있고 button 을 누르면 input 을 초기화 하고 Focus 를 input 으로 이동

```
class Hello extends React.Component {
    handleClick() {
        this.input.value = "";
        this.input.focus();
    } 
    
    render() {
        return (
            <div> 
                <input ref={ref=> this.input = ref}/>
                <button onClick={this.handleClick.bind(this)}>Click Me</button>
            </div>
        );        
    }
}

ReactDOM.render(
  <Hello/>,
  document.getElementById('app')
);
```

* JavaScript DOM 메소드를 이용하여 인풋박스에 포커스를 한다.
* state 및 prop 로 해결 할 수 있는 부분에서는 ref 를 사용하지 않고, component 에 의해 렌더링 된 DOM 에 직접 어떠한 처리를 하는 경우 사용하자.