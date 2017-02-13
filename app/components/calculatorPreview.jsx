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

          <Entity
            text="value: loading...; color: #21897C; align: center;  width: 20;"
            position='0 1.2 -3'
            visible={loading} >
            <a-animation
              attribute="scale"
              easing="linear"
              dur="800"
              direction="alternate"
              repeat="indefinite"
              from="1 1  1"
              to="1.05 1.05 1"></a-animation>
          </Entity>

        </Scene>
      );
    }
  }
