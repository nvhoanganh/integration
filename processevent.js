const { Client } = require("pg");

const { host, user, password, port, database } = auths?.postgresql;
// require("dotenv").config();
// const { host, user, password, port, database } = process.env;

const client = new Client({
	host,
	database,
	user,
	password,
	port,
});

async function run() {
	await client.connect();

	var query = {
		text: "insert into mondayevents (type, event, ts, status) VALUES ($1, $2, NOW(), $3)",
		values: ["monday-anthony-test-1", steps.nodejs.$return_value, "new"],
  };
  
	await client.query(query);

	await client.end();
}

run();
