import React from 'react';
import States from "./../constants/States";
import { connect } from 'react-redux';
import CityListItems from './CityListItems';
import SelectedCityInfo from './SelectedCityInfo';

const SidePanel = ({cityData, selectedCity, selectedState}) => {
    
  let info = 'Top 5 Cities';
  if(Object.keys(selectedCity).length > 0){
    info = <SelectedCityInfo />
  }else{
    info = <CityListItems cityData={cityData}/>;
  }
  return (
      <aside style={{width: '25%', height: '100%', position: 'fixed', left: 0, backgroundColor: 'rgb(80, 80, 80)', top: 142}}>
          {info}
          <hr/>
          <h5>Controls</h5>
          <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="customSwitch1" />
          <label className="custom-control-label" htmlFor="customSwitch1">Heatmap</label>
          </div>
      </aside>
    );
}

const mapStateToProps = state => ({
  selectedCity: state.city,
  selectedState: state.state
});

export default connect(mapStateToProps,null)(SidePanel);