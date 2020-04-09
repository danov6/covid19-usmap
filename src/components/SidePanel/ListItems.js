import React, { useState } from 'react';
import States from '../../constants/States';

const ListItems = ({data, title, limit}) => {
    const [ sortBy, setSortBy ] = useState('confirmed')

    //handle sorting
    if(sortBy === 'city'){
      data = data.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
    }else{
      data = data.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1);
    }
    // onClick={() => {setSortBy('city')}}
    // onClick={() => {setSortBy('confirmed')}}
    // onClick={() => {setSortBy('deaths')}}

    return (
        <div>
            <table id="city_list">
              <thead>
                <tr>
                  <th className="city select"><u>City</u></th>
                  <th className="select"><u>Cases</u></th>
                  <th className="select"><u>Deaths</u></th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0,(typeof limit === "undefined" ? data.length : limit)).map((c,i) => (
                  <tr key={i}>
                    <td className="city">{(c.city !== "" && c.city.indexOf('Unassigned') == -1) ? c.city + ', ' + States[c.province] : <i>N/A</i>}</td>
                    <td>{c.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td>{c.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default ListItems;