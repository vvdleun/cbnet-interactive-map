import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import './FilterOptions.css';

export default function FilterOptions({ spoilerFree, act, onChangeSpoilerFree, onChangeAct }) {
	return (
		<div id="filterOptions">
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: "column", sm: "row" },
					alignItems: { sm: "center" }
				}}
			>
				<FormGroup>
					<FormControlLabel control={
						<Checkbox
							onChange={onChangeSpoilerFree}
						/>
					} label="Remove potential spoilers" />
				</FormGroup>
				<Tooltip title="Check the 'Remove potential spoilers' option to only see locations that are easily/freely accessable at the start of the game and do not require any effort, or specific discoveries to get there." arrow>
					<IconButton>
						<InfoIcon />
					</IconButton>
				</Tooltip>
				<div className={spoilerFree ? 'hidden' : 'not-hidden'}>
					<FormControl size="small">
						<InputLabel id="actSelectorLabel">Act</InputLabel>
						<Select
							labelId="actSelectorLabel"
							id="actSelector"
							value={act}
							label="Act"
							onChange={onChangeAct}
						>
							<MenuItem value="">&nbsp;</MenuItem>
							<MenuItem value="1">Act I</MenuItem>
							<MenuItem value="2">Act II</MenuItem>
							<MenuItem value="3">Act III</MenuItem>
							<MenuItem value="4">Act IV</MenuItem>
							<MenuItem value="5">Act V</MenuItem>
							<MenuItem value="6">Act VI</MenuItem>
							<MenuItem value="7">Act VII</MenuItem>
							<MenuItem value="8">Act VIII</MenuItem>
						</Select>
					</FormControl>
					<Tooltip title="Select the Act you are currently playing, to only see locations and routes that can be accessed in that particular part of the game." arrow placement="right">
						<IconButton>
							<InfoIcon />
						</IconButton>
					</Tooltip>

				</div>
			</Box>
		</div>
	);
}