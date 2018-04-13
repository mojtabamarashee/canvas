import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom'
import './App.css';
import {CanvasCom, Axis} from './com.js';


class App extends Component {

	 constructor (props) {
		 super(props)
		this.state = {
		  value: 0
		}
	  }
	componentDidMount() {
	   setInterval(this.TestFun.bind(this), 100);
	   // store intervalId in the state so it can be accessed later:
	}

	TestFun (){
	   this.setState({ value : this.state.value +1 });
	}



  render() {
    return (
      <div className="App">
        //<header className="App-header">
        //  <img src={logo} className="App-logo" alt="logo" />
        //  <h1 className="App-title">Welcome to React</h1>
        //</header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		<CanvasCom>
			<Axis name={this.state.value}/>	
		</CanvasCom>
      </div>
    );
  }
}

export default App;
