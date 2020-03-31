import React from "react";
import { VectorMap } from "react-jvectormap";
import "./App.css";
import LoadingSpinner from "./LoadingSpinner";
import UnitedStatesTable from "./UnitedStatesTable";
import CitiesTable from "./CitiesTable";
import STATES from "./constants/States";
import Statistics from "./components/Statistics";
import Header from "./components/Header";
import ReactMapGL from 'react-map-gl';
import Map from './components/Map';

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        
// mapboxgl.accessToken = 'pk.eyJ1IjoiZ2x2YWxkZXoiLCJhIjoiY2s4ZGVsamIxMHRqazNsb3d1aDN6bmNvMCJ9.AzXsa9tQkXmdzyXaDUdqJw';
// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/glvaldez/ck8df394y0hn51imqb0n3yu9v'
// });

var ACCESS_TOKEN = 'pk.eyJ1IjoiZ2x2YWxkZXoiLCJhIjoiY2s4ZGVsamIxMHRqazNsb3d1aDN6bmNvMCJ9.AzXsa9tQkXmdzyXaDUdqJw';
class App extends React.Component {
  state = {
    us_cases: 0,
    us_deaths: 0,
    us_recovered: 0,
    cityData: [],
    states: {},
    hasError: false,
    lastUpdated: null,
    maxCases: {},
    maxDeaths: {},
    minCases: {},
    minDeaths: {},
    selectedState: {},
    isLoading: true
  };

  async componentDidMount() {
    try {
      //setInterval(async () =>  await this.fetchAllData(), 60 * 60 * 1000);
      await this.fetchAllData();
    } catch (err) {
      console.log(err);
      this.setState({
        hasError: true
      });
    }
  }

  componentWillUnmount() {
    clearInterval();
  }

  refreshData = () => {
    this.setState({
      isLoading: true
    });
    localStorage.clear();
    this.fetchAllData();
  };

  fetchAllData = async () => {
    // if (document.cookie === "") {
    //   localStorage.clear();
    // }
    // //multiple calls of api might not be bad
    // if (localStorage.getItem('covid_data') != null && localStorage.getItem('covid_data_updated') != null && localStorage.getItem('covid_data_recovered') != null) {
    //   //check localStorage
    //   let us_data = JSON.parse(localStorage.getItem('covid_data'));

    //   //set US totals
    //   this.setUSTotals(us_data);

    //   //set state max and min totals
    //   this.setMinAndMaxValues(us_data);

    //   this.setState({
    //     us_recovered: localStorage.getItem('covid_data_recovered'),
    //     stateData: us_data,
    //     lastUpdated: localStorage.getItem('covid_data_updated'),
    //   });
    // } else {
    //   const res = await fetch('http://covid19-api.weedmark.systems/api/v1/stats?country=US')
    //   const data = await res.json();
    //   const us_stats = data.data.covid19Stats;

    //   //set localStorage
    //   localStorage.setItem('covid_data', JSON.stringify(this.groupData(us_stats)));
    //   localStorage.setItem('covid_data_updated', data.data.lastChecked);

    //   this.setState({
    //     stateData: this.groupData(us_stats),
    //     lastUpdated: data.data.lastChecked
    //   });
    // }

    const res = await fetch(
      "http://covid19-api.weedmark.systems/api/v1/stats?country=US"
    );
    const data = await res.json();
    const us_stats = data.data.covid19Stats;

    //set localStorage
    localStorage.setItem(
      "covid_data",
      JSON.stringify(this.aggregateData(us_stats))
    );
    localStorage.setItem("covid_data_updated", data.data.lastChecked);

    this.setState({
      cityData: us_stats,
      stateData: this.aggregateData(us_stats),
      lastUpdated: data.data.lastChecked
    });
  };

  aggregateData = data => {
    const map = data.reduce(
      (acc, currentValue) => {
        if (!acc.states[currentValue.province]) {
          acc.states[currentValue.province] = [currentValue]
        }
        else {
          acc.states[currentValue.province].push(currentValue)
        }

        if (currentValue.province.toLowerCase() === "recovered") {
          acc.recovered = currentValue.recovered;
        }

        acc.deaths += currentValue.deaths;
        acc.cases += currentValue.confirmed;
        return acc;
      },
      { deaths: 0, cases: 0, recovered: 0 , states: {}}
    );

    this.setState({
      us_cases: map.cases,
      us_deaths: map.deaths,
      us_recovered: map.recovered,
      states: map.states,
      isLoading: false
    });

    //set state max and min totals
    this.setMinAndMaxValues(map.states);
  };

  // setClickListener = prov => {
  //   if (
  //     typeof STATES[prov] !== "undefined" &&
  //     document.querySelector("path[data-code=" + STATES[prov] + "]") != null
  //   ) {
  //     document
  //       .querySelector("path[data-code=" + STATES[prov] + "]")
  //       .addEventListener("click", e => {
  //         document.querySelector(
  //           "path[data-code=" + STATES[prov] + "]"
  //         ).style.fill = "#000";
  //         let { stateData } = this.state;
  //         let selectedState = stateData.filter(s => {
  //           return s.province === prov;
  //         })[0];
  //         this.setState({
  //           selectedState
  //         });
  //       });
  //   }
  // };

  setMinAndMaxValues = return_data => {
    //find max confirmed cases
    var max_confirmed = {
      province: "",
      count: 0
    };
    for (var i = 0; i < return_data.length; i++) {
      if (return_data[i].confirmed > max_confirmed["count"]) {
        max_confirmed["count"] = return_data[i].confirmed;
        max_confirmed["province"] = return_data[i].province;
      }
    }
    //find min confirmed cases
    var min_confirmed = {
      province: max_confirmed["province"],
      count: max_confirmed["count"]
    };

    for (var i = 0; i < return_data.length; i++) {
      if (return_data[i].confirmed < min_confirmed["count"]) {
        min_confirmed["count"] = return_data[i].confirmed;
        min_confirmed["province"] = return_data[i].province;
      }
    }

    //find max deaths
    var max_deaths = {
      province: "",
      count: 0
    };

    for (var i = 0; i < return_data.length; i++) {
      if (return_data[i].deaths > max_deaths["count"]) {
        max_deaths["count"] = return_data[i].deaths;
        max_deaths["province"] = return_data[i].province;
      }
    }

    //find min deaths
    var min_deaths = {
      province: max_deaths["province"],
      count: max_deaths["count"]
    };
    for (var i = 0; i < return_data.length; i++) {
      if (return_data[i].deaths < min_deaths["count"]) {
        min_deaths["count"] = return_data[i].deaths;
        min_deaths["province"] = return_data[i].province;
      }
    }

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
      for (var i = 0; i < return_data.length; i++) {
        var percent = 100 - (return_data[i].deaths / max_deaths["count"]) * 100;

        //color states on map
        colorProvince(percent, return_data[i].province);

        //add listeners to states
        this.setClickListener(return_data[i].province);
      }
    });
  };

  // onRegionClick = (e, code) => {
  //   let { stateData } = this.state;
  //   console.log(code);
  //   //document.querySelector("path[data-code="+ code +"]").style.fill = '#000';
  //   var selectedState = stateData.filter(s => {
  //     return code === STATES[s.province];
  //   })[0];
  //   this.setState({
  //     selectedState
  //   });
  // };

  render() {
    const {
      states,
      isLoading,
      us_cases,
      us_deaths,
      us_recovered,
      cityData,
      selectedState,
      lastUpdated
    } = this.state;
    const regionControls = {
      initial: {
        fill: "#175c98",
        borderColor: "#fff",
        "fill-opacity": 1,
        stroke: "none",
        "stroke-width": 0,
        "stroke-opacity": 1
      },
      hover: {
        "fill-opacity": 0.8,
        cursor: "pointer"
      },
      selected: {
        fill: "yellow",
        "fill-opacity": 1
      },
      selectedHover: {}
    };

    if (document.querySelectorAll(".jvectormap-tip").length > 0) {
      document.querySelectorAll(".jvectormap-tip")[0].remove();
    }

    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header />
        <main role="main" className="inner cover">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div style={{ width: "100%", height: 700 }}>
              <Statistics
                cases={us_cases}
                deaths={us_deaths}
                recovered={us_recovered}
              />
              <Map cityData={cityData} states={states}/>
              <UnitedStatesTable states={states} us_cases={us_cases} us_deaths={us_deaths} />
              {/* {cities.length === 0 ?
                <UnitedStatesTable states={states} /> :
                <Cities cities={cities} lastUpdated={lastUpdated} />
              } */}
            </div>
          )}
        </main>
      </div>
    );
  }
}

const colorProvince = (perc, prov) => {
  var r,
    g,
    b = 0;
  var color = "";
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  } else {
    g = 255;
    r = Math.round(510 - 5.1 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  color = "#" + ("000000" + h.toString(16)).slice(-6);
  if (
    typeof STATES[prov] !== "undefined" &&
    document.querySelector("path[data-code=" + STATES[prov] + "]") != null
  ) {
    document.querySelector(
      "path[data-code=" + STATES[prov] + "]"
    ).style.fill = color;
  }
};

export default App;
