import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { categoryStruct } from '../../../utils/interfaces';
import styles from '../../../styles/Admin.module.scss';
import { FormControl, InputLabel, Select, Box, Chip, OutlinedInput, MenuItem } from '@mui/material';

interface props {
    selectedCategories: categoryStruct[],
    setSelectedCategories: (categories: categoryStruct[]) => void
}

const CategoryDropdownAdmin: React.FunctionComponent<props> = ({ selectedCategories, setSelectedCategories }: props) => {

    const [allCategories, setAllCategories] = useState<categoryStruct[]>([]);

    useEffect(() => {
        GetCategories();
    }, []);

    const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

    const GetCategories = async () => {
        const data = (await axios.get('/wpapi/?rest_route=/wp/v2/categories')).data as categoryStruct[];
        setAllCategories(data);
    }

    const handleChange = (event) => {
		const allValues: any[] = event.target.value;
		const catID = allValues[allValues.length-1];
		const index = selectedCategories.findIndex(x => x.id === catID);

		if (index !== -1) {
			//We are removing from the dropdown
			const tempArray = [...selectedCategories];
			tempArray.splice(index, 1);
			setSelectedCategories(tempArray);
			return;
		}

        //Find the object and add it to the selected array
		const tagObject = allCategories.find(x => x.id === catID);
		if (tagObject) {
			const tempArray = [...selectedCategories];
			tempArray.push(tagObject);
			setSelectedCategories(tempArray);
		}
	};

    return (
        <React.Fragment>
            <FormControl size="small" className={styles.input_parent}>
				<h3 className={styles.input_header_select}>Category</h3>
				<Select
					id="cat-dropdown"
					multiple
					value={selectedCategories}
					onChange={handleChange}
					className={styles.input_select}
					renderValue={(select) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{select.map((value) => (
								<Chip key={value.id} className="applyFont" label={value.name} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{allCategories.map((x) => (
						<MenuItem
							key={x.id}
							value={x.id}
							className={styles.font_fix}
						>
							{x.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
        </React.Fragment>
    );
}

export default CategoryDropdownAdmin;