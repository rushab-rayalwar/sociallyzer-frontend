import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux";

import { addUserDetails } from "../../redux/features/user/userSlice.js";

export default function AuthInitializer({children}) {
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAuthInfo(){
            let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/auth`,{withCredentials:true});
            if(response.data.success){
                console.log("User Data", response.data);
                dispatch(addUserDetails(response.data.data));
            }
        }
        getAuthInfo();
    },[]);

  return (
    <>
        {children}
    </>
  )
}