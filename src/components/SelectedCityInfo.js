import React from 'react';
import States from './../constants/States';
import { connect } from 'react-redux';

const SelectedCityInfo = ({selectedCity}) => {
    return (
        <div>
            <h3>{selectedCity.data.city + ", " + States[selectedCity.data.state].replace('US-','')}</h3>
            <table id="city_info_table">
                <tbody>
                    <tr>
                        <td>Population: </td>
                        <td>{selectedCity.data.population}</td>
                    </tr>
                    <tr>
                        <td>Total Cases: </td>
                        <td>{selectedCity.cases}</td>
                    </tr>
                    <tr>
                        <td>Total Deaths: </td>
                        <td>{selectedCity.deaths}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = state => ({
    selectedCity: state.city,
});

export default connect(mapStateToProps,null)(SelectedCityInfo);