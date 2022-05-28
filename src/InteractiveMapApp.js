import { useState, useEffect, useRef } from 'react';

import LocationDropdown from './LocationDropdown.js';
import NavigationResult from './NavigationResult.js';

import NavigationService from './service/NavigationService.js';
import RoomService from './service/RoomService.js';

function InteractiveMapApp({ url, name }) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [roomList, setRoomList] = useState([]);

	const [startRoomId, setStartRoomId] = useState(null);
	const [endRoomId, setEndRoomId] = useState(null);
	const [path, setPath] = useState({});

	const navigationServiceRef = useRef(null);

	// Load and initialize data
	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(result => {
				setIsLoaded(true);

				const roomList = RoomService.createRoomList(result.rooms);
				setRoomList(roomList);
				
				navigationServiceRef.current = new NavigationService(name, result.rooms, result.navActions);
			},
			(error) => {
				setIsLoaded(true);
				setError(error);
			})
	}, [url, name]);

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
				<NavigationResult path={path} />
			</div>
		);
	}
}

export default InteractiveMapApp;