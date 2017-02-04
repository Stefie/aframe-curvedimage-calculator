import 'aframe';
import {Entity, Scene} from 'aframe-react';
import {CurvedImage} from 'aframe-react-components';
import React from 'react';
import ReactDOM from 'react-dom';

export default class CalculatorPreview extends React.Component {
	render() {
		return (
			<Entity primitive='a-curvedimage' material={{ color: '#ffffff', src: 'http://3.bp.blogspot.com/-XJeDRKJkryg/VZ6HYZfeAEI/AAAAAAAACmQ/rpLlAR3LPLw/s1600/PeakyIslands-3.jpg ', transparent:'false' }} geometry={{ thetaLength: '60', thetaStart: '150', radius: '5', height: '2.62' }} />
		);
	}
}
