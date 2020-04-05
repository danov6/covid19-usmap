import React from 'react';

const Controls = () => {
    return (
        <div>
            <h5>Controls</h5>
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                <label className="custom-control-label" htmlFor="customSwitch1">Heatmap</label>
            </div>
        </div>
    );
}

export default Controls;