import React from 'react';

var moment = require('moment');

const StateTable = (props) => {

    const city_data = props.selectedState.keyId.sort().map((c,i)=>{
        return (
            <tr key={i}>
              <td>{c.name.replace(', US','')}</td>
              <td>{c.cases}</td>
              <td>{c.deaths}</td>
              <td>{moment(new Date(props.lastUpdated)).startOf('hour').fromNow()}</td>
            </tr>
        );
    });

    return (
        <div className="table-responsive">
            <h1>{props.selectedState.province}</h1>
            <table style={{width: '100%', fontSize: '1.2em', color: '#fff'}} className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Total Cases</th>
                    <th>Deaths</th>
                    <th>Last Updated</th>
                </tr>
                </thead>
                <tbody>
                    {city_data}
                </tbody>
            </table>
        </div>
    );
}

export default StateTable;