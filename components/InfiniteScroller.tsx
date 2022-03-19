import react, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../pages/search';
import axios from 'axios';
import { useRouter } from 'next/router';
import SearchItem from './SearchItem';
import { VariableSizeList } from "react-window";
import { testMetaData } from '../utils/interfaces';


const InfiniteScroller: react.FC = () => {
    
    const context = useContext(SearchContext);
    if (!context) return null;

    // This is used to have the posts locally, and will force a rerender when it changes
    // NOTE: This may be a bad way to do this, especially if this state is just a copy of context.filteredPosts,
    // because that would mean the client has two copies of this data
    const[ postData, setPostData ] = useState(context.filteredPosts);

    useEffect(() => {
        setPostData(context.filteredPosts);
    }, [context.filteredPosts]);

    const Item = ({ index, style }) => {
        return <SearchItem style={style} itemData={postData[index]} />;
    };

    const GetItemSize = (index: Number) => {
        return 150;
    }

    return(
        <VariableSizeList
            className="List"
            itemCount={postData.length}
            itemSize={GetItemSize}
            height={400}
            width={800}
        >
            {Item}
        </VariableSizeList>
    );
};

export default InfiniteScroller;