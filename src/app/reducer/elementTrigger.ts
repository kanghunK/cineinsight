import { MovieData } from "@/type/types";
import { createSlice } from "@reduxjs/toolkit";

type ElTriggerType = {
    isOpenedLeftMenu: boolean;
    movieInfoModal: {
        isOpened: boolean;
        data: MovieData | null;
    };
};

const initialState: ElTriggerType = {
    isOpenedLeftMenu: false,
    movieInfoModal: {
        isOpened: false,
        data: null,
    },
};

const elTriggerSlice = createSlice({
    name: "elementTrigger",
    initialState,
    reducers: {
        changeLeftMenuState: (state, action) => {
            state.isOpenedLeftMenu = action.payload;
        },
        openMovieInfoModal: (state, action) => {
            state.movieInfoModal.isOpened = true;
            state.movieInfoModal.data = action.payload;
        },
        closeMovieInfoModal: (state) => {
            state.movieInfoModal.isOpened = false;
            state.movieInfoModal.data = null;
        },
    },
});

export const { changeLeftMenuState, openMovieInfoModal, closeMovieInfoModal } =
    elTriggerSlice.actions;
export default elTriggerSlice.reducer;
