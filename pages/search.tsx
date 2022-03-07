import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/Head';
import styles from '../styles/Home.module.scss';
import SearchFilter from '../components/SearchFilter';
import InfiniteScroller from '../components/InfiniteScroller';
import { searchFilterStruct, searchContextStruct, tagStruct, categoryStruct, dummyPostStruct, articleStruct, ArticleTypes } from '../utils/interfaces';
import { WP_Post } from '../utils/wordpressInterfaces';

const SearchContext = createContext<searchContextStruct | null>(null);

const Search: React.FC = () => {

    const [currentSearchFilters, setCurrentSearchFilters] = useState<searchFilterStruct | null>(null);
    const [allTags, setAllTags] = useState<tagStruct[]>([]);
    const [allCategories, setAllCategories] = useState<categoryStruct[]>([]);
    const [selectedTags, setSelectedTags] = useState<tagStruct[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<categoryStruct[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<articleStruct[]>([]);

    //These are fake posts to use for testing in the event the Wordpress route stops working
    const DummyPosts: dummyPostStruct[] = [
        { title: 'Hello, I am a post', articleDescription: 'Be sure to read me!', articleDate: new Date(), tags: [1], categories: [2] },
        { title: 'Hello World!', articleDescription: 'My first article', articleDate: new Date(), tags: [1, 2], categories: [1] },
        { title: 'My test post', articleDescription: 'Some generic information', articleDate: new Date(), tags: [2], categories: [2] },
        { title: 'My test post 2', articleDescription: 'Read me pls', articleDate: new Date(), tags: [1], categories: [1] },
        { title: 'Hello there!', articleDescription: 'I am a post!', articleDate: new Date(), tags: [1], categories: [2] },
        { title: 'Test Post', articleDescription: 'For testing', articleDate: new Date(), tags: [1, 2], categories: [1, 2] },
        { title: 'Another Test Post', articleDescription: 'Also for testing', articleDate: new Date(), tags: [1, 2], categories: [2] },
        { title: 'Yet another Test Post', articleDescription: 'Again, also for testing', articleDate: new Date(), tags: [2], categories: [2] },
    ]

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

    const GetInitialData = async () => {
        //All this data only ever needs to be loaded once
        const [tags, categories, addresses] = await Promise.all([GetTags(), GetCategories(), GetAddresses()]);
        setAllTags(tags);
        console.log(addresses);
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