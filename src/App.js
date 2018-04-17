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
	  }

  render() {
    return (
      <div className="App">
	  <CanvasCom width={600} height={400}/>
      </div>
    );
  }
}

export default App;
