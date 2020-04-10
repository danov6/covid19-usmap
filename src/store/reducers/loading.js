/*
This reducer handles loading spinners
for updated components.
*/

const initialState = {
    statsLoading: true,
    sidepanelLoading: true,
    mapLoading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_STATS_LOADING':
            return !state.statsLoading;
        case 'TOGGLE_SIDEPANEL_LOADING':
            return !state.sidepanelLoading;
        case 'TOGGLE_MAP_LOADING':
            return !state.mapLoading;
        default:
            return state
    }
}
