
import ReactDOM from 'react-dom'
import React, { Component } from 'react';

export class Axis extends Component {
  render() {
    return (null);
  }
};


export class CanvasCom extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			x : 0
		}
	}

    componentDidMount() {
        this.updateCanvas();
		setInterval(this.Test.bind(this), 100);
    }

	componentDidUpdate() {
        //this.updateCanvas();
		//console.log("update");
        this.updateCanvas();
    }
	shouldComponentUpdate() {
		return true
    }
	Test (){
		//console.log("x = ", this.state.x);
		this.setState({x : this.state.x + 1});
	}

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 300, 300);
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.moveTo(this.state.x,0);
		ctx.lineTo(this.state.x,300);
		ctx.stroke();
	}

    render() {

		console.log("render");
		var out = this.state.x <= 10 ? (<canvas ref="canvas" width={300} height={300}/>)
        : <div/> 
		return out;

            }
}

//export default {CanvasCom, Axis};
