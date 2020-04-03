export default (state={}, action) => {
    switch (action.type) {
        case 'SET_STATE':
            return action.data;
        case 'REMOVE_STATE':
            return {};
        default:
            return state
    }
};