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

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [countPerPage, setCountPerPage] = useState<number>(10);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false); //Used to track when the initial load of the wordpress data has been done

    useEffect(() => {
        GetInitialData();
    }, []);

    useEffect(() => {
        //This will refresh the data when the current page changes
        //TODO: Add a debouncer to this or the inputs for the count so it doesn't make calls while typing
        UpdateCurrentFilters();
    }, [currentPage, countPerPage]);

    const UpdateCurrentFilters = async (newFilters?: searchFilterStruct) => {
        //If we call this with params passed, we update the params and grab new data.
        //If we leave off the params, we simply regrab the data
        if (!newFilters) {
            newFilters = currentSearchFilters;
        } else {
            setCurrentSearchFilters(newFilters);
        }
        console.log(newFilters);

        if (!newFilters) return; //This is a safety on initial load in case the state value is also null
        if (!dataLoaded) {
            setDataLoaded(true);
        }

        //Here we will build our search query
        let filters = `&page=${currentPage}&per_page=${countPerPage}`;
        if (newFilters.tagParam) filters += `&tags=${newFilters.tagParam}`;
        if (newFilters.regionParam) filters += `&categories=${newFilters.regionParam}`;
        console.log(filters);

        const data: articleStruct[] = (await axios.get(`/wpapi/?rest_route=/wp/v2/posts${filters}`)).data;
        const featuredMediaIds: number[] = [];

        // data.forEach(x => { 
        //     x.articleType = ArticleTypes.WordpressPost; 
        //     if (x.featured_media !== 0) {
        //         featuredMediaIds.push(x.featured_media); 
        //     }
        // });

        //This grabs all the featured media photos to be displayed on each article
        const media = await GetMedia(featuredMediaIds);
        media.forEach(x => {
            const index = data.findIndex(y => y.featured_media === x.id);
            if (index !== undefined && data[index] !== undefined) {
                data[index].featuredImageLink = x.source_url;
            }
        });

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

    const GetMedia = async (mediaIds: number[]) => {
        const media = (await axios.get(`/wpapi/?rest_route=/wp/v2/media&include=${mediaIds.join()}`)).data as WP_Media[];
        console.log(media);
        return media;
    }

    const GoToNextPage = () => {
        setCurrentPage(currentPage+1);
    }

    const GoToPrevPage = () => {
        if (currentPage == 1) return;

        setCurrentPage(currentPage-1);
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
                    {dataLoaded && <div>
                        <input value='Prev. Page' type="button" onClick={GoToPrevPage} />
                        <input type="number" placeholder='Count per page' value={countPerPage} onChange={e => setCountPerPage(parseInt(e.target.value))} />
                        <input value='Next Page' type="button" onClick={GoToNextPage} />
                        <span>Page: {currentPage}</span>
                    </div>}
                </main>
            </div>
        </SearchContext.Provider>
    );
};

export { SearchContext };
export default Search;