import React from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import {Scene, Entity} from 'aframe-react';

//import Calculator from './components/calculator.jsx';

const CSS = require('./assets/styles/style.styl');

class CurvedimageCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpx: '2048',
      hpx: '1024',
      ratio: '2',
      c: false,
      h: false,
      r: '5',
      thetaLength: '90',
      thetaStart: '135',
      defaultUrl: './app/assets/images/default.png',
      currentUrl: '',
      defaulColor: '#21897C',
      color: '',
    };
    // TODO: commas & dots
    // include fonts
    // dark theme
  }
  componentWillMount() {
    this._calculateDefaultValues();
  }
  _calculateDefaultValues() {
    let c = ( this.state.r * 2 * Math.PI ),
        h = ( this.state.thetaLength / 360 ) * ( c / this.state.ratio );
    this.setState({
      c: +c.toFixed(4),
      h: +h.toFixed(4),
      currentUrl: this.state.defaultUrl
    });
  }
  _changeWpx(e) {
    let wpx = e.target.value;
    this.setState({
      wpx: wpx,
      ratio: +(wpx / this.state.hpx).toFixed(4),
      h: +( (this.state.thetaLength / 360) * (this.state.c / (wpx / this.state.hpx)) ).toFixed(4),
      currentUrl: '',
      color: this.state.defaulColor
    });
    console.log(this.state.currentUrl);
  }
  _changeHpx(e) {
    let hpx = e.target.value;
    this.setState({
      hpx: hpx,
      ratio: +(this.state.wpx / hpx).toFixed(4),
      h: +( (this.state.thetaLength / 360) * (this.state.c / (this.state.wpx / hpx)) ).toFixed(4),
      currentUrl: '',
      color: this.state.defaulColor
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
  _setImageSrc(url) {
    const img = new Image(),
          App = this;
    this.setState({
      currentUrl: ''
    });

    img.addEventListener("load", function(){
      let imgWidth = this.naturalWidth,
          imgHeight = this.naturalHeight;
      App.setState({
        currentUrl: url,
        color: '',
        wpx: imgWidth,
        hpx: imgHeight,
        ratio: +(imgWidth / imgHeight).toFixed(4),
        h: +( (App.state.thetaLength / 360) * (App.state.c / (imgWidth / imgHeight)) ).toFixed(4)
      });
    });
    img.src = url;
  }
  _calculateImageDimesions(e) {
    this._setImageSrc(e.target.value)
  }
  _handleFocus(e) {
    e.target.select();
  }
  render () {
    // TODO: cleanup
    return (
      <main className="page-wrapper">
        <section className="overlay-content">
          <header className="headline">
          </header>
          <form className="calculator">
            <div className="source-fields flex-wrapper">
              <div className="icon-icon-width" aria-label="image-width">
                <input type="number" value={ this.state.wpx } onChange={this._changeWpx.bind(this)} onFocus={this._handleFocus.bind(this)} placeholder="image-width" min="0" />
              </div>
              <div className="icon-icon-height" aria-label="image-height">
                <input type="number" value={ this.state.hpx } onChange={this._changeHpx.bind(this)} onFocus={this._handleFocus.bind(this)} placeholder="image-height" min="0" />
              </div>
            </div>

            <div className="calculator-fields">
              <div className="flex-wrapper">
                <label>&lt;a-curvedimage height="</label>
                <span><input type="number" value={ this.state.h } onChange={this._changeHeight.bind(this) } onFocus={this._handleFocus.bind(this)} placeholder="height" min="0.0000" />"</span>
              </div>
              <div className="flex-wrapper">
                <label> radius="</label>
                <span><input type="number" value={ this.state.r } onChange={this._changeRadius.bind(this) } onFocus={this._handleFocus.bind(this)} placeholder="radius" min="0.0000" />"</span>
              </div>
              <div className="flex-wrapper">
                <label> theta-length="</label>
                <span><input type="number" value={ this.state.thetaLength } onChange={this._changeThetaLength.bind(this)} onFocus={this._handleFocus.bind(this)} placeholder="theta-length" min="0.0000" max="360.0000"/>"</span>
              </div>
              <div className="flex-wrapper">
                <label> src="</label>
                <span><input type="url" value={ this.state.publicUrl } onChange={this._calculateImageDimesions.bind(this)} onFocus={this._handleFocus.bind(this)} placeholder="public url"/>"</span>
              </div>
              <div className="flex-wrapper">
                <label> theta-start="</label>
                <span><input type="number" value={ this.state.thetaStart } readOnly placeholder="theta-start" min="0.0000" max="360.0000" />
              "&gt;&lt;/a-curvedimage&gt;</span>
              </div>
            </div>
          </form>
        </section>
        <Scene>
          <Entity position="0 1 0">
            <Entity
            material={{
              side: 'double',
              transparent:'true',
              shader: 'flat',
              repeat: '-1 1',
              color: this.state.color,
              src: this.state.currentUrl }}
            geometry={{
              primitive: 'cylinder',
              openEnded: true,
              segmentsRadial: 96,
              thetaLength: this.state.thetaLength,
              thetaStart: this.state.thetaStart,
              radius: this.state.r,
              height: this.state.h }} />
          </Entity>
          <Entity primitive='a-sky' material={{ color: '#f0f0f0'}} />
        </Scene>
      </main>
    );
  }
}

CurvedimageCalculator.defaultProps = {
  defaultUrl: './app/assets/images/default.png'
};

ReactDOM.render(<CurvedimageCalculator/>, document.querySelector('.page-wrapper'));
