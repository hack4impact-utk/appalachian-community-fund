import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SearchItem from './SearchItem';
import { VariableSizeList } from "react-window";
import { testMetaData } from '../utils/interfaces';


const InfiniteScroller: react.FC = () => {
    
    // React hook UseState
    const[ postData, setPostData ] = useState([]);

    const Item = ({ index, style }) => {
        let content: String;
        content = postData[index].title.rendered;
        return <SearchItem index={index} name={content}/>;
    };

    const GetItemSize = (index: Number) => {
        return 21.5;
    }

    useEffect(() => {
        const AccessWordPress = async () => {
			//This grabs all the posts from the wordpress site
			const data = (await axios.get('/wpapi/?rest_route=/wp/v2/posts')).data;
            console.log(data);
			setPostData(data);
		}

		AccessWordPress();
    }, []);

    return(
        <VariableSizeList
            className="List"
            itemCount={postData.length}
            itemSize={GetItemSize}
            height={150}
            width={300}
            overscanCount={3}
        >
            {Item}
        </VariableSizeList>
    );
};

export default InfiniteScroller;