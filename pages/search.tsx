import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/Head';
import styles from '../styles/Home.module.scss';
import SearchFilter from '../components/SearchFilter';
import InfiniteScroller from '../components/InfiniteScroller';
import { searchFilterStruct, searchContextStruct, tagStruct, categoryStruct, dummyPostStruct, articleStruct, ArticleTypes } from '../utils/interfaces';
import { WP_Media } from '../utils/wordpressInterfaces';

const SearchContext = createContext<searchContextStruct | null>(null);

const Search: React.FC = () => {

    const [currentSearchFilters, setCurrentSearchFilters] = useState<searchFilterStruct | null>(null);
    const [allTags, setAllTags] = useState<tagStruct[]>([]);
    const [allCategories, setAllCategories] = useState<categoryStruct[]>([]);
    const [selectedTags, setSelectedTags] = useState<tagStruct[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<categoryStruct[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<articleStruct[]>([]);

    useEffect(() => {
        GetInitialData();
        GetMedia();
    }, []);

    const UpdateCurrentFilters = async (newFilters: searchFilterStruct) => {
        setCurrentSearchFilters(newFilters);
        console.log(newFilters);

        //Here we will build our search query
        let filters = '';
        if (newFilters.tagParam) filters += `&tags=${newFilters.tagParam}`;
        if (newFilters.regionParam) filters += `&categories=${newFilters.regionParam}`;
        console.log(filters);

        const data: articleStruct[] = (await axios.get(`/wpapi/?rest_route=/wp/v2/posts${filters}`)).data;
        //TODO: Find a more efficient way to do this, such as on import rather than iteration through it all
        data.forEach(x => { x.articleType = ArticleTypes.WordpressPost; })

        setFilteredPosts(data);
        console.log(data);
    }

    const GetTags = async (): Promise<tagStruct[]> => {
        return (await axios.get('/wpapi/?rest_route=/wp/v2/tags')).data as tagStruct[];
    }

    const GetCategories = async (): Promise<categoryStruct[]> => {
        return (await axios.get('/wpapi/?rest_route=/wp/v2/categories')).data as categoryStruct[];
    }

    const GetAddresses = async (): Promise<any[]> => {
        return (await axios.get('./api/getAddresses')).data;
    }

    const GetMedia = async () => {
        //TODO: This is incredibly inefficient, find a better way to do this, such as when each list item gets displayed
        const media = (await axios.get('/wpapi/?rest_route=/wp/v2/media')).data as WP_Media[];
        console.log(media);
        return media;
    }

    const GetInitialData = async () => {
        //All this data only ever needs to be loaded once
        const [tags, categories, addresses] = await Promise.all([GetTags(), GetCategories(), GetAddresses()]);
        setAllTags(tags);
        console.log(addresses);
        setAllCategories(categories);
    }

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