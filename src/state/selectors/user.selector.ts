import { createSelector } from "@reduxjs/toolkit";
import { IRootPartition } from "../partitions";

const userSelector = (state: IRootPartition) => state.user;

export const selectUserError = createSelector(
    userSelector,
    (user) => user.error
);

export const selectAvatar = createSelector(
    userSelector,
    (user) => user.avatar
);
