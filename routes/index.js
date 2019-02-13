var express = require('express');
var router = express.Router();
var fs = require('fs');
var puppeteer = require('puppeteer');

var testAnimFile = "animations/testanim.webm";
var testStillFile = "animations/teststill.png";

async function recordFile(url, filename) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});

    var element = await page.waitForSelector("#test");
    const properties = await element.getProperty("textContent");
    const property = await properties.jsonValue();
    await browser.close();
    var file = Buffer.from(property, 'base64');
    fs.writeFileSync(filename, file);
    return file;
}

async function recordTestAnimation (server, filename) {
    return await recordFile('http://' + server + '/testanim.html', filename);
};

async function recordTestStill (server, filename) {
    return await recordFile('http://' + server + '/teststill.html', filename);
};

router.get('*', function(req, res, next) {
	next();
});

router.get('/testanim', async function(req, res, next) {
    var buffer;
    if(fs.existsSync(testAnimFile)) {
        buffer = fs.readFileSync(testAnimFile);
    } else {
        buffer = await recordTestAnimation(req.headers.host, testAnimFile);
    }
	res.set('Content-Type', 'video/webm');
    res.send(buffer);
});

router.get('/teststill', async function(req, res, next) {
    var buffer;
    if(fs.existsSync(testStillFile)) {
        buffer = fs.readFileSync(testStillFile);
    } else {
        buffer = await recordTestStill(req.headers.host, testStillFile);
    }
    res.set('Content-Type', 'img/png');
    res.send(buffer);
});

module.exports = router;
