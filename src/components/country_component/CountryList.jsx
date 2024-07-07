/* eslint-disable */
 import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from '../spinner_component/Spinner'
import Message from '../Message'
import { useCities } from '../../contexts/CitiesContext'

function CountryList() {   
    const {cities,isLoading}= useCities();      
    if(isLoading) return <Spinner/>
    if (!cities.length) return<Message message="start"/>

// const countries = cities.reduce((arr,city)=>{
//     if(!arr.map((el)=>el.country).includes(city.country))
       
//         return[...arr, {country: city.country, emoji: city.emoji}]
//     else return arr;
// },[])

const countries = cities.reduce((arr, city) => {
    console.log("Processing city:", city);
    if (!arr.some(el => el.country === city.country)) {
        console.log("Adding country:", city.country);
        return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
        return arr;
    }
}, []);

return (
       
        <ul className={styles.countryList }>
     
           { countries && countries.map((country)=>(<CountryItem country={country} key={country.country} />))
            }
        </ul>
    )
       

}

export default CountryList
