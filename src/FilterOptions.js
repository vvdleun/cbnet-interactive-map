// import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function FilterOptions({ onChangeSpoilerFree }) {
	return (
		<FormGroup>
			<FormControlLabel control={
				<Checkbox
					onChange={onChangeSpoilerFree}
				/>
			} label="Remove potential spoilers" />
		</FormGroup>
	);
}