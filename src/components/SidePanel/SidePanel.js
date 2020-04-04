import React from 'react';
import { connect } from 'react-redux';
import CityListItems from './CityListItems';
import SelectedCityInfo from './SelectedCityInfo';

const SidePanel = ({cityData, selectedCity, selectedState}) => {
    
  let info = 'Top 5 Cities';
  let close_button_style = 'none';
  if(Object.keys(selectedCity).length > 0){
    info = <SelectedCityInfo />
    close_button_style = 'block';
  }else{
    info = <CityListItems cityData={cityData}/>;
  }
  return (
      <aside id="side_panel" >
        {/* <div id="side_panel_close" style={{display: close_button_style}} onClick={{}}>X</div> */}
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
const handleClose = () => {

}

const mapStateToProps = state => ({
  selectedCity: state.city,
  selectedState: state.state
});

export default connect(mapStateToProps,null)(SidePanel);