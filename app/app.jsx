import React from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import {Scene, Entity} from 'aframe-react';

import CalculatorField from './components/calculatorField.jsx';
import CalculatorPreview from './components/calculatorPreview.jsx';
import Footer from './components/footer.jsx';
import GitHub from './components/githubLink.jsx';

const CSS = require('./assets/styles/style.styl');

class CurvedimageCalculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assetCounter: 0,
			appState: '',
			wpx: '',
			hpx: '',
			ratio: '',
			c: '',
			h: '',
			r: '',
			thetaLength: '',
			thetaStart: '',
			assetSrc: '',
			publicSrc: '',
			VRMode: ''
		};
		this._handleDefaultStates = this._handleDefaultStates.bind(this);
		this._changeWpx = this._changeWpx.bind(this);

		// delete url -> reset
		// Template / Screenshot/ meta-info
	}
	componentWillMount() {
		this._handleDefaultStates('default');
	}
	componentDidMount() {
		const aScene = document.querySelector('a-scene'),
					_this = this;

		aScene.addEventListener('enter-vr', function(){
			_this.setState({
				VRMode: 'in-vr-mode'
			});
		});
		aScene.addEventListener('exit-vr', function(){
			_this.setState({
				VRMode: ''
			});
		});
	}
	_changeWpx(e) {
		let wpx = e.target.value;
		this.setState({
			wpx: wpx,
			ratio: +(wpx / this.state.hpx).toFixed(4),
			h: +( (this.state.thetaLength / 360) * (this.state.c / (wpx / this.state.hpx)) ).toFixed(4),
			publicSrc: '',
			assetSrc: '#free',
			appState: 'free'
		});
	}
	_changeHpx(e) {
		let hpx = e.target.value;
		this.setState({
			hpx: hpx,
			ratio: +(this.state.wpx / hpx).toFixed(4),
			h: +( (this.state.thetaLength / 360) * (this.state.c / (this.state.wpx / hpx)) ).toFixed(4),
			publicSrc: '',
			assetSrc: '#free',
			appState: 'free'
		});
	}
	_changeHeight(e) {
		const thetaLength = ( e.target.value * 360 ) / ( this.state.c / this.state.ratio);
		this.setState({
			h: e.target.value,
			thetaLength: +thetaLength.toFixed(4),
			thetaStart: +( 180 - ( thetaLength / 2 ) ).toFixed(4)
		});
	}
	_changeRadius(e) {
		const c = e.target.value * 2 * Math.PI;
		this.setState({
			c: +c.toFixed(4),
			r: e.target.value,
			h: +( (c * this.state.thetaLength / 360) / this.state.ratio).toFixed(4)
		});
	}
	_changeThetaLength(e) {
		this.setState({
			thetaLength: e.target.value,
			h: +( (this.state.c * e.target.value / 360) / this.state.ratio).toFixed(4),
			thetaStart: +( 180 - ( e.target.value / 2 ) ).toFixed(4)
		});
	}
	_setImageSrc(e) {
		if(!e.target.value) {
			this._handleDefaultStates('default');
			return;
		}

		this._handleDefaultStates('loading', url);

		const url = e.target.value,
					helperImg = new Image(),
					_this = this;

		// echeck if the image can be loaded
		helperImg.addEventListener("load", function(){
			const imgWidth = this.naturalWidth,
						imgHeight = this.naturalHeight,
						assets = document.querySelector('a-assets'),
						asset = document.createElement('a-asset-item'),
						assetId = _this.state.assetCounter + 1;

			asset.id = 'asset-' + assetId;
			asset.setAttribute('src', url);

			// listen to THREE.FileLoader error / loaded events for a-asset-item
			asset.addEventListener("error", function(err){
				assets.removeChild(asset);
				_this._handleDefaultStates('CORSError');
			});

			asset.addEventListener("loaded", function(){
				_this.setState({
					appState: 'preview',
					assetCounter: assetId,
					assetSrc: url,
					wpx: imgWidth,
					hpx: imgHeight,
					ratio: +(imgWidth / imgHeight).toFixed(4),
					h: +( (_this.state.thetaLength / 360) * (_this.state.c / (imgWidth / imgHeight)) ).toFixed(4)
				});
			});

			assets.appendChild(asset);
		}, false)

		helperImg.addEventListener( 'error', function(){
			_this._handleDefaultStates('urlError');
		}, false );

		helperImg.src = url;
	}

	_handleDefaultStates(type, url) {
		const c = 5 * 2 * Math.PI;
		this.setState({
			wpx: '2048',
			hpx: '1024',
			thetaLength: '90',
			thetaStart: '135',
			ratio: '2',
			r: '5',
			c: +c.toFixed(4),
			h: +( (90 / 360) * (c / (2048 / 1024)) ).toFixed(4)
		});
		switch (type) {
			case 'loading':
			this.setState({
				appState: 'loading',
				publicSrc: url,
				assetSrc: '#loading'
			});
			break;
			case 'urlError':
			this.setState({
				appState: 'error',
				assetSrc: '#error'
			});
			break;
			case 'CORSError':
			this.setState({
				appState: 'errorMaterial',
				assetSrc: '#error-material'
			});
			break;
			case 'default':
			this.setState({
				publicSrc: '',
				appState: 'default',
				assetSrc: '#tutorial'
			});
			break;
			default:
			this.setState({
				publicSrc: '',
				appState: 'default',
				assetSrc: '#tutorial'
			});
			break;
		}
	}

	render () {

		let disabledPxFields = ( this.state.appState == 'preview' ) ? true : false ;
		let lockedIcon = disabledPxFields ? "field-locked" : '' ;

		return (
			<main className={"page-wrapper " +  this.state.VRMode }>
				<GitHub />
				<section className="overlay-content">
					<form className="calculator">
						<div className="source-fields flex-wrapper">
							<div className="field-wrapper">
								<label className={"icon-icon-width " + lockedIcon} aria-label="image-width"></label>
								<input
									type="number"
									value={ this.state.wpx }
									onChange={this._changeWpx.bind(this)}
									placeholder="image-width"
									min="0"
									disabled={disabledPxFields} />
							</div>
							<div className="field-wrapper">
								<label className={"icon-icon-height " + lockedIcon} aria-label="image-height"></label>
								<input
									type="number"
									value={ this.state.hpx }
									onChange={this._changeHpx.bind(this)}
									placeholder="image-height"
									min="0"
									disabled={disabledPxFields} />
							</div>
						</div>
						<div className="calculator-fields">
							<CalculatorField
								onChange={this._changeHeight.bind(this)}
								label='&lt;a-curvedimage height="'
								postfix='"'
								value={ this.state.h }
								placeholder='height' />
							<CalculatorField
								onChange={this._changeThetaLength.bind(this)}
								label=' theta-length="'
								postfix='"'
								value={ this.state.thetaLength }
								placeholder='theta-length'
								max='360.0000' />
							<CalculatorField
								onChange={this._changeRadius.bind(this)}
								label=' radius="'
								postfix='"'
								value={ this.state.r }
								placeholder='radius' />
							<CalculatorField
								type='url'
								onChange={this._setImageSrc.bind(this)}
								label=' src="'
								postfix={'"' + lockedIcon}
								value={ this.state.publicSrc }
								placeholder='image-src' />
							<CalculatorField
								onChange={this._changeHeight.bind(this)}
								label=' theta-start="'
								postfix='"&gt;&lt;/a-curvedimage&gt;'
								value={ this.state.thetaStart }
								placeholder='theta-start'
								max='360.0000'
								disabled='true' />
						</div>
					</form>
				</section>

				<CalculatorPreview { ...this.state } />

				<Footer />
			</main>
		);
	}
}

ReactDOM.render(<CurvedimageCalculator/>, document.querySelector('.page-wrapper'));
