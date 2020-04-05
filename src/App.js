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
    const us_stats = USData.data;

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
        return acc;
      },
      { states: {}}
    );

    this.setState({
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
      cityData,
    } = this.state;
    
    return (
      <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header />
        <main role="main" className="inner cover">
          <div>
            <SidePanel cityData={cityData} states={states}/>
            {isLoading ? (
                <LoadingSpinner />
              ) : (
              <div id="main_contents">
                <Statistics />
                <Map cityData={cityData} states={states}/>
                <UnitedStatesTable states={states} />
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
