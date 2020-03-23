import React from 'react';
import { VectorMap } from 'react-jvectormap';
import './App.css';
import abbs from './data/stateabbs';

var moment = require('moment');

class App extends React.Component {

  state = {
    countryData: {},
    stateData: [],
    hasError: false,
    lastUpdated: null
  };

  componentDidMount(){
    this.fetchNewStateData();
    //this.fetchNewCountryData();
  }

  // fetchNewCountryData = () => {
  //   fetch('https://pomber.github.io/covid19/timeseries.json')
  //   .then(res => res.json())
  //   .then(data => {
  //     const us_stats = data.data.covid19Stats.filter((s) => {
  //       return (s.country === 'US');
  //     });

  //     this.setState({
  //       stateData: us_stats,
  //       lastUpdated: data.data.lastChecked
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     this.setState({
  //       hasError: true
  //     });
  //   });
  // }

  fetchNewStateData = () => {
    fetch('https://covid19-api.weedmark.systems/api/v1/stats')
    .then(res => res.json())
    .then(data => {
      const us_stats = data.data.covid19Stats.filter((s) => {
        return (s.country === 'US');
      });

      this.setState({
        stateData: us_stats,
        lastUpdated: data.data.lastChecked
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
    const { hasError, stateData } = this.state;
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

    const state_data = stateData.map((s,i) => {
      return (
        <tr key={stateAbbs[s.province]} data-state={stateAbbs[s.province]}>
          <td>{s.province}</td>
          <td>{s.confirmed}</td>
          <td>{s.deaths}</td>
          <td>{s.recovered}</td>
          <td>{moment(new Date(s.lastUpdate)).startOf('hour').fromNow()}</td>
        </tr>
      )
    })

    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Covid-19 U.S</h3>
            <nav className="nav nav-masthead justify-content-center">
              <a className="nav-link active" href="#">Home</a>
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
          <table style={{width: '100%', fontSize: '1.2em'}}>
          <thead>
            <tr>
              <td>State</td>
              <td>Total Cases</td>
              <td>Deaths</td>
              <td>Recovered</td>
              <td>Last Updated</td>
            </tr>
          </thead>
          <tbody>
            {state_data}
          </tbody>
          </table>
          </div>
        </main>
        {/* <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>API's provided by <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Johns Hopkins CSSE</a></p>
          </div>
        </footer> */}
      </div>
    );
  }
}

const stateAbbs = {
  "Alaska": "US-AK",
  "Alabama": "US-AL",
  "Arkansas": "US-AR",
  "Arizona": "US-AZ",
  "California": "US-CA",
  "Colorado": "US-CO",
  "Connecticut": "US-CT",
  "Delaware": "US-DE",
  "Florida": "US-FL",
  "Georgia": "US-GA",
  "Hawaii": "US-HI",
  "Iowa": "US-IA",
  "Idaho": "US-ID",
  "Illinois": "US-IL",
  "Indiana": "US-IN",
  "Kansas": "US-KS",
  "Kentucky": "US-KY",
  "Louisiana": "US-LA",
  "Massachusetts": "US-MA",
  "Maryland": "US-MD",
  "Maine": "US-ME",
  "Michigan": "US-MI",
  "Minnesota": "US-MN",
  "Missouri": "US-MO",
  "Mississippi": "US-MS",
  "Montana": "US-MT",
  "North Carolina": "US-NC",
  "North Dakota": "US-ND",
  "Nebraska": "US-NE",
  "New Hampshire": "US-NH",
  "New Jersey": "US-NJ",
  "New Mexico": "US-NM",
  "Nevada": "US-NV",
  "New York": "US-NY",
  "Ohio": "US-OH",
  "Oklahoma": "US-OK",
  "Oregon": "US-OR",
  "Pennsylvania": "US-PA",
  "Rhode Island": "US-RI",
  "South Carolina": "US-SC",
  "South Dakota": "US-SD",
  "Tennessee": "US-TN",
  "Texas": "US-TX",
  "Utah": "US-UT",
  "Virginia": "US-VA",
  "Vermont": "US-VT",
  "Washington": "US-WA",
  "Wisconsin": "US-WI",
  "West Virginia": "US-WV",
  "Wyoming": "US-WY"
 };

export default App;
