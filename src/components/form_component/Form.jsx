// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitud
// e=0"
/* eslint-disable */
import {useEffect, useReducer, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../Button";
import BackButton from "../Backbutton";
import {useUrlPosition} from "../../hooks/useUrlPosition";
import Spinner from "../spinner_component/Spinner";
import Message from "../Message";
import {useCities} from "../../contexts/CitiesContext";
import {useNavigate} from "react-router";
import formReducer from "../../reducers/formReducer";




const initialState = {
    isLoadingGeoPosition: false,
    geoPositionError: "",
    cityName: "",
    country: "",
    emoji: ""
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const [
        {
            isLoadingGeoPosition,
            geoPositionError,
            cityName,
            country,
            emoji
        },
        dispatch] = useReducer(formReducer, initialState)

    const [date,
        setDate] = useState(new Date());
    const [notes,
        setNotes] = useState("");
    const [lat,
        lng] = useUrlPosition();
    const {createCity, isLoading} = useCities(); //
    const navigate = useNavigate();
    // asynchronous function responsible for handling submission of thr form
    async function handleSubmit(e) {
        e.preventDefault()
        // conditionally rendering a new city component based of the availability  of
        // cityName or a date
        if (!(cityName || date)) 
            return;
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {
                lat,
                lng
            }
        }

        await createCity(newCity) // promise
        navigate("/app/cities") // navigates programmatically back to cities comp
    }

    useEffect(() => {
        if (!lat && !lng) 
            return;
        const fetchCityData = async() => {
            try {
                dispatch({type: "geoPositionLoading"})
                // fetching reverse geolocation data
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                const data = await res.json();
                if (!data.countryCode) 
                  // using throw Error to stop executing the code. 
                    throw new Error("this doesn`t seem to be a city . click somewhere else 😗")
                    
                dispatch({type: "cityCreation", payLoad: {...data, country: data.countryName}});
            } catch (err) {
                dispatch({type: "geoPositionError", payLoad: err.message})
            }

        }
        fetchCityData();
    }, [lat, lng])

    {
        if (isLoadingGeoPosition) 
            return <Spinner/>
        if (!lat && !lng) 
            return <Message message="start by clicking somewhere on the map "/>
        if (geoPositionError) 
            return <Message message={geoPositionError}/>
        return (

            <form
                className={`${styles.form} ${isLoading
                ? styles.loading
                : " "}`}
                onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="cityName">City name</label>
                    <input
                        id="cityName"
                        onChange={(e) => dispatch({type:"cityCreation",payLoad:e.target.value})}
                        value={cityName}/>
                    <span className={styles.flag}>{emoji}</span>
                </div>

                <div className={styles.row}>
                    <label htmlFor="date">When did you go to {cityName}?</label>

                    <DatePicker
                        onChange={(date) => setDate(date)}
                        selected={date}
                        dateFormat="dd/MM/yyyy"
                        id="date"/>
                </div>

                <div className={styles.row}>
                    <label htmlFor="notes">Notes about your trip to {cityName}</label>
                    <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes}/>
                </div>

                <div className={styles.buttons}>
                    <Button type="primary">Add</Button>
                    <BackButton/>
                </div>
            </form>
        );
    }
}

export default Form;
