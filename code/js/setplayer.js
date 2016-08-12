function setPlayerInfo() {
	var pname = getName();
	var pins = getIns();
	switch (pins) {
		case "piano":
			pins = "钢琴";
			break;
		case "drum":
			pins = "架子鼓";
			break;
		case "box":
			pins = "八音琴";
			break;
		case "my":
			pins = "自定义";
			break;
	}
	var playerinfo = document.getElementById('player');
	playerinfo.innerHTML = pname+"    "+pins;
}
window.onload = function() {
	setPlayerInfo();
}