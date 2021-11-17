import react from 'react';

interface props {
    index: number,
    name: String
}

const SearchItem: react.FC<props> = ({ index, name}: props) => {

    return(
        <div>Element {index}: {name}</div>
    );
};

export default SearchItem;