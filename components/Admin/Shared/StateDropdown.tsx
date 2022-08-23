import React, { useContext } from 'react';
import { FormControl, InputLabel, Select, Box, Chip, OutlinedInput, MenuItem } from '@mui/material';
import styles from '../../../styles/Admin.module.scss';
import { AdminContext } from '../../../pages/_app';

interface Props {
    selectedState: number | string,
    setSelectedState: (val: number) => void
}

const StateDropdown: React.FC<Props> = ({ selectedState, setSelectedState }: Props) => {

    const context = useContext(AdminContext);

    const handleChange = (e) => {
        setSelectedState(e.target.value);
    }

    if (!context) return null;

    return (
        <React.Fragment>
            <FormControl size="small" className={styles.input_parent}>
                <h3 className={styles.input_header_select}>State</h3>
                <Select
                    id="tag-dropdown"
                    value={selectedState}
                    onChange={handleChange}
                    className={styles.input_select}
                >
                    {context.allStates.map((x) => (
                        <MenuItem
                            key={x.ID}
                            value={x.ID}
                            className={styles.font_fix}
                        >
                            {x.state_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
}

export default StateDropdown;