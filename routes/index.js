var express = require('express');
var router = express.Router();
var fs = require('fs');
var puppeteer = require('puppeteer');

//TODO: better file storage/organization.
var uhohFile = "animations/uhoh.gif";
var heartbeatFileBase = "animations/heartbeat";

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


async function recordHeartbeat (server, filename, getParams) {
    //return await recordFile('http://'+server+'/clock.html?'+ getParams, filename);
    console.log(getParams);
    return await recordFile('http://'+server+'/heartbeat/plain-domain-relevant-1.html?'+ getParams, filename);
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
        buffer = await recordHeartbeat(req.headers.host, heartbeatFile, 'animation=' + option + '&value=' + value + '&type=' + type + '&goal=' + goal);
    }
    res.set('Content-Type', 'image/gif');
    res.send(buffer);
});

module.exports = router;
