import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let loading = ( this.props.appState == 'loading' ) ? 'true' : 'false' ;
		return (
			<footer className="page-footer overlay-content ">
				<p>Curvedimage Calculator - A Helper App for <a href="https://aframe.io/docs/0.4.0/primitives/a-curvedimage.html" target="blank" title="A-Frame Docs:  a-curvedimage">A-Frame's a-curvedimage component</a></p>
			</footer>
		);
	}
}
