"use strict";

const isUUID = require("is-uuid");

class HypixelError extends Error {
	constructor(message = "", ...args) {
		super(message, ...args);
		this.message = message;
	}
}

module.exports = async (endpoint, options = {}) => {
	if (!isUUID.v4(options.key)) {
		throw new TypeError("`options.key` must be set to an API key!");
	}

	let url = `https://api.hypixel.net/${endpoint}`;
	Object.keys(options).forEach((key) => {
		if (key == "key") return;
		url += `?${key}=${encodeURIComponent(options[key])}`;
	});
	const request = await fetch(url, {
		headers: {
			"API-KEY": options.key,
		},
	});

	const data = await request.json();

	if (!data.success) {
		throw new HypixelError(data.cause);
	}

	return data;
};

module.exports.HypixelError = HypixelError;
