/*
A script to get json file from https://unicode.org/emoji/charts/emoji-list.html
based on https://github.com/amio/emoji.json/blob/master/tools/gen-json.js (no license)
It works in Firefox and Epihany console
The json is copied to the clipboard
*/

let andrs = window.document.querySelectorAll('th.bighead, th.mediumhead, td.andr');

let trs = [];
andrs.forEach(e => {
	if (e.className == 'bighead' || e.className == 'mediumhead')
		trs.push(e);
	else
		trs.push(e.parentElement);
});

let emojis = [];
let category = "";
let subcategory = "";
trs.forEach(tr => {
	if (tr.className == 'bighead')
		category = tr.innerText;
	else if (tr.className == 'mediumhead')
		subcategory = tr.innerText;
	else {
		let tds = tr.children
    	let codes = tds[1].innerText.replace(/U\+/g, '')
    	let emoji =  {
      		no: parseInt(tds[0].innerText),
      		codes: codes,
      		char: codes.split(' ').map(s => String.fromCodePoint(parseInt(s, 16))).join(''),
      		name: tds[3].innerText,
      		keywords: tds[4].innerText.split(' | '),
      		category: category,
      		subcategory: subcategory
    	}
    	//remove "flag: " in flag emoji names
    	if (emoji.name.indexOf('flag: ') !== -1)
    		emoji.name = emoji.name.slice(6);
    	//add emoji name in keywords
    	if (emoji.keywords.indexOf(emoji.name) == -1)
    		emoji.keywords.push(emoji.name);
    	emojis.push(emoji);
	}
});
copy(JSON.stringify(emojis, null, 2));

