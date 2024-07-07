import { createContext, useContext, useReducer } from "react";
/* eslint-disable */

const AuthContext= createContext();
const initialState={
    user:null,
    isAuthenticated:false,
}

function reducer(state,action){
switch(action.type){
  case"login":
  return{
    ...state,
    isAuthenticated:true,
    user:action.payLoad,
  }
  case "logout":{
    return{
        ...state,
        isAuthenticated:false,
    }
  }
}

}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
function AuthProvider({children}){
    const [{user,isAuthenticated},dispatch]=useReducer(reducer,initialState);

    function login(email,password){
     if(email===FAKE_USER.email&& password===FAKE_USER.password ) dispatch({type:"login" , payLoad: FAKE_USER})
    }
    function logout(){
          dispatch({type:"logout"})
    }

return<AuthContext.Provider 
   value={{
    user,
    isAuthenticated,
    login,
    logout,
   }}
  >
    {children}
    </AuthContext.Provider>
}

function useAuth(){
 const Auth= useContext(AuthContext);
 if(Auth=== undefined) throw new Error("AuthContext has been used outside the AuthProvider ")
return Auth;

}

export{AuthProvider,useAuth}