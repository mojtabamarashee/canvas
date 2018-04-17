
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
	UNSAFE_componentWillReceiveProps(){
		console.log("componentWillReceiveProps = ");
		this.updateCanvas();
	}

	UNSAFE_componentWillUpdate(){
		console.log("UNSAFE_componentWillUpdate = ");

	}
    componentDidMount() {
        this.updateCanvas();
		setInterval(this.Test.bind(this), 1000);
    }

	componentDidUpdate() {
        //this.updateCanvas();
		console.log("did update");
    }
	shouldComponentUpdate() {
		return false
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
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

//export default {CanvasCom, Axis};
