const favorisContainer = document.querySelector(".favoris-container");
const formFavoris = document.querySelector("form");
const btnSubmitForm = document.querySelector("button");
const inpTitle = document.querySelector("input[name='titre']");
const inpUrl = document.querySelector("input[name='url']");
const inpDesc = document.getElementById("description");

const url = "http://10.69.0.17:8100/bookmarks";

function createElement(tag, attr = {}, textContent = "") {
	const element = document.createElement(tag);
	for (const key in attr) {
		if (key === "className") element.className = attr[key];
		else element.setAttribute(key, attr[key]);
	}
	if (textContent) element.textContent = textContent;
	return element;
}

function createLi(url, title, desc) {
	const li = createElement("li", {}, "");
	const link = createElement("a", { href: url, target: "_blank" }, title);
	const paraDesription = createElement("p", { className: "description" }, desc);

	li.appendChild(link);
	li.appendChild(paraDesription);

	return li;
}

document.addEventListener("DOMContentLoaded", () => {
	async function getFavoris() {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Bearer 2db786ae57233606a3d72a3b29cea1a2",
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		for (let i = 0; i < data.length; i++) {
			const element = data[i];
			const myList = createLi(element.url, element.title, element.description);
			favorisContainer.appendChild(myList);
		}
	}

	getFavoris();
});

let myList;

formFavoris.addEventListener("submit", async (e) => {
	e.preventDefault();
	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: "Bearer 2db786ae57233606a3d72a3b29cea1a2",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: inpTitle.value,
			url: inpUrl.value,
			description: inpDesc.value,
		}),
	});
	const data = await res.json();
	myList = createLi(data.url, data.title, data.description);
	favorisContainer.appendChild(myList);
	inpTitle.value = "";
	inpUrl.value = "";
	inpDesc.value = "";
});
