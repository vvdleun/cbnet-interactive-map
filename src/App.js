import { useState, useEffect } from 'react';

import LocationDropdown from './LocationDropdown.js';
import RoomFinder from './RoomFinder.js';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [roomList, setRoomList] = useState([]);
	const [roomData, setRoomData] = useState({});
	const [actionData, setActionData] = useState({});

	const [startRoomId, setStartRoomId] = useState('');
	const [endRoomId, setEndRoomId] = useState('');

	useEffect(() => {
		fetch("rooms.json")
			.then(res => res.json())
			.then(result => {
				setIsLoaded(true);

				setRoomList(createRoomList(result.rooms));
				setRoomData(result.rooms);
				setActionData(result.navActions);
			},
			(error) => {
				setIsLoaded(true);
				setError(error);
			})
	}, []); // Ensures that this effect only runs once!

	// Render
	if (error) {
		return <div>Error: { error.message }</div>;
	} else if (!isLoaded) {
		return <div>Loading, please wait...</div>
	} else {
		return (
			<div>
				<LocationDropdown
					id="fromLocation"
					caption="Navigate from"
					roomList={roomList}
					onChange={(event, item) => setStartRoomId(item ? item.id : null)}
				/>
				<LocationDropdown
					id="toLocation"
					caption="Navigate to" 
					roomList={roomList}
					onChange={(event, item) => setEndRoomId(item ? item.id : null)}
				/>
				<RoomFinder
					startRoom={startRoomId}
					endRoom={endRoomId}
					roomData={roomData}
					actionData={actionData}
				/>
			</div>
		);
	}
}

const createRoomList = function(rooms) {
	return Object.entries(rooms)
			.map(item => { return { id: item[0], "label": item[1].title }; })
			.sort((a, b) => (a.label > b.label ? 1 : (b.label > a.label) ? -1 : 0));
}

export default App;