import { createSelector } from 'reselect';

// get directory reducer
const selectDirectory = state => state.directory;

// get section state from directory reducer
export const selectDirectorySection = createSelector(
    [selectDirectory],
    directory => directory.section
)