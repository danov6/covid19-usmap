import React from 'react';
import { VectorMap } from 'react-jvectormap';
import './App.css';
import LoadingSpinner from './LoadingSpinner';
import UnitedStatesTable from './UnitedStatesTable';
import StateTable from './StateTable';

class App extends React.Component {

  state = {
    us_cases: 0,
    us_deaths: 0,
    us_recovered: 0,
    stateData: [],
    hasError: false,
    lastUpdated: null,
    maxCases: {},
    maxDeaths: {},
    minCases: {},
    minDeaths: {},
    selectedState: {},
    isLoading: true,
  };

  componentDidMount(){
    this.fetchAllData();
  }
  shouldComponentUpdate(nextProps,nextState){
    return (nextState.selectedState === this.state.selectedState)
  }
  refreshData = () => {
    this.setState({
      isLoading: true,
    });
    localStorage.clear();
    this.fetchAllData();
  }

  fetchAllData = () => {

    if(document.cookie === ""){
      localStorage.clear();
    }

    if(localStorage.getItem('covid_data') != null && localStorage.getItem('covid_data_updated') != null  && localStorage.getItem('covid_data_recovered') != null){
      //check localStorage
      let us_data = JSON.parse(localStorage.getItem('covid_data'));

      //set US totals
      this.setUSTotals(us_data);

      //set state max and min totals
      this.setMinAndMaxValues(us_data);
      
      this.setState({
        us_recovered: localStorage.getItem('covid_data_recovered'),
        stateData: us_data,
        lastUpdated: localStorage.getItem('covid_data_updated'),
      });
    }else{
      //get from API
      fetch('https://covid19-api.weedmark.systems/api/v1/stats?country=US')
      .then(res => res.json())
      .then(data => {
        const us_stats = data.data.covid19Stats;

        //set localStorage
        localStorage.setItem('covid_data', JSON.stringify(this.groupData(us_stats)));
        localStorage.setItem('covid_data_updated', data.data.lastChecked);

        //set cookie to grab new data in one hour
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        document.cookie = 'recent_data=1; expires=' + now.toUTCString() + '; path=/';
        
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
  }

  groupData = (data) => {
    var grouped_data = {};
    var return_data = [];
    data.forEach((s) => {
      if(s.province === "Recovered"){
        //save U.S receovered cases obtained from API
        if(s.country === "US"){
          localStorage.setItem('covid_data_recovered', s.recovered);
          this.setState({
              us_recovered: s.recovered
          });
        }
      }else if(typeof grouped_data[s.province] === "undefined"){
        //add new state
        let city = {
          name: s.keyId,
          cases: s.confirmed,
          deaths: s.deaths
        };
        grouped_data[s.province] = {
          province: s.province,
          confirmed: s.confirmed,
          deaths: s.deaths,
          recovered: s.recovered,
          lastUpdate: s.lastUpdate,
          keyId: [city]
        };
      }else{
        //update existing state
        let city = {
          name: s.keyId,
          cases: s.confirmed,
          deaths: s.deaths
        };
        grouped_data[s.province].confirmed += s.confirmed;
        grouped_data[s.province].deaths += s.deaths;
        grouped_data[s.province].recovered += s.recovered;
        grouped_data[s.province].keyId.push(city);
      }
    });

    for(var prop in grouped_data){
      return_data.push(grouped_data[prop]);
    }

    //set US totals
    this.setUSTotals(return_data);

    //set state max and min totals
    this.setMinAndMaxValues(return_data);

    return return_data;
  }
  setUSTotals = (return_data) => {

    let us_cases = 0;
    let us_deaths = 0;

    //get total cases
    for(var i=0; i < return_data.length; i++){
      us_cases += return_data[i].confirmed;
    }

    //get total deaths
    for(var i=0; i < return_data.length; i++){
      us_deaths += return_data[i].deaths;
    }

    this.setState({
      us_cases,
      us_deaths
    });
  }
  setClickListener = (prov) => {
    if(typeof stateAbbs[prov] !== "undefined" && document.querySelector("path[data-code="+ stateAbbs[prov] +"]") != null){
      document.querySelector("path[data-code="+ stateAbbs[prov] +"]").addEventListener('click',(e)=>{
        document.querySelector("path[data-code="+ stateAbbs[prov] +"]").style.fill = '#000';
        let { stateData } = this.state;
        let selectedState = stateData.filter((s)=>{
          return (s.province === prov)
        })[0];
        this.setState({
          selectedState
        });
      });
    }
  }

  setMinAndMaxValues = (return_data) => {

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

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
      for(var i=0; i < return_data.length; i++){
        var percent = 100 - ((return_data[i].deaths / max_deaths['count']) * 100);

        //color states on map
        colorProvince(percent, return_data[i].province);

        //add listeners to states
        this.setClickListener(return_data[i].province);
      }
    }, 1000)
  }

  onRegionClick = (e,code) => {
    let { stateData } = this.state;
    console.log(code)
    //document.querySelector("path[data-code="+ code +"]").style.fill = '#000';
    var selectedState = stateData.filter((s) => {
      return code === stateAbbs[s.province]
    })[0];
    this.setState({
      selectedState
    });
  }

  render(){
    const { hasError, stateData, isLoading, us_cases, us_deaths, us_recovered, selectedState, lastUpdated } = this.state;
    const regionControls = {
      initial: {
        "fill": "#175c98",
        "borderColor": '#fff',
        "fill-opacity": 1,
        "stroke": "none",
        "stroke-width": 0,
        "stroke-opacity": 1
      },
      hover: {
        "fill-opacity": 0.8,
        "cursor": "pointer"
      },
      selected: {
        "fill": "yellow",
        "fill-opacity": 1
      },
      selectedHover: {
      }
    };

    if(document.querySelectorAll('.jvectormap-tip').length > 0){
      document.querySelectorAll('.jvectormap-tip')[0].remove();
    }

    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">U.S Coronavirus Cases</h3>
            <nav className="nav nav-masthead justify-content-center">
              <a className="nav-link active" href="#">Home</a>
              <a className="nav-link" href="#">Contact</a>
            </nav>
          </div>
        </header>
        <main role="main" className="inner cover">
          {isLoading ? <LoadingSpinner /> :
            <div style={{width: '100%', height: 700}}>
              <table style={{width: '100%', fontSize: '2em', marginTop: '8%', backgroundColor: '#2d2d2d', borderRadius: 6}}>
                <thead>
                  <tr>
                    <td>Cases</td>
                    <td>Deaths</td>
                    <td>Recoveries</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{fontSize: '1.5em'}}>{us_cases}</td>
                    <td style={{color: 'red', fontSize: '1.5em'}}>{us_deaths}</td>
                    <td style={{color: '#5aff5a', fontSize: '1.5em'}}>{us_recovered}</td>
                  </tr>
                </tbody>
              </table>
              <VectorMap map={ "us_aea" }
                  backgroundColor='#505050'
                  ref='map'
                  zoomOnScroll={false}
                  containerStyle={{
                      width: '100%',
                      height: '100%',
                      padding: '5%'
                  }}
                  regionsSelectable={false}
                  regionsSelectableOne={true}
                  regionStyle={regionControls}
                  containerClassName="map"
                  //  selectedRegions= { selectedRegions }
                  //  selectedMarkers= { [] }
                    />
              {Object.keys(selectedState).length === 0 ?
              <UnitedStatesTable stateData={stateData} /> :
              <StateTable selectedState={selectedState} lastUpdated={lastUpdated}/>
              }
            </div>
          }
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
