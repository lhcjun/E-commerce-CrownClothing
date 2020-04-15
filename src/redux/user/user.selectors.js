import { createSelector } from 'reselect';

// get user reducer
const selectUser = state => state.user;

// get currentUser state from user reducer
export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);
