import { createSlice } from "@reduxjs/toolkit";

type ElTriggerType = {
    isOpenedLeftMenu: boolean;
    modalState: {
        movieInfo: boolean;
    };
};

const initialState: ElTriggerType = {
    isOpenedLeftMenu: false,
    modalState: {
        movieInfo: false,
    },
};

const elTriggerSlice = createSlice({
    name: "elementTrigger",
    initialState,
    reducers: {
        changeLeftMenuState: (state, action) => {
            state.isOpenedLeftMenu = action.payload;
        },
        changeMovieInfoModalState: (state, action) => {
            state.modalState.movieInfo = action.payload;
        },
    },
});

export const { changeLeftMenuState, changeMovieInfoModalState } =
    elTriggerSlice.actions;
export default elTriggerSlice.reducer;
