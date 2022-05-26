import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import findAndDescribePath from './include/find_path.js';

function RoomFinder(props) {
	// TODO: split this component in two: one for calcualting path and one for rendering the result
	const path = findAndDescribePath(props.startRoom, props.endRoom, props.roomData, props.actionData) || [];

	return (
		<TableContainer component={Paper}>
			<Table aria-label="Navigation Path">
				<TableHead>
					<TableRow>
						<TableCell>Location</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{path.map((row) => (
					<TableRow key={row.roomId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
						<TableCell component="th" scope="row">
							{row.room}
						</TableCell>
						<TableCell>
							{row.action}
						</TableCell>
					</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default RoomFinder;