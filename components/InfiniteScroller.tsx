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

    // React hook UseState
    const[ postData, setPostData ] = useState(context.filteredPosts);

    // useEffect(() => {
    //     const AccessWordPress = async () => {
	// 		//This grabs all the posts from the wordpress site
	// 		const data = (await axios.get('/wpapi/?rest_route=/wp/v2/posts')).data;
    //         console.log(data);
	// 		setPostData(data);
	// 	}

	// 	AccessWordPress();
    // }, []);

    useEffect(() => {
        setPostData(context.filteredPosts);
    }, [context.filteredPosts]);

    const Item = ({ index, style }) => {
        let content: String;
        let link: string;

        content = postData[index].title.rendered;
        link = postData[index].link;
        return <SearchItem itemData={postData[index]} />;
    };

    const GetItemSize = (index: Number) => {
        return 127.5;
    }

    return(
        <VariableSizeList
            className="List"
            itemCount={postData.length}
            itemSize={GetItemSize}
            style={{ marginTop: 10 }}
            height={300}
            width={800}
            overscanCount={3}
        >
            {Item}
        </VariableSizeList>
    );
};

export default InfiniteScroller;