export default (state={}, action) => {
    switch (action.type) {
        case 'SET_CITY':
            return action.data;
        case 'REMOVE_CITY':
            return {};
        default:
            return state
    }
};