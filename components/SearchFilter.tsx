/* eslint-disable func-style */
import react, { useState } from 'react';
import { useRouter } from 'next/router';
import { searchRegions, searchTags } from '../utils/interfaces';

const SearchFilter: react.FC = () => {
    // useState for tag selection
    const[ tag, setTag ] = useState('Select Tag');
    let handleTagChange = (selection) => {
        setTag(selection.target.value);
    };

    // useState for Region selection
    const[ region, setRegion ] = useState('Select Tag');
    let handleRegionChange = (selection) => {
        setTag(selection.target.value);
    };

    // useState for page routing
    const[ append, setAppend ] = useState('');
    // Dynamically Route to new page on user search
    const router = useRouter();
    const getSearch = () => {
        router.push(`search/${append}`);
    };


    return (
        <div>
            <form>
                <label>
                    Search
                    <input
                        type="text"
                        onChange={(word) => {
                            // useState's `setAppend` assigns to value to `append`
                            // NOTE: takes you to 404 page since there is no search data
                            return setAppend(word.target.value);
                        }}
                    />
                </label>
                <button onClick={getSearch}>Submit</button>
            </form>

            <select onChange={handleRegionChange}>
                <option value="Select Region">Select Region</option>
                {searchRegions.map((regionSelect) => {
                    return <option key={regionSelect.label}>{regionSelect.value}</option>;
                })}
            </select>

            <select onChange={handleTagChange}>
                <option value="Select Tag">Select Tag</option>
                {searchTags.map((tagSelect) => {
                    return <option key={tagSelect.label}>{tagSelect.value}</option>;
                })}
            </select>
        </div>
    );
};

export default SearchFilter;
