const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/addCat' && req.method === 'GET') {

        const filePath = path.normalize(
            path.join(__dirname, '../views/cats/addCat.html')
        );

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Page Not Found');
                res.end();
                return;
            }

            const breedOptions = breeds.map(breed => `<option value="${breed}">${breed}</option>`);
            const modifiedData = data.toString().replace('{{catBreeds}}', breedOptions);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        });

    } else if (pathname === '/cats/addCat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {

            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Page Not Found');
                return;
            }

            const oldPath = files.upload.path;
            const newPath = path.normalize(
                path.join(__dirname, '../content/images/' + files.upload.name));


            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.log(err);
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('Page Not Found');
                    return;
                }

                console.log('File was uploaded successfully');
            });

            const filePath = path.normalize(
                path.join(__dirname, '../data/cats.json'));

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('Page Not Found');
                    res.end();
                    return;
                }

                let allCats = JSON.parse(data);
                allCats.push({
                    id: allCats.length + 1,
                    ...fields,
                    image: files.upload.name
                });

                fs.writeFile(filePath, JSON.stringify(allCats), err => {
                    if (err) {
                        console.log(err);
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.write('Page Not Found');
                        res.end();
                        return;
                    }

                    console.log('Cat added successfully');
                });

                res.writeHead(301, { 'Location': '/' });
                return res.end();
            });
        });

    } else if (pathname === '/cats/addBreed' && req.method === 'GET') {

        const filePath = path.normalize(
            path.join(__dirname, '../views/cats/addBreed.html'));

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Page Not Found');
                res.end();
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });

    } else if (pathname === '/cats/addBreed' && req.method === 'POST') {
        let formData = '';

        req.on('data', data => {
            formData += data;
        });

        req.on('end', () => {
            const filePath = path.normalize(
                path.join(__dirname, '../data/breeds.json'));

            const body = qs.parse(formData);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('Page Not Found');
                    return;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);

                fs.writeFile(filePath, JSON.stringify(breeds), err => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('The breed was successfully added');
                });

                res.writeHead(301, { 'Location': '/' });
                return res.end();
            });
        });
    } else {
        return true;
    }

}
