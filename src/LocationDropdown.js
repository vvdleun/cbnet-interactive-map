import { Autocomplete, TextField } from '@mui/material';

import './LocationDropdown.css';

function LocationDropdown(props) {
	return (
		<div className="location-dropdown">
			<Autocomplete
				id={props.id}
				options={props.roomList}
				renderInput={(params) => <TextField {...params} label={props.caption} />}
				onChange={props.onChange}
			/>
		</div>
	);
}

export default LocationDropdown;