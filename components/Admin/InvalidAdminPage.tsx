import React from 'react';
import styles from '../../styles/Admin.module.scss';

const InvalidPage: React.FunctionComponent = () => {
    return (
        <div className={styles.main}>
            <h1>
                You must be logged in to view this page!
            </h1>
            {/*TODO: Make this return home*/}
            <button>Return Home</button>
        </div>
    );
}

export default InvalidPage;