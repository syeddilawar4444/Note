import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  selectedComponent: string;
  selectedMapComponent: string;
}

const initialState: AppState = {
  selectedComponent: "",
  selectedMapComponent: "",
};

export const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSelectedComponent: (state, action: PayloadAction<string>) => {
      state.selectedComponent = action.payload;
    },
    setSelectedMap: (state, action: PayloadAction<string>) => {
      state.selectedMapComponent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedComponent, setSelectedMap } = appSlice.actions;

export default appSlice.reducer;
