import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

import * as actions from '../actions';

const initial = {
    loadingProfile: false, profile: {},
    loadingHomework: false, homework: [],
    loadingMenu: false, menu: [],
    loadingCalendar: false, calendar: [],
    loadingTimetable: false, timetable: [],
    authToken: null, hydrated: false
};

export default handleActions({
    [actions.updateHomeworkSuccess]: (state, action) => {
        return {...state, homework: state.homework.map(homework => {
            if(homework.id === action.payload.id) {
                return {...homework, ...action.payload.partial};
            } else {
                return homework;
            }
        })}
    },
    [actions.saveHomeworkSuccess]: (state, action) => {
        return {...state, homework: [...state.homework, action.payload.homework]};
    },
    [actions.deleteHomeworkSuccess]: (state, action) => {
        return {...state, homework: state.homework.filter(homework => homework.id !== action.payload.id)};
    },
    [actions.loginSuccess]: (state, action) => ({...state, authToken: action.payload}),
    [actions.downloadPending]: (state, action) => ({...state, [`loading${action.payload}`]: true}),
    [actions.downloadSuccess]: (state, action) => ({...state, [`loading${action.payload.group}`]: false, [action.payload.group.toLowerCase()]: action.payload.data}),
    [actions.downloadFailure]: (state, action) => ({...state, [`loading${action.payload.group}`]: false}),
    [REHYDRATE]: (state, action) => ({...state, ...action.payload.datastore, hydrated: true}),
    [actions.logout]: (state, action) => ({...initial, hydrated: true})
}, initial);