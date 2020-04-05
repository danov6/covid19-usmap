import React from "react";
import moment from "moment";
import { connect } from 'react-redux';

/*
This component is the table below the map that:
 - Shows state case and death totals
 - Allows you to select a state for more detailed info
*/

const UnitedStatesTable = ({ states, lastChecked = new Date(), removeSelectedCity, setSelectedState}) => {
  const stateData = Object.keys(states).map(key => {
    let cases = 0;
    let deaths = 0;

    states[key].forEach(state => {
      cases += state.confirmed;
      deaths += state.deaths;
    });

    return { province: key, cases, deaths, lastUpdate: lastChecked };
  }).sort((a, b) => (a.cases < b.cases) ? 1 : -1);

  const handleSelectedState = s => {
    removeSelectedCity();
    setSelectedState(s);
  };

  return (
    <div className="table-responsive">
      <table id="state_list" className="table table-striped table-sm">
        <thead>
          <tr>
            <th>State</th>
            <th>Total Cases</th>
            <th>Deaths</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {stateData.map(state => (
            <tr key={state.province} onClick={() => {handleSelectedState(state)}}>
              <td>{state.province}</td>
              <td>{state.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td>{state.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td>
                {moment(new Date(state.lastUpdate))
                  .startOf("hour")
                  .fromNow()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
    setSelectedState: data => dispatch({ type: 'SET_STATE', data }),
    removeSelectedCity: () => dispatch({ type: 'REMOVE_CITY'})
});

export default connect(null, mapDispatchToProps)(UnitedStatesTable);
