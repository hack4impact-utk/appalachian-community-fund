import react, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../pages/search';
import moment from 'moment';
import { WP_Post } from '../utils/wordpressInterfaces';
import styles from './SearchFilter.module.scss';
import { dummyPostStruct } from '../utils/interfaces';

interface props {
    itemData: WP_Post, //WP_Post
    style: any
}

const SearchItem: react.FC<props> = ({ itemData, style }: props) => {

    const context = useContext(SearchContext);
    if (!context) return null;

    //These are just display versions of the tags and categories
    const [tagState, setTagState] = useState<string>('');
    const [categoryState, setCategoryState] = useState<string>('');

    useEffect(() => {
        //Convert the tag ID's to strings for display
        const temp: string[] = [];
        itemData.tags.forEach(x => {
            const tagName = context.allTags.find(y => y.id === x);
            if (tagName) {
                temp.push(tagName.name);
            }
        });
        setTagState(temp.join(', '));

        const catTemp: string[] = [];
        itemData.categories.forEach(x => {
            const tagName = context.allCategories.find(y => y.id === x);
            if (tagName) {
                catTemp.push(tagName.name);
            }
        });
        setCategoryState(catTemp.join(', '));
    }, []);

    const ConvertExcerpt = (textToFix: string): string => {
        let newString = textToFix.replace(/[<][^>]+[>]/g,"");

        if (newString.length > 150) {
            newString = newString.slice(0, 150);
            newString += "...";
        }

        return newString;
    } 

    return (
        <div style={style}>
            <h2 className={styles.searchItemHeader}>{itemData.title.rendered}</h2>
            <h5 style={{ marginTop: 5, marginBottom: 5 }}>{moment(itemData.date).format('MM/DD/YYYY')}</h5>
            <p className={styles.searchItemContent}>{ConvertExcerpt(itemData.excerpt.rendered)}</p>
            <div style={{ display: 'inline' }}>
                {tagState}
                <a style={{ float: 'right', marginRight: 15 }} target="#" href={itemData.link}>LEARN MORE</a>
            </div>
        </div>
    );
};

export default SearchItem;