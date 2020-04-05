import React from 'react';
import States from '../../constants/States';

const ListItems = ({data, title, limit}) => {
    return (
        <div>
            <table id="city_list">
              <thead>
                <tr>
                  <td className="city"><u>City</u></td>
                  <td><u>Cases</u></td>
                  <td><u>Deaths</u></td>
                </tr>
              </thead>
              <tbody>
                {data.slice(0,(typeof limit === "undefined" ? data.length : limit)).map((c,i) => (
                  <tr key={i}>
                    <td className="city">{c.city + ', ' + States[c.province].replace('US-','')}</td>
                    <td>{c.confirmed}</td>
                    <td>{c.deaths}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default ListItems;