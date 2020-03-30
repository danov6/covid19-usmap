import React from "react";
import moment from "moment";

const UnitedStatesTable = ({ states, lastChecked = new Date() }) => {
  const stateData = Object.keys(states).map(key => {
    let cases = 0;
    let deaths = 0;

    states[key].forEach(state => {
      cases += state.confirmed;
      deaths += state.deaths;
    });

    return { province: key, cases, deaths, lastUpdate: lastChecked };
  });

  return (
    <div className="table-responsive">
      <table
        style={{ width: "100%", fontSize: "1.2em", color: "#fff" }}
        className="table table-striped table-sm"
      >
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
            <tr key={state.province}>
              <td>{state.province}</td>
              <td>{state.cases}</td>
              <td>{state.deaths}</td>
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

export default UnitedStatesTable;
