
// Hehehehe....
const RoomService = {
	createRoomList: function(rooms) {
		return Object.entries(rooms)
				.map(item => { return { id: item[0], "label": item[1].title }; })
				.sort((a, b) => (a.label > b.label ? 1 : (b.label > a.label) ? -1 : 0));
	}
}

export default RoomService