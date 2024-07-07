
/* eslint-disable */
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer,TileLayer,Marker,Popup, useMap, useMapEvent } from 'react-leaflet';
import styles from './Map.module.css'
import Button from './Button';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import { useUrlPosition } from '../hooks/useUrlPosition';



function Map() {
    const {cities}=useCities();
    const [map,setMap]=useState([ 40,0])
    const {isLoading: isLoadingPosition,
      position: geoLocationPosition,
      getPosition,
    }=useGeolocation();
    
    const[mapLat,mapLng]= useUrlPosition();
    
   

    useEffect(()=>{
     if(mapLat && mapLng) setMap([mapLat,mapLng]);
     },[mapLat,mapLng])


    useEffect (()=>{
         if(geoLocationPosition) setMap([geoLocationPosition.lat,geoLocationPosition.lng]);
    },[geoLocationPosition]) 
    return (
        <div className={styles.mapContainer} >
         {!geoLocationPosition&& <Button type="position" onClick={getPosition} >{isLoadingPosition? "...loading": "use your location"}</Button>}
           <MapContainer  center={map}
                          zoom={6}  
                          scrollWheelZoom={true}
                          className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
   {cities.map((city => <Marker position={[city.position.lat,city.position.lng]} key={city.id}  >
      <Popup>
        <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker>))}
    <ChangeCenter center={map}/>
    <DetectClick/>
  </MapContainer>
       
        </div>
    )
}

function ChangeCenter ({center}){
 const mapView = useMap();
 mapView.setView(center);
 return null;
}

function DetectClick(){
  const navigate = useNavigate();
     useMapEvent({
      click:(e)=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
      
     } )
     
} 

export default Map
