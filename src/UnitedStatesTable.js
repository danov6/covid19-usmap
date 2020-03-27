import React from 'react';

var moment = require('moment');

const UnitedStatesTable = (props) => {

    const state_data = props.stateData.map((s,i) => {
        return (
          <tr key={i} data-state={stateAbbs[s.province]}>
            <td>{s.province}</td>
            <td>{s.confirmed}</td>
            <td>{s.deaths}</td>
            <td>{moment(new Date(s.lastUpdate)).startOf('hour').fromNow()}</td>
          </tr>
        )
    });

    return (
        <div className="table-responsive">
            <table style={{width: '100%', fontSize: '1.2em', color: '#fff'}} className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>State</th>
                    <th>Total Cases</th>
                    <th>Deaths</th>
                    <th>Last Updated</th>
                </tr>
                </thead>
                <tbody>
                {state_data}
                </tbody>
            </table>
        </div>
    )
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

export default UnitedStatesTable;