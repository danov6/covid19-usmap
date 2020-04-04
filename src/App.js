import React from "react";
import "./App.css";
import LoadingSpinner from "./LoadingSpinner";
import UnitedStatesTable from "./UnitedStatesTable";
import STATES from "./constants/States";
import Statistics from "./components/Statistics";
import Header from "./components/Header";
import Map from './components/Map';
import SidePanel from './components/SidePanel/SidePanel';
import { connect } from 'react-redux';

import USData from './constants/USData';

class App extends React.Component {
  state = {
    us_cases: 0,
    us_deaths: 0,
    us_recovered: 0,
    cityData: [],
    states: {},
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
      // console.log(err);
      // this.setState({
      //   hasError: true
      // });
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
    //https://covidtracking.com/api/states
    //https://covid19-server.chrismichael.now.sh/api/v1/CasesInAllUSStates
    // const res = await fetch(
    //   "http://covid19-api.weedmark.systems/api/v1/stats?country=US"
    // );
    // const data = await res.json();
    // const us_stats = data.data.covid19Stats;

    const us_stats = USData.data;

    //set localStorage
    // localStorage.setItem(
    //   "covid_data",
    //   JSON.stringify(this.aggregateData(us_stats))
    // );
    //localStorage.setItem("covid_data_updated", us_stats.data.lastChecked);
    setTimeout(()=>{
      this.setState({
        cityData: us_stats.covid19Stats.sort((a, b) => (a.confirmed < b.confirmed) ? 1 : -1),
        stateData: this.aggregateData(us_stats.covid19Stats),
        lastUpdated: us_stats.lastChecked
      });
    },1000);
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
  };

  render() {
    const {
      states,
      isLoading,
      us_cases,
      us_deaths,
      us_recovered,
      cityData,
    } = this.state;
    let {
      selectedCity,
      selectedState
    } = this.props;
    
    return (
      <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header />
        <main role="main" className="inner cover">
          <div>
            <SidePanel cityData={cityData} />
            {isLoading ? (
                <LoadingSpinner />
              ) : (
              <div id="main_contents">
                <Statistics
                  cases={us_cases}
                  deaths={us_deaths}
                  recovered={us_recovered}
                />
                <Map cityData={cityData} states={states}/>
                <UnitedStatesTable states={states} us_cases={us_cases} us_deaths={us_deaths} />
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedCity: state.city,
  selectedState: state.state
});

export default connect(mapStateToProps,null)(App);
