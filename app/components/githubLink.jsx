import React from 'react';
import ReactDOM from 'react-dom';

export default class GitHub extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let loading = ( this.props.appState == 'loading' ) ? 'true' : 'false' ;
    return (
      <section className="overlay-content github-link">
        <a href="https://github.com/Stefie/aframe-curvedimage-calculator" target="blank" title="View on GitHub"><span className="icon-github"></span></a>
      </section>
    );
  }
}
