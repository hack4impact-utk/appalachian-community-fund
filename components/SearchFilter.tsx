/* eslint-disable func-style */
import react, { useState, useContext } from 'react';
import { IconButton, Paper, InputBase, Divider } from '@mui/material';
import { Search } from '@mui/icons-material';
import { searchFilterStruct } from '../utils/interfaces';
import { SearchContext } from '../pages/search';
import TagDropdown from './TagDropdown';
import CategoryDropdown from './CategoryDropdown';
import AddressSearchBar from './AddressSearchBar';

const SearchFilter: react.FC = () => {

    const context = useContext(SearchContext);
    if (!context) return null;

    // useState for Key word search
    const[ searchWord, setSearchWord ] = useState('');

    // Dynamically Route to new page based on user criteria
    const getSearch = () => {
        //We need to combine all the ID's into a string so we can use it for filtering
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
                    <AddressSearchBar />
                    <div style={{ flex: 2 }} />
                </div>
                
            </div>
        </div>
    );
};

export default SearchFilter;
