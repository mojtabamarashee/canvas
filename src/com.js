
import ReactDOM from 'react-dom'
import React, { Component } from 'react';

export class Axis extends Component {
  render() {
    return (null);
  }
};

class cnavas  extends Component {
  render() {
    return (null);
  }
}



export class CanvasCom extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);


		{React.Children.map(this.props.children, (child, i) => {
		  // Ignore the first child
			console.log(child.props.name)
		})}





    }







    render() {






        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

//export default {CanvasCom, Axis};
