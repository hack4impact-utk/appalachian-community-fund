/* eslint-disable func-style */
import React from 'react';
import Head from 'next/Head';
import styles from '../styles/Home.module.css';
import InfoSearch from '../components/InfoSearch';
import InfiniteScroll from 'react-infinite-scroll-component';

const Search: React.FC = () => {
    // React hook UseState
    const[ append, setAppend ] = useState('');
    const state = {
        items: Array.from({ length: 20 })
    };

    // Dynamically Route to new page on user search
    const router = useRouter();
    const getSearch = () => {
        router.push(`search/${append}`);
    };


    return (
        <div className={styles.Container}>
            <Head>
                <title>Search</title>
            </Head>
            <main className={styles.main}>
                <h1>Search Page</h1>
                <InfoSearch></InfoSearch>
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
                
                <InfiniteScroll
                    dataLength={state.items.length}
                    next={getSearch}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>That's everything!</b>
                        </p>
                    }
                >
                {state.items}
                </InfiniteScroll>
            </main>
        </div>
    );
};

export default Search;
