
import ReactDOM from 'react-dom'
import React, { Component } from 'react';

export class Axis extends Component {
  render() {
    return (null);
  }
};


export class CanvasCom extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }

	componentDidUpdate() {
        //this.updateCanvas();
		//console.log("update");
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 300, 300);
		{React.Children.map(this.props.children, (child, i) => {
		  // Ignore the first child
			console.log(child.props.name)
			ctx.beginPath();
			ctx.strokeStyle = "white";
			ctx.moveTo(child.props.name,0)
			ctx.lineTo(child.props.name,300)
			ctx.stroke();
		})}

    }
    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

//export default {CanvasCom, Axis};
