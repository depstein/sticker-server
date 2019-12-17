var express = require('express');
var router = express.Router();
var fs = require('fs');
var puppeteer = require('puppeteer');

//TODO: better file storage/organization.
var testAnimFile = "animations/testanim.webm";
var testStillFile = "animations/teststill.png";
var uhohFile = "animations/uhoh.gif";
var clockFileBase = "animations/clock";

async function recordFile(url, filename) {
    const browser = await puppeteer.launch({args: ['--no-sandbox','--disable-setuid-sandbox',]});
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

async function recordClock (server, filename, getParams) {
    //return await recordFile('http://'+server+'/clock.html?'+ getParams, filename);
    return await recordFile('http://'+server+'/d_clock.html?'+ getParams, filename);
};

router.get('*', function(req, res, next) {
	next();
});

router.get('/', async function(req, res, next) {
    res.send('<meta content="Hello Snapchat" property="og:site_name">\n<meta content="Hiya there!" property="og:title">\n<meta content="/teststill.png" property="snapchat:sticker" />');
});

router.get('/testanim', async function(req, res, next) {
    var buffer;
    if(fs.existsSync(testAnimFile)) {
        buffer = fs.readFileSync(testAnimFile);
    } else {
        buffer = await recordTestAnimation(req.headers.host, testAnimFile);
    }
	res.set('Content-Type', 'image/gif');
    res.send(buffer);
});

router.get('/teststill.png', async function(req, res, next) {
    var buffer;
    if(fs.existsSync(testStillFile)) {
        buffer = fs.readFileSync(testStillFile);
    } else {
        buffer = await recordTestStill(req.headers.host, testStillFile);
    }
    res.set('Content-Type', 'image/png');
    res.send(buffer);
});

router.get('/clock', async function(req, res, next) {
    var buffer;
    var m = req.query.m;
    var clockFile = clockFileBase + '_' + m + '.gif';
    if(!m) {
        buffer = fs.readFileSync(uhohFile);
    }
    else if(fs.existsSync(clockFile)) {
        buffer = fs.readFileSync(clockFile);
    } else {
        buffer = await recordClock(req.headers.host, clockFile, 'm=' + m);
    }
    res.set('Content-Type', 'image/gif');
    res.send(buffer);
});

module.exports = router;
