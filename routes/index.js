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
    "music": "animations/music",
}

var default_units = {
    "heartbeat": "beats per minute",
    "steps": "steps",
    "food": "calories",
    "music": "plays of"
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


async function recordSticker (server, category, filename, type, getParams) {
    //return await recordFile('http://'+server+'/clock.html?'+ getParams, filename);
    if (type === "plain-domain-agnostic-1" || 
        type === "plain-domain-agnostic-2" ||
        type === "plain-domain-agnostic-3") {
            return await recordFile('http://'+ server + '/generic/' + type + '.html?'+ getParams, filename);
        }
    else {
        return await recordFile('http://'+ server + '/' + category + '/' + type + '.html?'+ getParams, filename);
    }
};


// async function processSticker(category, req, res) {
//     var buffer;
//     var value = req.query.value; // Input numeric value for sticker
//     var option = req.query.option; // Animation options
//     var type = req.query.type; // Type of sticker
//     var goal = req.query.goal; // Input goal numeric value for chartjunk sticker
//     var addi_value = req.query.addi_value; // Second input value for music sticker
//     var unit = req.query.unit; // Custom unit

//     var stickerFile = category + '_' + option + '_' + value + '_' + type + '_' + goal + '_' + addi_value + '_' + unit + '.gif';

//     if(!value) {
//         buffer = fs.readFileSync(uhohFile);
//     }
//     else if(fs.existsSync(stickerFile)) {
//         buffer = fs.readFileSync(stickerFile);
//     } else {
//         buffer = await recordSticker(req.headers.host, category , stickerFile, type, 
//             'option=' + option + 
//             '&value=' + value + 
//             '&goal=' + goal +
//             '&addi_value=' + addi_value +
//             '&unit=' + unit );
//     }
//     res.set('Content-Type', 'image/gif');
//     res.send(buffer);

// }

async function processSticker(category, req, res) {
    var buffer;
    var text;

    var value = req.query.value;
    var color = req.query.color;
    var unit = req.query.unit;
    var option = req.query.option;
    var type = req.query.type;

    var goal = req.query.goal;
    var addi_value = req.query.addi_value;

    if (unit != undefined) {
        text = value + " " + unit
    } else if (category === "time") {
        text = processDefaultTimeText(value)
    } else if (category === "music") {
        text = value + " " + default_units[category] + " " + addi_value
    } else {
        text = value + " " + default_units[category]
    }

    var stickerFile = category + '_' + option + '_' + text + '_' + type + '_' + goal + '_' + addi_value + '_' + color + '.gif';

    if(!value) {
        buffer = fs.readFileSync(uhohFile);
    }
    else if(fs.existsSync(stickerFile)) {
        buffer = fs.readFileSync(stickerFile);
    } else {
        buffer = await recordSticker(req.headers.host, category , stickerFile, type, 
            'option=' + option + 
            '&text=' + text + 
            '&color=' + color + 
            '&goal=' + goal +
            '&addi_value=' + addi_value);
    }
    res.set('Content-Type', 'image/gif');
    res.send(buffer);
    // res.send(text);
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
    processSticker('heartbeat', req, res);   
});

router.get('/steps', async function(req, res, next) {
    processSticker('steps', req, res) ;  
});

router.get('/food', async function(req, res, next) {
    processSticker('food', req, res);
});

router.get('/time', async function(req, res, next) {
    processSticker('time', req, res);
});

router.get('/music', async function(req, res, next) {
    processSticker('music', req, res);
});


module.exports = router;
