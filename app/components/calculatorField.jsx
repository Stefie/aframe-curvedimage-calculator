import React from 'react';
import ReactDOM from 'react-dom';

export default class CalculatorField extends React.Component {
	constructor(props) {
		super(props);
	}
	_handleFocus(e) {
		e.target.select();
	}
	render() {
		let opts = {};
		opts['min'] = !this.props.type ? '0.0000' : '';

		return (
			<div className="flex-wrapper">
				<label>{ this.props.label }</label>
				<div className="field-wrapper">
					<input
						type={ this.props.type ? this.props.type : 'number' }
						onFocus={this._handleFocus.bind(this)}
						onChange={this.props.onChange }
						value={ this.props.value }
						placeholder={ this.props.placeholder }
						max={ this.props.max }
						disabled={ this.props.disabled }
						{...opts}  />
					<span className="postfix">{ this.props.postfix } {this.props.deleteIcon} </span>
				</div>
			</div>
		);
	}
}
