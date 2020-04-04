import React from 'react';
import States from './../../constants/States';

const CityListItems = ({cityData, title}) => {
    return (
        <div>
            <h4>Top 5 Cities</h4>
            <table id="city_list">
              <thead>
                <tr>
                  <td>City</td>
                  <td>Cases</td>
                  <td>Deaths</td>
                </tr>
              </thead>
              <tbody>
                {cityData.slice(0,5).map((c,i) => (
                  <tr key={i}>
                    <td>{c.city + ',' + States[c.province].replace('US-','')}</td>
                    <td>{c.confirmed}</td>
                    <td>{c.deaths}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default CityListItems;