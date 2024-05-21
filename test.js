const key = process.env.HYPIXEL_KEY;
const hypixie = require(".");
const test = require("ava");

test("main", async t => {
	if (!process.env.HYPIXEL_KEY) {
		console.warn("Set the HYPIXEL_KEY environment variable in order to test.");
		return t.pass();
	}

	const response = await hypixie("player", {
		uuid: "56da43a4-088d-4a76-82b6-dd431535015e",
		key
	});
	const { displayname } = response.player;
	t.is(displayname, "Richienb");
});
