import axios from 'axios';

let callbacks = {
    SAVE_LUNCH: []
};

export const getState = function() {
    return axios.get('/lunches')
        .then( response=>response.data )
        .then( lunches=>( { lunches, lunchChoices: ['Chicken', 'Fish', 'Vegetarian'] }));
}

export const dispatch = action => {

    switch(action.type) {
        case 'SAVE_LUNCH':
            axios.post('/lunches', { name: action.name, instructions: action.instructions, lunch: action.lunch })
                .then( d => d.data )
                .then( () => callbacks.SAVE_LUNCH.forEach(fn=>fn() ) );

        default:
            return;
    }
};


export const on = (action, fn) => {
    callbacks.SAVE_LUNCH.push(fn);
}
