import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

export default class CalculatorPreview extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let loading = ( this.props.appState == 'loading' ) ? 'true' : 'false' ;
		return (
			<Scene>
				<a-assets>
					<img src="./app/assets/images/tutorial.png" id="tutorial" />
					<img src="./app/assets/images/error.png" id="error" />
					<img src="./app/assets/images/error-material.png" id="error-material" />
					<img src="./app/assets/images/loading.png" id="loading" />
					<img src="./app/assets/images/free.png" id="free" />
				</a-assets>

				<Entity id="preview-wrapper" position="0 1 0">
					<Entity id="curvedimage-preview"
						material={{
							side: 'double',
							transparent:'true',
							shader: 'flat',
							repeat: '-1 1',
							src: this.props.assetSrc
						}}
						geometry={{
							primitive: 'cylinder',
							openEnded: true,
							segmentsRadial: 96,
							thetaLength: this.props.thetaLength,
							thetaStart: this.props.thetaStart,
							radius: this.props.r,
							height: this.props.h }} />
					</Entity>

					<Entity id="sky" primitive='a-sky' material={{ color: '#f0f0f0' }} />

					<a-text
						value='loading...'
						color='#21897C'
						align='center'
						position='0 1 -3'
						scale='3 3 1'
						visible={loading} >
							<a-animation
							attribute="scale"
							easing="linear"
							dur="800"
							direction="alternate"
							repeat="indefinite"
							from="3 3  1"
							to="3.1 3.1 1"></a-animation>
					</a-text>

				</Scene>
			);
		}
	}
