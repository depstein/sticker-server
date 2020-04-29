var express = require('express');
var router = express.Router();
var fs = require('fs');
var puppeteer = require('puppeteer');

//TODO: better file storage/organization.
var uhohFile = "animations/uhoh.gif";
var heartbeatFileBase = "animations/heartbeat";
var stepsFileBase = "animations/steps";
var foodFileBase = "animations/food";

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


async function recordSticker (server, catagory, filename, type, getParams) {
    //return await recordFile('http://'+server+'/clock.html?'+ getParams, filename);
    return await recordFile('http://'+ server + '/' + catagory + '/' + type + '.html?'+ getParams, filename);
};


router.get('*', function(req, res, next) {
	next();
});

router.get('/heartbeat', async function(req, res, next) {
    var buffer;
    var value = req.query.value;
    var option = req.query.option;
    var type = req.query.type;
    var goal = req.query.goal;

    var heartbeatFile = heartbeatFileBase + '_' + option + '_' + value + '_' + type + '_' + goal + '.gif';
    if(!value) {
        buffer = fs.readFileSync(uhohFile);
    }
    else if(fs.existsSync(heartbeatFile)) {
        buffer = fs.readFileSync(heartbeatFile);
    } else {
        buffer = await recordSticker(req.headers.host, 'heartbeat', heartbeatFile, type, 'option=' + option + '&value=' + value + '&type=' + type + '&goal=' + goal);
    }
    res.set('Content-Type', 'image/gif');
    res.send(buffer);
});

router.get('/steps', async function(req, res, next) {
    var buffer;
    var value = req.query.value;
    var option = req.query.option;
    var type = req.query.type;
    var goal = req.query.goal;

    var stepsFile = stepsFileBase + '_' + option + '_' + value + '_' + type + '_' + goal + '.gif';
    if(!value) {
        buffer = fs.readFileSync(uhohFile);
    }
    else if(fs.existsSync(stepsFile)) {
        buffer = fs.readFileSync(stepsFile);
    } else {
        buffer = await recordSticker(req.headers.host, 'steps', stepsFile, type, 'option=' + option + '&value=' + value + '&type=' + type + '&goal=' + goal);
    }
    res.set('Content-Type', 'image/gif');
    res.send(buffer);
});

router.get('/food', async function(req, res, next) {
    var buffer;
    var value = req.query.value;
    var option = req.query.option;
    var type = req.query.type;
    var goal = req.query.goal;

    var foodFile = foodFileBase + '_' + option + '_' + value + '_' + type + '_' + goal + '.gif';
    if(!value) {
        buffer = fs.readFileSync(uhohFile);
    }
    else if(fs.existsSync(foodFile)) {
        buffer = fs.readFileSync(foodFile);
    } else {
        buffer = await recordSticker(req.headers.host, 'food', foodFile, type, 'option=' + option + '&value=' + value + '&type=' + type + '&goal=' + goal);
    }
    res.set('Content-Type', 'image/gif');
    res.send(buffer);
});

module.exports = router;
