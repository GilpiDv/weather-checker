import { useState, type ChangeEvent, type FormEvent } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    });

    const [alert, setAlert] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlert('');
        if(Object.values(search).includes('')) {
            setAlert('All fields are required')
            return
        }

        fetchWeather(search);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">City:</label>
                <input 
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City" 
                    value={search.city}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">Country:</label>
                <select 
                    id="country" 
                    name="country" 
                    value={search.country} 
                    onChange={handleChange}
                >
                    <option value="">Select country</option>
                    {countries.map(country => (
                        <option 
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value="Search" />
        </form>
    )
}
