const initialState = {
    items: {},
};

export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            console.log('userInfo redux', action.data)
            return {
                items: action.data,
            };

        case 'CLEAR_LOGIN':
            return {
                items: {},
            };
        default:
            return state;
    }
}
