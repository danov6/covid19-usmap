import React from 'react';
import { connect } from 'react-redux';
import ListItems from './ListItems';

const SelectedStateInfo = ({selectedState, states}) => {
    return (
        <div>
            <div className="summary">
                <h3>{selectedState.province}</h3>
                <table id="sidebar_info_table">
                    <tbody>
                        <tr>
                            <td>Population: </td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>Total Cases: </td>
                            <td>{selectedState.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        </tr>
                        <tr>
                            <td>Total Deaths: </td>
                            <td>{selectedState.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        </tr>
                        <tr>
                            <td>Death Rate: </td>
                            <td style={{color: 'red'}}>{((selectedState.deaths/selectedState.cases)*100).toFixed(1)}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            <ListItems data={states[selectedState.province]} />
        </div>
    );
}

const mapStateToProps = state => ({
    selectedState: state.state,
});

export default connect(mapStateToProps,null)(SelectedStateInfo);