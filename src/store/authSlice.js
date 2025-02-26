import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, error: null },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (userData) => {
    try {
        const response = await axios.get(
            "https://login-33f8f-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
        );

        const users = response.data;
        for (let key in users) {
            if (users[key].email === userData.email) {
                return "Bunday user bor!";
            }
        }
        await axios.post(
            "https://login-33f8f-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
            userData
        );

        return "User qoʻshildi!";
    } catch (error) {
        return "Server xatosi!";
    }
});


export const loginUser = ({ email, password }) => async (dispatch) => {
    try {
        const response = await axios.get(
            "https://login-33f8f-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
        );
        let user = null;
        for (let azob in response.data) {
            if (response.data[azob].email === email && response.data[azob].password === password) {
                user = response.data[azob];
            }
        }
        if (!user) {
            dispatch(loginFailure("Hatolik serverda yoki emailda yoki parolda!"));
            return;
        }
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure("Hatolik serverda!"));
    }
};

export const { loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;