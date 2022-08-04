import React from 'react';
import styles from '../../../styles/Admin.module.scss';

interface props {
    header: string,
    value?: string,
    type?: string,
    rows?: number,
    setValue: (val: unknown) => void,
}

const AdminTextBox: React.FC<props> = ({ header, value, type, rows, setValue }: props) => {
    return (
        <div className={styles.input_parent}>
            <h3 className={styles.input_header}>{header}</h3>
            {!rows ? (
                <input
                    className={styles.input}
                    type={type ? type : 'text'}
                    value={value}
                    onChange={(e) => { type === 'file' ? setValue(e.target.files[0]) : setValue(e.target.value) }}
                />
            ) : (
                <textarea 
                    rows={rows}
                    className={styles.input_textarea}
                    value={value}
                    onChange={(e) => { setValue(e.target.value); }}
                />
            )}

        </div>
    );
}

export default AdminTextBox;