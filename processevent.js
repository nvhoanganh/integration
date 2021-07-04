const { Client } = require("pg");

// const { host, user, password, port, database } = auths?.postgresql;
require("dotenv").config();
const { host, user, password, port, database } = process.env;

const client = new Client({
	host,
	database,
	user,
	password,
	port,
});

async function run() {
	await client.connect();

	this.results = (
    await client.query(`
  SELECT
    type,
    event -> 'event' ->> 'userId' as userId,
    event -> 'event' ->> 'boardId' as boardId,
    event -> 'event' ->> 'columnTitle' as column,
    event -> 'event' -> 'value' -> 'label' ->> 'text' as NewStatus,
    event -> 'event' -> 'previousValue' -> 'label' ->> 'text' as PreviousStatus,
    ts,
    status
  from mondayevents`)
  ).rows;
  
	console.log(
		"🚀 ~ file: processevent.js ~ line 25 ~ run ~ this.results ",
		this.results
	);

	var data = {
		event: {
			userId: 23043712,
			originalTriggerUuid: null,
			boardId: 1448019241,
			groupId: "new_group",
			pulseId: 1448033025,
			pulseName: "Setup: Azure B2C tenant for dev, pre-prod",
			columnId: "status3",
			columnType: "color",
			columnTitle: "Status",
			value: {
				label: {
					index: 1,
					text: "Done",
					style: {
						color: "#00c875",
						border: "#00B461",
						var_name: "green-shadow",
					},
				},
				post_id: null,
			},
			previousValue: {
				label: {
					index: 5,
					text: null,
					style: {
						color: "#c4c4c4",
						border: "#B0B0B0",
						var_name: "grey",
					},
				},
				post_id: null,
			},
			changedAt: 1625366566.0915213,
			isTopGroup: true,
			app: "monday",
			type: "update_column_value",
			triggerTime: "2021-07-04T02:42:46.509Z",
			subscriptionId: 59483561,
			triggerUuid: "c564aebf1422bdf826b2ce6b1150288d",
		},
	};

	var query = {
		text: "insert into mondayevents (type, event, ts, status) VALUES ($1, $2, NOW(), $3)",
		values: ["monday-anthony-test-1", data, "new"],
  };
  
	await client.query(query);

	await client.end();
}

run();
