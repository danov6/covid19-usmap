import React from "react";
import "./App.css";
import LoadingSpinner from "./LoadingSpinner";
import StatesTable from "./components/StatesTable";
import Statistics from "./components/Statistics";
import Header from "./components/Header/Header";
import Map from './components/Map';
import SidePanel from './components/SidePanel/SidePanel';
import { connect } from 'react-redux';
import { getCities } from './store/actions/cities'

import USData from './constants/USData';

//API for new data http://covid19-api.weedmark.systems/api/v1/stats?country=US
class App extends React.Component {
  state = {
    cityData: [],
    states: {},
    lastUpdated: null,
    selectedState: {},
    isLoading: true
  };

  async componentDidMount() {
    try {
      //Get city data
      await this.props.getCities();

      //Set city data
      this.fetchAllData();
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

  fetchAllData = async () => {
    const us_stats = this.props.cities;

    setTimeout(()=>{
      this.setState({
        cityData: us_stats.sort((a, b) => (a.confirmed < b.confirmed) ? 1 : -1),
        stateData: this.aggregateData(us_stats),
        lastUpdated: new Date()
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
  };

  render() {
    const {
      states,
      isLoading,
      cityData,
    } = this.state;
    //console.log('props', this.props);
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
                <StatesTable states={states} />
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.cities.cities,
  selectedCity: state.cities.selectedCity,
  selectedState: state.states.selectedState
});

export default connect(mapStateToProps, { getCities })(App);
