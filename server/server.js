const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./api');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (_, res) => {
	const filePath = path.resolve(__dirname, '..', 'public', 'index.html');

	res.sendFile(filePath);
});

app.get('/notes', (_, res) => {
	const filePath = path.resolve(__dirname, '..', 'public', 'notes.html');

	res.sendFile(filePath);
});

app.use('/api', apiRouter);

app.use('*', (_, res) => {
	res.redirect('/');
});


app.listen(PORT, async () => {
	console.log(`Example app listening on port ${PORT}!`)
});

