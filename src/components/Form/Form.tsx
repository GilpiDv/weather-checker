import { countries } from "../../data/countries";
import styles from "./Form.module.css"

export default function Form() {

    return (
        <form className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="city">City:</label>
                <input 
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City" 
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="countries">Countries:</label>
                <select name="countries" id="countries">
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

            <input className={styles.submit} type="submit" value="Fetch weather" />
        </form>
    )
}
