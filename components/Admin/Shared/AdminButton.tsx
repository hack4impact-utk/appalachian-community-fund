import React from 'react';
import styles from '../../../styles/Admin.module.scss';

interface props {
    size?: 'small' | 'large',
    message: string,
    onClick: () => void
}

const AdminButton: React.FC<props> = ({ message, onClick, size }: props) => {
    return (
        <div className={styles.admin_button} onClick={onClick} style={{ fontSize: size === 'large' ? 24 : 18 }}>
            {message}
        </div>
    );
}

export default AdminButton;