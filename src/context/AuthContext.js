import createDataContext from "./createDataContext";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { outNavigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return{...state, errorMessage: action.payload}
            case 'signin':
                return{errorMessage:'', token: action.payload}
        default:
            return state;

    }
}

const signin=(dispatch)=>{
    return async ({email, password})=>{
        try{
            const options = {
                headers: {'Content-Type': 'multipart/form-data'}
              };
              var bodyFormData = new FormData();
              // console.log(email,password);
              bodyFormData.append('uname', email);
              bodyFormData.append('passwd', password); 
              const data = await axios.post("http://192.168.0.101:8000/login",bodyFormData,options); 
              if(typeof data.data['token'] !== "undefined"){
                await AsyncStorage.setItem('token',data.data['token']);
                dispatch({type:"signin", payload: data.data['token']});
                outNavigate('Task'); // to be modified later to taskscreen after forum screen is wired in
              }
              else{
                dispatch({type:"add_error", payload:"the email or password is incorrect"})
              }
              console.log("-->",data.data['token']);

        }
        catch(error){
            console.log(error);
            dispatch({type:"add_error", payload:"something went wrong :("})
        }
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {signin},
    {token: null, errorMessage:''}
);