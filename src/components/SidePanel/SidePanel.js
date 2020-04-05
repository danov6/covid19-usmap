import React from 'react';
import { connect } from 'react-redux';
import ListItems from './ListItems';
import SelectedCityInfo from './SelectedCityInfo';
import SelectedStateInfo from './SelectedStateInfo';

const SidePanel = ({cityData, selectedCity, selectedState, states}) => {
    
  let hasState = Object.keys(selectedState).length > 0;
  let hasCity = Object.keys(selectedCity).length > 0;

  let info = <ListItems data={cityData} limit={5}/>;

  if(hasCity){
    info = <SelectedCityInfo />
    //close_button_style = 'block';
  }else if(hasState){
    info = <SelectedStateInfo states={states}/>;
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