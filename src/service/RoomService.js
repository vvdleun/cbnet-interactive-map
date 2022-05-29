
// Hehehehe....
const RoomService = {

	// Converts the input data to a list that can be used for LocationDropdown
	createRoomList: function(rooms, spoilerFree) {
		return Object.entries(rooms)
				.filter(idAndRoom => spoilerFree ? !idAndRoom[1].spoiler : true)
				.map(idAndRoom => { return { "id": idAndRoom[0], "label": idAndRoom[1].title }; })
				.sort((a, b) => (a.label > b.label ? 1 : (b.label > a.label) ? -1 : 0));
	}
}

export default RoomService