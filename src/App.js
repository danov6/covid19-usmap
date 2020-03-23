import React from 'react';
import { VectorMap } from 'react-jvectormap';
import './App.css';

class App extends React.Component {

  state = {
    data: [],
    hasError: false
  };

  componentDidMount(){
    fetch('https://covid19-api.weedmark.systems/api/v1/stats')
    .then(res => res.json())
    .then(data => {
      this.setState({
        data
      });
    })
    .catch(err => {
      console.log(err)
      this.setState({
        hasError: true
      });
    });
  }

  render(){
    const { hasError } = this.state;
    const regionControls = {
      initial: {
        fill: '#175c98',
        "borderColor": '#fff',
        "fill-opacity": 1,
        stroke: 'none',
        "stroke-width": 0,
        "stroke-opacity": 1
      },
      hover: {
        "fill-opacity": 0.8,
        cursor: 'pointer'
      },
      selected: {
        fill: 'yellow',
        "fill-opacity": 1
      },
      selectedHover: {
      }
    };
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Covid-19 U.S</h3>
            <nav className="nav nav-masthead justify-content-center">
              <a className="nav-link active" href="#">Home</a>
              <a className="nav-link" href="#">Features</a>
              <a className="nav-link" href="#">Contact</a>
            </nav>
          </div>
        </header>
        <main role="main" className="inner cover">
          <div style={{width: '100%', height: 700}}>
          <VectorMap map={ "us_aea" }
               backgroundColor='#505050'
               ref='map'
               zoomOnScroll={false}
               containerStyle={{
                   width: '100%',
                   height: '100%',
                   padding: '5%'
               }}
               regionsSelectable={true}
               regionsSelectableOne={true}
               regionStyle={regionControls}
               containerClassName="map"
              //  onRegionClick={ clickedTeam }
              //  selectedRegions= { selectedRegions }
              //  selectedMarkers= { [] }
                />
          </div>
        </main>
        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>API's provided by <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Johns Hopkins CSSE</a></p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
