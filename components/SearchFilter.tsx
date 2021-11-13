/* eslint-disable func-style */
import react, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { searchRegions, searchTags } from '../utils/interfaces';
import styles from './SearchFilter.module.css';
import { searchFilterStruct } from '../utils/interfaces';
import { SearchContext } from '../pages/search';

const SearchFilter: react.FC = () => {

    const context = useContext(SearchContext);
    if (!context) return null;

    // useState for tag selection
    const[ tag, setTag ] = useState('all');
    let handleTagChange = (selection) => {
        setTag(selection.target.value);
    };

    // useState for Region selection
    const[ region, setRegion ] = useState('all');
    let handleRegionChange = (selection) => {
        setRegion(selection.target.value);
    };

    // useState for Key word search
    const[ searchWord, setSearchWord ] = useState('');

    // Object to return to database
    let searchParameters: searchFilterStruct = {
        // Values are updated on form change
        tagParam: tag,
        regionParam: region,
        searchWordParam: searchWord,
        dateParam: new Date()
    };

    // Dynamically Route to new page based on user criteria
    const router = useRouter();
    const getSearch = () => {
        // // Actions to take when form is submitted
        // router.push(`search/${region}/${tag}/${searchWord}`);

        // // NOTE: needs proper return;
        // return searchParameters;
        context.UpdateCurrentFilters(searchParameters);
    };

    return (
        <div>
            <div className={styles.search}>
                <input
                    type="text"
                    className={styles.searchTerm}
                    onChange={(word) => {
                        // useState's `setsearchWord` assigns to value to `searchWord`
                        // NOTE: takes you to 404 page since there is no search data
                        return setSearchWord(word.target.value);
                    }}
                />
                <button className={styles.searchButton} onClick={getSearch}></button>
            </div>

            <select className={styles.select} onChange={handleRegionChange}>
                <option value="all">Select Region</option>
                {searchRegions.map((regionSelect) => {
                    return <option key={regionSelect.label}>{regionSelect.value}</option>;
                })}
            </select>

            <select className={styles.select} onChange={handleTagChange}>
                <option value="all">Select Tag</option>
                {searchTags.map((tagSelect) => {
                    return <option key={tagSelect.label}>{tagSelect.value}</option>;
                })}
            </select>
        </div>
    );
};

export default SearchFilter;
