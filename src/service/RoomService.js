
// Hehehehe....
const RoomService = {

	// Converts the raw navigational room data to a list of rooms that can be consumed by LocationDropdown
	createRoomList: function(rooms, spoilerFree, act) {
		const isActSelected = act != '';
		return Object.entries(rooms)
				.filter(idAndRoom => spoilerFree ? !idAndRoom[1].spoiler : true)
				.filter(idAndRoom => isActSelected && !spoilerFree ?  !idAndRoom[1].acts || idAndRoom[1].acts.includes(act) : true)
				.map(idAndRoom => { return { "id": idAndRoom[0], "label": idAndRoom[1].title }; })
				.sort((a, b) => (a.label > b.label ? 1 : (b.label > a.label) ? -1 : 0));
	}
}

export default RoomService