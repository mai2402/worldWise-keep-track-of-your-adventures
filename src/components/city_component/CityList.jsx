/* eslint-disable */
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Spinner from '../spinner_component/Spinner'
import Message from '../Message'
import { useCities } from '../../contexts/CitiesContext'

function CityList() {
  const {cities,isLoading}=useCities();
if(isLoading) return <Spinner/>
if(cities.length === 0 ) return <Message message="Add your first city by clicking on a city on the map  "/>

return (
       
        <ul className={styles.cityList}>
     
           { cities && cities.map((city)=>(<CityItem city={city} key={city.id}/>))
            }
        </ul>
    )

}

export default CityList
