import { Autocomplete, TextField } from '@mui/material';

import './LocationDropdown.css';

function LocationDropdown({ id, caption, roomList, onChange }) {
	return (
		<div className="location-dropdown">
			<Autocomplete
				id={id}
				options={roomList}
				renderInput={(params) => <TextField {...params} label={caption} />}
				onChange={onChange}
			/>
		</div>
	);
}

export default LocationDropdown;