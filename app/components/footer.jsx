import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let helpLinks = (this.props.appState == 'errorMaterial')
                  ? <div className="help-links"><a className="button" href="https://aframe.io/docs/0.5.0/introduction/faq.html#why-does-my-asset-e-g-image-video-model-not-load" target="blank" title="Visit A-Frame's FAQ">Read more about missing CORS headers</a></div>
                  : null ;

    return (
      <footer className="page-footer overlay-content ">
        { helpLinks }
        <h2 className="footer-content">Curvedimage Calculator - A Helper App for <a href="https://aframe.io/docs/0.5.0/primitives/a-curvedimage.html" target="blank" title="A-Frame Docs:  a-curvedimage">A-Frame's &lt;a-curvedimage&gt; component</a></h2>
      </footer>
    );
  }
}
