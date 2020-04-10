import React from 'react';
import { connect } from 'react-redux';
import ListItems from './ListItems';
import SelectedCityInfo from './SelectedCityInfo';
import SelectedStateInfo from './SelectedStateInfo';
import Controls from './Controls';

const SidePanel = ({cityData, selectedCity, selectedState, states}) => {
    
  let hasState = Object.keys(selectedState).length > 0;
  let hasCity = Object.keys(selectedCity).length > 0;

  let info = <ListItems data={cityData} limit={5}/>;

  if (hasCity){
    info = <SelectedCityInfo />
    //close_button_style = 'block';
  }else if(hasState){
    info = <SelectedStateInfo states={states}/>;
  }
  return (
      <aside id="side_panel" >
        <div id="side_panel_close" onClick={() => {handleClose()}}>X</div>
        {info}
        <hr/>
        {/* <Controls /> */}
      </aside>
    );
}

const handleClose = () => {
  if(document.querySelector('aside#side_panel') != null){
    document.querySelector('aside#side_panel').className = "closed";
  }
};

const mapStateToProps = state => ({
  selectedCity: state.city,
  selectedState: state.state
});

export default connect(mapStateToProps,null)(SidePanel);