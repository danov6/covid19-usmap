import React from 'react';
import States from "./../constants/States";

const SidePanel = ({cityData}) => {
    return (
        <aside style={{width: '25%', height: '100%', position: 'fixed', left: 0, backgroundColor: 'rgb(80, 80, 80)', top: 142}}>
          <h5>Top 5 Cities</h5>
          <table style={{width: '100%'}}>
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
          <hr/>
          <h5>Controls</h5>
          <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="customSwitch1" />
          <label className="custom-control-label" htmlFor="customSwitch1">Heatmap</label>
          </div>
      </aside>
    );
}

export default SidePanel;