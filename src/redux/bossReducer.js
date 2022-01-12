const initialState = {
    items: [],
};

export default function bossReducer(state = initialState, action) {
    switch (action.type) {
        case 'BOSS_LIST':
            return {
                items: action.data,
            };
        case 'TAKE_POST':
            return {
                items: action.data.id,
            };
        default:
            return state;
    }
}
