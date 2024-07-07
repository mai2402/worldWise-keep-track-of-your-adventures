import { createContext,useCallback,useContext,useEffect,useReducer } from "react"
/* eslint-disable */

const citiesContext= createContext();
const initialState={
    isLoading : false,
    cities: [],
    error: null,
    currentCity:{},
  }
  
  const BASE_URL ="http://localhost:8000";
  
  function reducer(state,action){
    switch(action.type){
      case "loading":
        return{
          ...state, isLoading : true,
        }
      case "fetched":
        return{
          ...state, 
            isLoading:false,
            cities : action.payLoad,
        } 
      case "failed":
        return{
          ...state,
          isLoading:false,
          error: action.payLoad
        }
      case "currentCity":
        return{
          ...state,
          isLoading:false,
          currentCity:action.payLoad
          }
      case "update":
        return{
          ...state,
          isLoading:false,
          cities:[...state.cities,action.payLoad],
          currentCity:action.payLoad,
        }  
      case "delete":
        return{
          ...state,
          isLoading:false,
          cities:state.cities.filter((city)=>city.id!==action.payLoad),
          currentCity:{},
        }  
        default :
          throw new Error("Unknown Action!!");
    
    }
  
  }

function CitiesProvider({children}) {
    
    const [{isLoading ,cities,error,currentCity},dispatch]=useReducer(reducer, initialState);
    
    

    useEffect(()=>{
       
      const fetchCities = async ()=>{
  
          dispatch({type:"loading"});
        try{
               const respo = await fetch(`${BASE_URL}/cities`);
                const cities = await respo.json();
                dispatch({type:"fetched", payLoad: cities})
                console.log("fetched",cities)
               
  
        }
        catch(e){
          dispatch({type:"failed", payLoad: error})
          console.error(e)
        }
      }
             fetchCities();
    },[error])

   

      const getCity= useCallback( async function getCity(id){
        if(Number(id)=== currentCity.id)return;
                dispatch({type:"loading"})
              try{
                     const response = await fetch(`${BASE_URL}/cities/${id}`);
                      const data  = await response.json();
                      dispatch({type:"currentCity" ,payLoad : data});
        
              }
              catch(e){
                dispatch({type:"failed", payLoad: error})
                console.error(e)
              }
      },[currentCity.id])

      
      async function createCity(newCity) {
         dispatch({type:"loading"})
         console.log("yaaa",newCity)
        try {
          const response = await fetch(`${BASE_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: { "Content-Type": "application/json" },
          });
      
          const data = await response.json();
          dispatch({ type: "update", payLoad:data });

        } catch (e) {
          dispatch({ type: "failed", payLoad: e.message });
          console.error(e);
        }
      }
      

      async function deleteCity(id) {
        dispatch({type:"loading"})
       try {
        await fetch(`${BASE_URL}/cities/${id}`, {
           method: "DELETE",
         });
         dispatch({ type: "delete", payLoad:id });

       } catch (e) {
         dispatch({ type: "failed", payLoad: e.message });
         console.error(e);
       }
     }
     

    return <citiesContext.Provider value={{
        isLoading,
        cities,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
    }}>
         {children}
    </citiesContext.Provider>
}

function useCities(){
    const cityContext = useContext(citiesContext);
    if (cityContext=== undefined) throw new Error("You are using citiesContext outside the citiesProvider");
    return cityContext;
}
export   {CitiesProvider,useCities}