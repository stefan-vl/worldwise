import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useGeolocation} from "../hooks/useGeolocation.js";
import {Button} from "./Button.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";

function Map() {
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const [lat,lng] = useUrlPosition();
    useEffect(() => {
        if(lat && lng){
            setMapPosition([lat,lng])
        }
    }, [lat, lng]);

    useEffect(() => {
        if(geolocationPosition){
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
        }
    }, [geolocationPosition]);
    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>}
            <MapContainer className={styles.mapContainer}
                center={mapPosition}
                          zoom={6}
                          scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        <span>{city.cityName}</span>
                    </Popup>
                </Marker>)}
                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}){
    const map = useMap();
    map.setView(position)

    return null;
}

function DetectClick(){
    const navigateFunction = useNavigate();
    useMapEvents({
        click: e=>navigateFunction(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map