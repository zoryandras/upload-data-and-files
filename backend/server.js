const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express(); // express is egy föggvény és ez lefut, és objektum jön vissza

function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.use(fileUpload());

app.get("/", getFunction);

app.use("/upload", express.static(`${__dirname}/../frontend/upload`));
app.use("/pub", express.static(`${__dirname}/../frontend/public`));

const uploads = path.join(`${__dirname}/../frontend/upload/`)
app.post("/", (req, res) => {
	//Upload image
	const picture = req.files.picture
	const answer = {}
	if (picture) {
		console.dir(picture)
		picture.mv(uploads + picture.name, error => {
			return res.status(500).send(error)
		})	
	}

	answer.pictureName = picture.name
	res.send(answer)

	// Upload data from form
	const formData = req.body
	formData.image_name = picture.name
	jsonData.push(formData)

	fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
		if (error) {
			console.log(error)
		}
	})
});

const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;
app.listen(port, () => {
    console.log(ipAddress)
});