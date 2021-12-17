/* eslint-disable func-style */
import react, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Button, IconButton, TextField, Paper, InputBase, Divider } from '@mui/material';
import { Search } from '@mui/icons-material';
import { searchRegions, searchTags } from '../utils/interfaces';
import styles from './SearchFilter.module.scss';
import { searchFilterStruct } from '../utils/interfaces';
import { SearchContext } from '../pages/search';
import TagDropdown from './TagDropdown';
import CategoryDropdown from './CategoryDropdown';

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

        const tagIDString = context.selectedTags.map(x => x.id);
        const categoryIDString = context.selectedCategories.map(x => x.id);

        const searchParams: searchFilterStruct = {
            tagParam: tagIDString.join(),
            regionParam: categoryIDString.join(),
            searchWordParam: searchWord,
            dateParam: new Date()
        }

        context.UpdateCurrentFilters(searchParams);
    };

    return (
        <div style={{ width: '100vw' }}>
            {/* <div className={styles.search}>
                <TextField
                    type="text"
                    className={styles.searchTerm}
                    onChange={(word) => {
                        // useState's `setsearchWord` assigns to value to `searchWord`
                        // NOTE: takes you to 404 page since there is no search data
                        return setSearchWord(word.target.value);
                    }}
                />
                <IconButton edge={false} onClick={getSearch}><Search /></IconButton>
            </div> */}

            <div style={{ width: '90%', margin: 'auto', display: 'block' }}>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
                    <InputBase 
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        placeholder="Search by topic..."
                        sx={{ ml: 1, flex: 1 }}
                        className="applyFont"
                    />
                    <Divider orientation="vertical" sx={{ height: 28 }} />
                    <IconButton onClick={getSearch}>
                        <Search />
                    </IconButton>
                </Paper>
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <CategoryDropdown />
                    <TagDropdown />
                    <div style={{ flex: 2 }} />
                </div>
                
            </div>
        </div>
    );
};

export default SearchFilter;
