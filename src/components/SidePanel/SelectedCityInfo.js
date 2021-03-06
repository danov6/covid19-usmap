import React from 'react';
import States from './../../constants/States';
import { connect } from 'react-redux';

const SelectedCityInfo = ({selectedCity}) => {
    return (
        <div className="summary">
            <h3>{selectedCity.data.city + ", " + States[selectedCity.data.state]}</h3>
            <table id="sidebar_info_table">
                <tbody>
                    <tr>
                        <td>Population: </td>
                        <td>{selectedCity.data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr>
                        <td>Total Cases: </td>
                        <td>{selectedCity.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr>
                        <td>Total Deaths: </td>
                        <td>{selectedCity.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr>
                        <td>Death Rate: </td>
                        <td style={{color: 'red'}}>{((selectedCity.deaths/selectedCity.cases)*100).toFixed(1)}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = state => ({
    selectedCity: state.cities.selectedCity,
});

export default connect(mapStateToProps,null)(SelectedCityInfo);