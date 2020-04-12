import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { setSelectedState } from './../store/actions/states'
import { removeSelectedCity } from './../store/actions/cities'

/*
This component is the table below the map that:
 - Shows state case and death totals
 - Allows you to select a state for more detailed info
*/

const StatesTable = ({ states, lastChecked = new Date(), removeSelectedCity, setSelectedState}) => {
  const [ sortBy, setSortBy ] = useState('cases');
  let stateData = Object.keys(states).map(key => {
    let cases = 0;
    let deaths = 0;

    states[key].forEach(state => {
      cases += state.confirmed;
      deaths += state.deaths;
    });

    return { province: key, cases, deaths, lastUpdate: lastChecked };
  });

  //filter out non states for time being
  stateData = stateData.filter((s) => {
    return (s.province !== 'Recovered' &&
    s.province !== 'Grand Princess' &&
    s.province !== 'Guam' && 
    s.province !== 'Diamond Princess' &&
    s.province !== 'Northern Mariana Islands' &&
    s.province !== 'Virgin Islands'
     );
  });

  //handle sorting
  if(sortBy === 'province'){
    stateData = stateData.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
  }else{
    stateData = stateData.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1);
  }

  const handleSelectedState = s => {
    console.log(window.screen.width);
    if(window.screen.width <= 600){
      if(document.querySelector('aside#side_panel') != null && document.querySelector('#city_list') != null){
        document.querySelector('aside#side_panel').className = 'active';
        document.querySelector('#city_list').className = 'active';
      }
    }

    removeSelectedCity();
    setSelectedState(s);
  };

  return (
    <div className='table-responsive'>
      <table id='state_list' className='table table-striped table-sm'>
        <thead>
          <tr>
            <th onClick={()=> {setSortBy('province')}} className="select">State</th>
            <th onClick={()=> {setSortBy('cases')}} className="select">Total Cases</th>
            <th onClick={()=> {setSortBy('deaths')}} className="select">Deaths</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {stateData.map(state => (
            <tr key={state.province} onClick={() => {handleSelectedState(state)}}>
              <td>{state.province}</td>
              <td>{state.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              <td>{state.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              <td>
                {moment(new Date(state.lastUpdate))
                  .startOf('hour')
                  .fromNow()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(null, {setSelectedState,removeSelectedCity})(StatesTable);
