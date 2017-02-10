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
				<h2 className="footer-content">Curvedimage Calculator - A Helper App for <a href="https://aframe.io/docs/0.5.0/primitives/a-curvedimage.html" target="blank" title="A-Frame Docs:  a-curvedimage">A-Frame's &lt;a-curvedimage&gt; component</a></h2>
			</footer>
		);
	}
}
