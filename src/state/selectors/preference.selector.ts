import { createSelector } from "@reduxjs/toolkit";
import { IRootPartition } from "../partitions";

const preferenceSelector = (state: IRootPartition) => state.preference;

export const selectPreferenceError = createSelector(
    preferenceSelector,
    (preference) => preference.error
);

export const selectDarkMode = createSelector(
    preferenceSelector,
    (preference) => preference.darkMode
);
