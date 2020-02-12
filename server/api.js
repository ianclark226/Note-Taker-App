const shortid = require('shortid');
const express = require('express');
const path = require('path');

const fs = require('fs').promises;

const apiRouter = express.Router();

const dataFilePath = path.resolve(__dirname, '..', 'data', 'data.json');

async function readData() {
	const fileData = await fs.readFile(dataFilePath, 'utf-8');
	data = JSON.parse(fileData);

	return data;
}

apiRouter.get('/notes', async (_, res) => {
	const data = await readData();

	res.json(Object.values(data));
});

apiRouter.post('/notes', async (req, res) => {
	const data = await readData();

	const { title, text } = req.body;

    const id = shortid.generate();
    

	data[id] = {
		id,
		title,
		text
	};

	await fs.writeFile(dataFilePath, JSON.stringify(data));

	res.json({
		success: true
	});
});

apiRouter.delete('/notes/:id', async (req, res) => {
	let data = await readData();

	const noteId = req.params.id;

	if (data[noteId]) {
		delete data[noteId];
	}

	await fs.writeFile(dataFilePath, JSON.stringify(data));

	res.json({
		success: true
	});
});

module.exports = apiRouter;