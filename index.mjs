import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto(
	"https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abenabap_words.htm"
);

/*const rows = page.locator("table").locator("tbody tr");
let tableData = [];

for (let i = 0; i < (await rows.count()); i++) {
	const tds = rows.nth(i).locator("td").locator("span");
	const tdsCount = await tds.count();
	for (let j = 0; j < tdsCount; j++) {
		let value = await tds.nth(j).textContent();
		tableData.push(value);
	}
}
console.log(tableData);
*/

const keyword = await page.$$eval("td", (results) =>
	results.map((el) => {
		const word = el.querySelector("span").textContent;
		return word;
	})
);

console.log(keyword);
