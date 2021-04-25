const express = require("express");
const request = require("request");
const cors = require("cors");
const Key = require("./ServiceKey");

const app = express();

app.use(cors());

const port = process.env.port || 5000;

const	weatherData = (req, res) => {
	const nx = req.query.nx;
	const ny = req.query.ny;
	const	url = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst";
	const ServiceKey = Key.ServiceKey;
	var queryParam = "?" + encodeURIComponent("serviceKey") + "=" + ServiceKey;
				queryParam += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
				queryParam += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("155");
				queryParam += "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("JSON");
				queryParam += "&" + encodeURIComponent("base_date") + "=" + encodeURIComponent("20210425");
				queryParam += "&" + encodeURIComponent("base_time") + "=" + encodeURIComponent("0200");
				queryParam += "&" + encodeURIComponent("nx") + "=" + encodeURIComponent(parseInt(nx).toString());
				queryParam += "&" + encodeURIComponent("ny") + "=" + encodeURIComponent(parseInt(ny).toString());

	const fullurl = url + queryParam;

	try {
		request(fullurl, async (err, response, body) => {
			const parsebody = await JSON.parse(body);
			const items = parsebody.response.body.items.item;
			const itemFilter = items.filter(item => item.category == "T3H");
			res.send(itemFilter);
		});
	} catch (err) {
		console.error(err);
	};
};

app.get("/weather", (req, res) => {
	weatherData(req, res);
})

// port number
app.listen(port, () => {
	console.log(`Server is up and running at port ${port}`);
});