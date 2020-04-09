import React from 'react';
import { connect } from 'react-redux';
import ListItems from './ListItems';
import Population from './../../constants/Population';

const SelectedStateInfo = ({selectedState, states}) => {
    return (
        <div>
            <div className="summary">
                <h3>{selectedState.province}</h3>
                <a style={{fontSize: '0.6em', textAlign: 'center'}} target="_blank" href="https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States_by_population#State_rankings">*U.S Census Bureau estimate as of 07/01/19</a>
                <table id="sidebar_info_table">
                    <tbody>
                        <tr>
                            <td>Population: </td>
                            <td>*{Population[selectedState.province].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        </tr>
                        <tr>
                            <td>Total Cases: </td>
                            <td>&nbsp;&nbsp;{selectedState.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        </tr>
                        <tr>
                            <td>Total Deaths: </td>
                            <td>&nbsp;&nbsp;{selectedState.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        </tr>
                        <tr>
                            <td>Death Rate: </td>
                            <td style={{color: 'red'}}>&nbsp;&nbsp;{((selectedState.deaths/selectedState.cases)*100).toFixed(1)}%</td>
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