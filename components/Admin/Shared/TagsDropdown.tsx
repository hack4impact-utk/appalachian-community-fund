import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { tagStruct } from '../../../utils/interfaces';
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
            <FormControl sx={{ width: 200 }} size="small">
				<InputLabel id="demo-multiple-chip-label" className="applyFont">Tag</InputLabel>
				<Select
					id="tag-dropdown"
					multiple
					value={selectedTags}
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
					{allTags.map((x) => (
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

export default TagDropdownAdmin;