import { useState, useEffect, useRef } from 'react';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

import FilterOptions from './FilterOptions.js';
import LocationDropdown from './LocationDropdown.js';
import NavigationResult from './NavigationResult.js';

import NavigationService from './service/NavigationService.js';
import RoomService from './service/RoomService.js';

function InteractiveMapApp({ url, name }) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const navigationServiceRef = useRef(null);
	
	// Raw room data, containing navigation and metadata on each and every navigable room
	const [roomData, setRoomData] = useState({});
	// Filtered list of rooms, converted to JSON objects that can be consumed by LocationDropdown
	const [roomList, setRoomList] = useState([]);

	const [spoilerFree, setSpoilerFree] = useState(false);

	const [startRoomId, setStartRoomId] = useState(null);
	const [endRoomId, setEndRoomId] = useState(null);
	const [path, setPath] = useState({});

	// Load data and initialize state
	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(result => {
				setIsLoaded(true);

				setRoomData(result.rooms);
				
				navigationServiceRef.current = new NavigationService(name, result.rooms, result.navActions);
			},
			(error) => {
				setIsLoaded(true);
				setError(error);
			})
	}, [url, name]);

	// Update list of selectable rooms
	useEffect(() => {
		const roomList = RoomService.createRoomList(roomData, spoilerFree);
		setRoomList(roomList);
	}, [roomData, spoilerFree]);

	// Start/end room was updated, let's help Laura navigate across the estate.
	useEffect(() => {
		var p = null;
		if(startRoomId && endRoomId && navigationServiceRef.current) {
			p = navigationServiceRef.current.findPath(startRoomId, endRoomId);
		}
		
		setPath(p || []);
	}, [startRoomId, endRoomId]);

	// Render
	if (error) {
		return <div>Error: { error.message }</div>;
	} else if (!isLoaded) {
		return <div>Loading, please wait...</div>
	} else {
		return (
			<ScopedCssBaseline>
				<div>
					<FilterOptions
						onChangeSpoilerFree={(event) => setSpoilerFree(event.target.checked)}
					/>
					<LocationDropdown
						id="fromLocation"
						caption="Navigate from"
						roomList={roomList}
						onChange={(event, item) => setStartRoomId(item ? item.id : null)}
						onInputChange={(event, value, reason) => {
							console.log("Wut A");
							console.log(event);
							console.log(reason);
							console.log(value);
						}}
					/>
					<LocationDropdown
						id="toLocation"
						caption="Navigate to" 
						roomList={roomList}
						onChange={(event, item) => setEndRoomId(item ? item.id : null)}
					/>
					<NavigationResult path={path} />
				</div>
			</ScopedCssBaseline>			
		);
	}
}

export default InteractiveMapApp;