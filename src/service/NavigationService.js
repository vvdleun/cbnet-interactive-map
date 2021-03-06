// The implementation is heavily based on https://github.com/Miziziziz/GodotBreadthFirstSearch
// which I found after watching video https://www.youtube.com/watch?v=rbYxbIMOZkE
// Any bugs, issues, etc. should be blamed on /me, however!

// For my contact details, see: https://www.vincentvanderleun.nl

const ARRIVED_SUFFIX = ' arrived at the destination.';

// Implementation methods
// (as you can probably tell, this code was originally written as a vanilla Javascript function. Only later during the
//  development process, I decided to export it as a service object)

const findAndDescribePath = function(startRoom, endRoom, name, roomData, actionData, spoilerFree, act) {
	const path = findPath(roomData, startRoom, endRoom, spoilerFree, act);
	if(!path) {
		return [];
	}

	const actions = describePath(path, name, roomData, actionData);

	return actions;
}

const findPath = function(rooms, startRoom, endRoom, spoilerFree, act) {
	if(!rooms || !startRoom || !endRoom) {
		return [];
	}

	const queue = [];
	const visited = {};
	const maxIterations = 5000;
	const actSelected = act !== '';
	
	// console.log('Navigating from "' + rooms[startRoom].title + '" to "' + rooms[endRoom].title + '"');

	queue.push({"room": startRoom, "lastRoom": null, "lastNav": null});
	
	const checkRoom = function(room, lastRoom, lastNav) {
		// console.log("Checking: " + room + " (last: " + lastRoom + " " + lastNav + ")");
		if(!room) {
			// This usually means a silly error in the rooms.json file....
			throw new Error('Unknown room, last room was: ' + lastRoom + " and last nav: " + lastNav);
		}

		if(room in visited || (spoilerFree && room.spoiler) || (actSelected && room.acts && !room.acts.includes(act))) {
			return false;
		}

		// Keep track of both the destination room and the navigation action required to get there
		visited[room] = {"room": lastRoom, "nav": lastNav};
		if(room === endRoom) {
			return true;
		}

		const navActionsAndData = Object.entries(rooms[room].nav);
		for(var i = 0; i < navActionsAndData.length; i++) {
			const navActionAndData = navActionsAndData[i];

			const nav = navActionAndData[0];
			const navData = navActionAndData[1];
			
			if((!navData.spoiler || !spoilerFree) && (!navData.acts || (actSelected && navData.acts.includes(act)))) {
				queue.push({ "room": navData.target, "lastRoom": room, "lastNav": nav });
			}
		}
	}

	var iters = 0;
	while(queue.length > 0) {
		// Pop first item from array
		var cell = queue.shift();
		if(checkRoom(cell.room, cell.lastRoom, cell.lastNav)) {
			break;
		}
		iters += 1;
		if(iters >= maxIterations) {
			console.log("Giving up: " + iters);
			return [];
		}
	}

	const backtracedPath = [];
	var curRoom = endRoom;
	while(curRoom in visited) {
		// Insert to start of array
		backtracedPath.splice(0, 0, { "room": curRoom, "nav": visited[curRoom].nav });
		
		curRoom = visited[curRoom].room;
	}
	
	return backtracedPath;
}

const describePath = function(path, name, roomData, actionData) {
	if(!path.length) {
		return [];
	}

	const pathList = [];
	
	// The action to get from current room to the next room, is stored in the next room's element!
	for(var i = 0; i < path.length - 1; i++) {
		const roomId = path[i].room;
		const action = path[i + 1].nav;

		const actionText = actionData[action];

		pathList.push(createAction(roomData, roomId, actionText));
	}
	// Last action always is: player arrived
	const roomId = path[path.length - 1].room;
	pathList.push(createAction(roomData, roomId, name + ARRIVED_SUFFIX));

	return pathList;
}

const createAction = function(roomData, roomId, action) {
	return { roomId, room: roomData[roomId].title, action };
}

// Service constructor

const NavigationService = function(name, roomData, actionData) {
	this.name = name;
	this.roomData = roomData;
	this.actionData = actionData;

	this.findPath = function(startRoom, endRoom, spoilerFree, act) {
		return findAndDescribePath(startRoom, endRoom, this.name, this.roomData, this.actionData, spoilerFree, act);
	}
}

export default NavigationService