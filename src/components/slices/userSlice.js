import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const uniqObject = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};
export const userLogin=createAsyncThunk('loginuser',async(userCredentialsObject , thunkApi)=>{
    let response = await axios.post('http://localhost:5000/user-api/login',userCredentialsObject);
    let data = response.data;
    if(data.message === 'success') {
        localStorage.setItem("username", data.userObj.username);
        localStorage.setItem("token", data.payload);
        toast.success('Successfully Logged in', uniqObject);
        return data.userObj;
    } else {
        toast.error('Invalid credentials or account not exist', uniqObject);
        return thunkApi.rejectWithValue(data);
    }
})
let userSlice=createSlice({
    name:'user',
    initialState:{
        userObj:{},
        isError:false,
        isSuccess:false,
        isLoading:false,
        errMsg:''
    },
    reducers:{
        clearLoginStatus:(state)=>{
            toast.success('Successfully Logged out', uniqObject);
            state.isSuccess = false;
            state.userObj = null;
            state.isError = false;
            state.errMsg = '';
            return state;
        }
    },
    extraReducers:{
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.errMsg='';
        },
        [userLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg=action.payload.message;
        }
    }
})
export const { clearLoginStatus }=userSlice.actions;
export default userSlice.reducer