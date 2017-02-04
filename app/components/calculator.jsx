import React from 'react';
import ReactDOM from 'react-dom';

class Calculator extends React.Component {
	render() {
		return (
			<section className="overlay-content">
				<header className="headline">
					<h1>Aframe curvedimage calculator</h1>
				</header>
				<form className="calculator">
					<label>Enter the pixel-values of your image:</label>
					<div className="comment-form-fields">
						<input placeholder="image-height"/>
						<input placeholder="image-width"/>
					</div>
					<label>Enter the a-frame attributes you want to use:</label>
					<div className="comment-form-fields">
						<input value={ this.state.thetaLength } placeholder="height"/>
						<input placeholder="radius"/>
						<input placeholder="theta-length"/>
						<input placeholder="theta-start"/>
						<input placeholder="scale"/>
					</div>
				</form>
				<section className="copyresults">
					<code>
						<a-curvedimage>  this.state.thetaLength  </a-curvedimage>
					</code>
				</section>
			</section>
		);
	}
}
