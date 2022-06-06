import { useEffect, useRef } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import './LocationDropdown.css';

function LocationDropdown({ id, caption, roomList, onChange }) {
	const ref = useRef(null);

	useEffect(() => {
		// This ugly workaround to clear the Autocomplete input value has been borrowed from https://github.com/mui/material-ui/issues/4736
		// Unf., this produces a warning in the console if item that is now unavailable (filtered out) was selected
		if(ref.current) {
			const elm = ref.current.getElementsByClassName('MuiAutocomplete-clearIndicator');
			if(elm && elm[0] && elm[0].click) {
				elm[0].click();
			}
		}
	}, [roomList])

	return (
		<div className="location-dropdown">
			<Autocomplete
				id={id}
				ref={ref}
				options={roomList}
				renderInput={(params) => <TextField {...params} label={caption} />}
				onChange={onChange}
				autoHighlight={true}
				selectOnFocus={true}
				clearOnBlur={true}
				handleHomeEndKeys={true}
				isOptionEqualToValue={(option, value) => option.id === value.id}				
			/>
		</div>
	);
}

export default LocationDropdown;