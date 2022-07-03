import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { tagStruct } from '../../../utils/interfaces';
import styles from '../../../styles/Admin.module.scss';
import { FormControl, InputLabel, Select, Box, Chip, OutlinedInput, MenuItem } from '@mui/material';

interface props {
    selectedTags: tagStruct[],
    setSelectedTags: (tags: tagStruct[]) => void
}

const TagDropdownAdmin: React.FunctionComponent<props> = ({ selectedTags, setSelectedTags }: props) => {

    const [allTags, setAllTags] = useState<tagStruct[]>([]);

    useEffect(() => {
        GetTags();
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

    const GetTags = async () => {
        const data = (await axios.get('/wpapi/?rest_route=/wp/v2/tags')).data as tagStruct[];
        setAllTags(data);
    }

    const handleChange = (event) => {
		const allValues: any[] = event.target.value;
		const catID = allValues[allValues.length-1];
		const index = selectedTags.findIndex(x => x.id === catID);

		if (index !== -1) {
			//We are removing from the dropdown
			const tempArray = [...selectedTags];
			tempArray.splice(index, 1);
			setSelectedTags(tempArray);
			return;
		}

        //Find the object and add it to the selected array
		const tagObject = allTags.find(x => x.id === catID);
		if (tagObject) {
			const tempArray = [...selectedTags];
			tempArray.push(tagObject);
			setSelectedTags(tempArray);
		}
	};

    return (
        <React.Fragment>
			<FormControl size="small" className={styles.input_parent}>
				<h3 className={styles.input_header_select}>Tag</h3>
				<Select
					id="tag-dropdown"
					multiple
					value={selectedTags}
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
					{allTags.map((x) => (
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

export default TagDropdownAdmin;