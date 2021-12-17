import react, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../pages/search';
import moment from 'moment';
import { WP_Post } from '../utils/wordpressInterfaces';
import styles from './SearchFilter.module.scss';

interface props {
    itemData: WP_Post
}

const SearchItem: react.FC<props> = ({ itemData }: props) => {

    const context = useContext(SearchContext);
    if (!context) return null;

    const [tagState, setTagState] = useState<string>('');

    useEffect(() => {
        //Convert the tag ID's to strings
        const temp: string[] = [];
        itemData.tags.forEach(x => {
            const tagName = context.allTags.find(y => y.id === x);
            if (tagName) {
                temp.push(tagName.name);
            }
        });
        setTagState(temp.join(', '));
    }, []);

    return (
        <div style={{ margin: 'auto' }}>
            <h2 className={styles.searchItemHeader}>{itemData.title.rendered}</h2>
            <h5 style={{ marginTop: 5, marginBottom: 5 }}>{moment(itemData.date).format('MM/DD/YYYY')}</h5>
            <p className={styles.searchItemContent}>{itemData.excerpt.rendered.replace(/[<][^>]+[>]/g,"")}</p>
            <div style={{ display: 'inline' }}>
                {tagState}
                <a style={{ float: 'right' }} target="#" href={itemData.link}>LEARN MORE</a>
            </div>
        </div>
    );
};

export default SearchItem;