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
    lastUpdated: null,
    maxCases: {},
    maxDeaths: {},
    minCases: {},
    minDeaths: {}
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
        stateData: this.groupData(us_stats),
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

  groupData = (data) => {
    var grouped_data = {};
    var return_data = [];
    data.forEach((s) => {
      if(typeof grouped_data[s.province] === "undefined"){
        //add new state
        grouped_data[s.province] = {
          province: s.province,
          confirmed: s.confirmed,
          deaths: s.deaths,
          recovered: s.recovered,
          lastUpdate: s.lastUpdate,
          keyId: s.keyId
        };
      }else{
        //update existing state
        grouped_data[s.province].confirmed += s.confirmed;
        grouped_data[s.province].deaths += s.deaths;
        grouped_data[s.province].recovered += s.recovered;
        grouped_data[s.province].keyId +=  "|" + s.keyId;
      }
    });

    for(var prop in grouped_data){
      return_data.push(grouped_data[prop]);
    }

    //find max confirmed cases
    var max_confirmed = {
      province: "",
      count: 0
    };
    for(var i=0; i < return_data.length; i++){
      if(return_data[i].confirmed > max_confirmed['count']){
        max_confirmed['count'] = return_data[i].confirmed;
        max_confirmed['province'] = return_data[i].province;
      }
    }

    //find min confirmed cases
    var min_confirmed = {
      province: max_confirmed['province'],
      count: max_confirmed['count']
    };
    for(var i=0; i < return_data.length; i++){
      if(return_data[i].confirmed < min_confirmed['count']){
        min_confirmed['count'] = return_data[i].confirmed;
        min_confirmed['province'] = return_data[i].province;
      }
    }

    //find max deaths
    var max_deaths = {
      province: "",
      count: 0
    };
    for(var i=0; i < return_data.length; i++){
      if(return_data[i].deaths > max_deaths['count']){
        max_deaths['count'] = return_data[i].deaths;
        max_deaths['province'] = return_data[i].province;
      }
    }

    //find min deaths
    var min_deaths = {
      province: max_deaths['province'],
      count: max_deaths['count']
    };;
    for(var i=0; i < return_data.length; i++){
      if(return_data[i].deaths < min_deaths['count']){
        min_deaths['count'] = return_data[i].deaths;
        min_deaths['province'] = return_data[i].province;
      }
    }

    //color states on map =======NEEDS TO BE UPDATED========
    setTimeout(function(){
      for(var i=0; i < return_data.length; i++){
        var percent = 100 - ((return_data[i].confirmed / max_confirmed['count']) * 100);
        colorProvince(percent, return_data[i].province);
      }
    },3000)

    return return_data;
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
        <tr key={i} data-state={stateAbbs[s.province]}>
          <td>{s.province}</td>
          <td>{s.confirmed}</td>
          <td>{s.deaths}</td>
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

const colorProvince = (perc,prov) => {
  var r, g, b = 0;
  var color = '';
  if(perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  }
  else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  color = '#' + ('000000' + h.toString(16)).slice(-6);

  if(typeof stateAbbs[prov] !== "undefined" && document.querySelector("path[data-code="+ stateAbbs[prov] +"]") != null){
    document.querySelector("path[data-code="+ stateAbbs[prov] +"]").style.fill = color;
  }
}

export default App;
