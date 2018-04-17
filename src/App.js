import React, { Component } from 'react';
import logo from './logo.svg';
//import Graph from './graph';
import ReactDOM from 'react-dom'
import './App.css';
import {CanvasCom, Axis} from './com.js';


class App extends Component {

	constructor (props) {
	super(props)
		this.state = {
			value: 0
		}

		this.state = {
			x : 0
		}
	}

	componentDidMount() {
		//this.updateCanvas();
		setInterval(this.Test.bind(this), 100);
	}

	Test (){
		//console.log("x = ", this.state.x);
		this.setState({x : this.state.x + 1});
		console.log("x = ", this.state.x);
	}
  render() {
    return (
      <div className="App">
	  <CanvasCom x = {this.state.x} width={600} height={400}/>
      </div>
    );
  }
}

export default App;
