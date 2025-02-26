import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, loading: false, error: null },
    reducers: {
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (userData) => {
    const response = await axios.post(
        "https://login-33f8f-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
        userData
    );
    return response.data;
});

export const loginUser = ({ email }) => async (dispatch) => {
    try {
        const response = await axios.get(
            "https://login-33f8f-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
        );
        const users = Object.values(response.data);
        const user = users.find((user) => user.email === email);

        if (!user) {
            dispatch(loginFailure("Bunday foydalanuvchi yoq!"));
            return;
        }
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure("Hatolik serverda"));
    }
};

export const { loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;