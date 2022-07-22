import React, { ReactElement } from "react";
import styles from "./SearchInput.module.css";


const SearchInput = ({querySearch, setSearchQuery}): ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.search}>
                    <input 
                        type="text" 
                        className={styles.searchTerm} 
                        placeholder="Search ..."
                        value={querySearch}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                        />
                </div>
            </div>
        </div>
        
    )
}

export default SearchInput;
