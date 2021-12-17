import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/Head';
import styles from '../styles/Home.module.scss';
import SearchFilter from '../components/SearchFilter';
import InfiniteScroller from '../components/InfiniteScroller';
import { searchFilterStruct, searchContextStruct, tagStruct, categoryStruct } from '../utils/interfaces';
import { WP_Post } from '../utils/wordpressInterfaces';

const SearchContext = createContext<searchContextStruct | null>(null);

const Search: React.FC = () => {

    const [currentSearchFilters, setCurrentSearchFilters] = useState<searchFilterStruct | null>(null);
    const [allTags, setAllTags] = useState<tagStruct[]>([]);
    const [allCategories, setAllCategories] = useState<categoryStruct[]>([]);
    const [selectedTags, setSelectedTags] = useState<tagStruct[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<categoryStruct[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<WP_Post[]>([]);

    const UpdateCurrentFilters = async (newFilters: searchFilterStruct) => {
        setCurrentSearchFilters(newFilters);

        //Here we will build our search query
        let filters = '';
        if (newFilters.tagParam) filters += `&tags=${newFilters.tagParam}`;
        if (newFilters.regionParam) filters += `&categories=${newFilters.regionParam}`;
        console.log(filters);

        const data: WP_Post[] = (await axios.get(`/wpapi/?rest_route=/wp/v2/posts${filters}`)).data;
        setFilteredPosts(data);
        console.log(data);
    }

    const GetTags = async (): Promise<tagStruct[]> => {
        return (await axios.get('/wpapi/?rest_route=/wp/v2/tags')).data as tagStruct[];
    }

    const GetCategories = async (): Promise<categoryStruct[]> => {
        return (await axios.get('/wpapi/?rest_route=/wp/v2/categories')).data as categoryStruct[];
    }

    const GetInitialData = async () => {
        const [tags, categories] = await Promise.all([GetTags(), GetCategories()]);
        setAllTags(tags);
        console.log(tags);
        setAllCategories(categories);
    }

    useEffect(() => {
        GetInitialData();
    }, []);

    return (
        <SearchContext.Provider value={{
            currentSearchFilters, 
            UpdateCurrentFilters, 
            allTags, 
            allCategories, 
            selectedTags, 
            selectedCategories,
            setSelectedTags,
            setSelectedCategories,
            filteredPosts
        }}>
            <div className={styles.Container}>
                <Head>
                    <title>Search</title>
                </Head>
                <main className={styles.main}>
                    <h1>Search Page</h1>
                    <SearchFilter />
                    <InfiniteScroller />
                </main>
            </div>
        </SearchContext.Provider>
    );
};

export { SearchContext };
export default Search;