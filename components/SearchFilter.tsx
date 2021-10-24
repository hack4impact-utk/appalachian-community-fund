/* eslint-disable func-style */
import react, { useState } from 'react';
import { useRouter } from 'next/router';
import { searchRegions, searchTags } from '../utils/interfaces';

const SearchFilter: react.FC = () => {
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

    // Dynamically Route to new page on user search
    const router = useRouter();
    const getSearch = () => {
        router.push(`search/${region}/${tag}/${searchWord}`);
    };


    let searchParameters = {
        tagParam: tag,
        regionParam: region,
        searchWordParam: searchWord,
        dateParam: ''
    };

    return (
        <div>
            <form>
                <label>
                    Search
                    <input
                        type="text"
                        onChange={(word) => {
                            // useState's `setsearchWord` assigns to value to `searchWord`
                            // NOTE: takes you to 404 page since there is no search data
                            return setSearchWord(word.target.value);
                        }}
                    />
                </label>
                <button onClick={getSearch}>Submit</button>
            </form>

            <select onChange={handleRegionChange}>
                <option value="all">Select Region</option>
                {searchRegions.map((regionSelect) => {
                    return <option key={regionSelect.label}>{regionSelect.value}</option>;
                })}
            </select>

            <select onChange={handleTagChange}>
                <option value="all">Select Tag</option>
                {searchTags.map((tagSelect) => {
                    return <option key={tagSelect.label}>{tagSelect.value}</option>;
                })}
            </select>
            <p>{searchParameters.regionParam}</p>
            <p>{searchParameters.tagParam}</p>
            <p>{searchParameters.searchWordParam}</p>
        </div>
    );
};

export default SearchFilter;
