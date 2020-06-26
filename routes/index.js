var express = require('express');
var router = express.Router();
var fs = require('fs');
var puppeteer = require('puppeteer');

//TODO: better file storage/organization.
var uhohFile = "animations/uhoh.gif";

var stickers = {
    "heartbeat": "animations/heartbeat",
    "steps": "animations/steps",
    "food": "animations/food"
}

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


async function processSticker(category, req, res) {
    var buffer;
    var value = req.query.value;
    var option = req.query.option;
    var type = req.query.type;
    var goal = req.query.goal || 0;
    var addi_value = req.query.addi_value || 0;
    var unit = req.query.unit || 0;

    var stickerFile = stickers[category] + '_' + option + '_' + value + '_' + type + '_' + goal + '_' + addi_value + '_' + unit + '.gif';

    if(!value) {
        buffer = fs.readFileSync(uhohFile);
    }
    else if(fs.existsSync(stickerFile)) {
        buffer = fs.readFileSync(stickerFile);
    } else {
        buffer = await recordSticker(req.headers.host, category , stickerFile, type, 
            'option=' + option + 
            '&value=' + value + 
            '&goal=' + goal +
            '&addi_value=' + addi_value +
            '&unit=' + unit );
    }
    res.set('Content-Type', 'image/gif');
    res.send(buffer);

}


router.get('*', function(req, res, next) {
	next();
});

router.get('/heartbeat', async function(req, res, next) {
    processSticker('heartbeat', req, res)   
});

router.get('/steps', async function(req, res, next) {
    processSticker('steps', req, res)   
});

router.get('/food', async function(req, res, next) {
    processSticker('food', req, res)
});


module.exports = router;
