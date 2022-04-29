import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { categoryStruct } from '../../../utils/interfaces';
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
            <FormControl sx={{ width: 200 }} size="small">
				<InputLabel id="demo-multiple-chip-label" className="applyFont">Category</InputLabel>
				<Select
					id="tag-dropdown"
					multiple
					value={selectedCategories}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
					className="applyFont"
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
							className="applyFont"
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