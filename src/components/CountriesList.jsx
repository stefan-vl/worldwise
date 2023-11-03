import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

export function CountriesList() {
    const {cities, isLoading} = useCities();
    if(isLoading){
        return <Spinner/>
    }

    if(!cities.length){
        return <Message message={"Add your first city by clicking on a city on the map"}/>
    }

    const countries = cities.filter((obj, index) => {
        return index === cities.findIndex(o => obj.country === o.country)});

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (<CountryItem country={country} key={country.id}/>))}
        </ul>
    );
}