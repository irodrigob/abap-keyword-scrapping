import { chromium } from "playwright";
import fs from "fs";

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

const keywords = await page.$$eval("td", (results) =>
	results.map((el) => {
		const word = el.querySelector("span").textContent;
		return { keyword: word };
	})
);
let createStream = fs.createWriteStream("abapKeywords.ts");
let fileContent = `export const abapKeywords = ${JSON.stringify(keywords)}`;
createStream.write(fileContent);
createStream.end();
console.log("Fichero actualizado");
