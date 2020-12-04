var express = require('express');
var moment = require('moment');
var router = express.Router();
var fs = require('fs');
var puppeteer = require('puppeteer');

//TODO: better file storage/organization.
var uhohFile = "animations/uhoh.gif";

var stickers = {
    "heartbeat": "animations/heartbeat",
    "steps": "animations/steps",
    "food": "animations/food",
    "time": "animations/time",
    "music": "animations/music",
    "generic": "animations/generic",
}

var default_units = {
    "heartbeat": "beats per minute",
    "steps": "steps",
    "food": "calories",
    "music": "plays of"
}

async function recordFile( url, filename) {
    // TODO: add error handling for 404 on puppeteer
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


async function recordSticker (next, server, category, filename, type, getParams) {
    try {
        console.log('http://'+ server + '/' + category + '/' + type + '.html?'+ getParams)
        console.log(filename)
        return await recordFile('http://'+ server + '/' + category + '/' + type + '.html?'+ getParams, filename);
    } catch (err) {
        next(err)
    }
};

async function processSticker(category, req, res, next) {
    var buffer;
    var text;
    var stickerFile;

    const type = req.query.type;                                    // ["plain", "chartjunk", "analogy"]
    const variation = req.query.variation;                          // [1, 2, 3, ...]
    const value = req.query.value;                                  // int[1...]
    const unit = req.query.unit;                                    // string
    const option = req.query.option;                                // ["shake", "pulse"]
    const color = req.query.color ? req.query.color : "green";      // required only for generic (plain, chartjunk) endpoint* ["purple", "gold", "red", "green", "blue"] 
    const goal = req.query.goal ? req.query.goal : req.query.value; // required only for chartjunk endpoint* int[1...]
                                                                    // default to value param, if empty

    // error handling
    if (type === undefined) {
        res.status(400).send("Missing \`type\` query parameter");
        return;
    }

    if (variation === undefined) {
        res.status(400).send("Missing \`variation\` query parameter");
        return;
    }

    if (value === undefined) {
        res.status(400).send("Missing \`value\` query parameter");
        return;
    }

    if (unit === undefined) {
        res.status(400).send("Missing \`unit\` query parameter");
        return;
    }

    if (option === undefined) {
        res.status(400).send("Missing \`option\` query parameter");
        return;
    }

    switch (type) {
        case "analogy":
            stickerFile = `${category}_${type}-${variation}_${value}_${unit}_${option}.gif`
            break;
        case "chartjunk":
            if (category === "generic") {
                stickerFile = `${category}_${type}-${variation}_${value}_${unit}_${option}_${goal}_${color}.gif`
            } 
            else {
                stickerFile = `${category}_${type}-${variation}_${value}_${unit}_${option}_${goal}.gif`
            }
            break;
        case "plain":
            if (category === "generic") {
                stickerFile = `${category}_${type}-${variation}_${value}_${unit}_${option}_${color}.gif`
            }
            else {
                stickerFile = `${category}_${type}-${variation}_${value}_${unit}_${option}.gif`
            }
            break;
    }
    
    if(fs.existsSync(stickerFile)) {
        buffer = fs.readFileSync(stickerFile);
        console.log(`-- Served from ${stickerFile} cache`);
    } else {
        buffer = await recordSticker(
            next, 
            req.headers.host, 
            category, 
            stickerFile, 
            `${type}-${variation}`, 
            `value=${value}&unit=${unit}&option=${option}&color=${color}&goal=${goal}`);
    }

    res.set('Content-Type', 'image/gif');
    res.send(buffer);
}

function processDefaultTimeText(ms) {
    var parseDuration = moment.duration(ms);
    var orderOfDuration = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"];
    var durationAbbr = {
      "years": "year", 
      "months": "month",
      "days": "day", 
      "hours": "hour", 
      "minutes": "min", 
      "seconds": "sec", 
      "milliseconds": "ms"
    }
    var topTwoUnits = [];
    var finalValue = "";

    for (i = 0; i < orderOfDuration.length; i++) {
    if (parseDuration["_data"][orderOfDuration[i]] !== 0){
        var unit = ((parseDuration["_data"][orderOfDuration[i]] > 1) ? durationAbbr[orderOfDuration[i]] + "s" : durationAbbr[orderOfDuration[i]]);
        topTwoUnits.push([unit, parseDuration["_data"][orderOfDuration[i]]])
        if(topTwoUnits.length === 2) {
        break;
        }
    }
    } 
    if (topTwoUnits.length > 1) {
    finalValue = topTwoUnits[0][1] + " " + topTwoUnits[0][0] + ", " + topTwoUnits[1][1] + " " + topTwoUnits[1][0];
    }
    else {
    finalValue = topTwoUnits[0][1] + " " + topTwoUnits[0][0];
    }
    
    return finalValue;
}

router.get('*', function(req, res, next) {
	next();
});

router.get('/heartbeat', async function(req, res, next) {
    processSticker('heartbeat', req, res, next);   
});

router.get('/steps', async function(req, res, next) {
    processSticker('steps', req, res, next) ;  
});

router.get('/food', async function(req, res, next) {
    processSticker('food', req, res, next);
});

router.get('/time', async function(req, res, next) {
    processSticker('time', req, res, next);
});

router.get('/music', async function(req, res, next) {
    processSticker('music', req, res, next);
});

router.get('/generic', async function(req, res, next) {
    processSticker('generic', req, res, next);
});

module.exports = router;
