import * as React from 'react';
import { SearchContext } from '../pages/search';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const TagDropdown: React.FC = () => {

	const context = React.useContext(SearchContext);
	if (!context) return null;

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
	
	const handleChange = (event) => {
		const allValues: any[] = event.target.value;
		const tagID = allValues[allValues.length-1];
		const index = context.selectedTags.findIndex(x => x.id === tagID);

		if (index !== -1) {
			//We are removing from the dropdown
			const tempArray = [...context.selectedTags];
			tempArray.splice(index, 1);
			context.setSelectedTags(tempArray);
			return;
		}

		//Find the object and add it to the selected array
		const tagObject = context.allTags.find(x => x.id === tagID);
		if (tagObject) {
			const tempArray = [...context.selectedTags];
			tempArray.push(tagObject);
			context.setSelectedTags(tempArray);
		}
	};
		
	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
				<Select
					id="tag-dropdown"
					multiple
					value={context.selectedTags}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
					renderValue={(select) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{select.map((value) => (
								<Chip key={value.id} label={value.name} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{context.allTags.map((x) => (
						<MenuItem
							key={x.id}
							value={x.id}
						>
							{x.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
					
export default TagDropdown;