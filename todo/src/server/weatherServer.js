const express = require("express");
const request = require("request");
const cors = require("cors");
const Key = require("./ServiceKey");

const app = express();

app.use(cors());

const port = process.env.port || 5000;

const calculateTime = (today) => {

	let calculateDay = {};

	Object.assign(calculateDay, today);
	// 2시 이전이라면 전날 23시로 base_date를 설정해야 합니다.
	// 매달 1일의 전날 23시는 이전 달 마지막날 23시기에 이것을 처리해 주어야 합니다.
	if (calculateDay.date == 1 && calculateDay.hours < 2) {

		calculateDay.month -= 1;

		if (calculateDay.month == 0) {
			calculateDay.year -= 1;
			calculateDay.month = 12;
		}

		let lastDate = new Date(today.year, today.month, 0);
		calculateDay.date = lastDate.getDate();

	}
	// API 규격에 맞춰줘야 합니다. 00 월 00일 형식
	if (calculateDay.month < 10)
		calculateDay.month = "0" + calculateDay.month;
	if (calculateDay.date < 10)
		calculateDay.date = "0" + calculateDay.date;

	if (calculateDay.hours < 2) {
		calculateDay.date -= 1;
		calculateDay.hours = "2300";
	}
	else if (calculateDay.hours < 5)
		calculateDay.hours = "0200";
	else if (calculateDay.hours < 8)
		calculateDay.hours = "0500";
	else if (calculateDay.hours < 11)
		calculateDay.hours = "0800";
	else if (calculateDay.hours < 14)
		calculateDay.hours = "1100";
	else if (calculateDay.hours < 20)
		calculateDay.hours = "1400";
	else if (calculateDay.hours < 23)
		calculateDay.hours = "2000";

	return calculateDay;
}

const currentTime = () => {

	let parseTime;
	let	decomposeToday = {};

	const today = new Date();

	decomposeToday.year = today.getFullYear();
	decomposeToday.month = today.getMonth() + 1;
	decomposeToday.date = today.getDate();
	decomposeToday.hours = today.getHours();

	parseTime = calculateTime(decomposeToday);

	parseTime.base_date = "" + parseTime.year + parseTime.month + parseTime.date;
	parseTime.base_time = parseTime.hours;

	return (parseTime);
}

const	weatherData = (req, res) => {

	const time = currentTime();

	const nx = req.query.nx;
	const ny = req.query.ny;

	const ServiceKey = Key.ServiceKey;
	const	url = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst";
	var queryParam = "?" + encodeURIComponent("serviceKey") + "=" + ServiceKey;
				queryParam += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
				queryParam += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("50");
				queryParam += "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("JSON");
				queryParam += "&" + encodeURIComponent("base_date") + "=" + encodeURIComponent(time.base_date);
				queryParam += "&" + encodeURIComponent("base_time") + "=" + encodeURIComponent(time.base_time);
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