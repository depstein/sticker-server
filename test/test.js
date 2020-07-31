var http = require('http');
const fs = require('fs');

const category = ['food']
const option = ['pulse', 'shake']
const type = ['plain-domain-agnostic', 'plain-domain-relevant']
const type_num = ['-1', '-2', '-3']

console.log("Test suite running");

var testObject = [];

function main() {
    for (var c = 0; c < category.length; c++) {
        for (var o = 0; o < option.length; o++) {
            for (var t = 0; t < type.length; t++) {
                for (var tn = 0; tn < type_num.length; tn++) {
                    var value = Math.floor(Math.random() * (200 - 50) + 50);
                    var url = "http://localhost:5000/" + category[c] 
                    + "/?value=" + value 
                    + "&option=" + option[o] 
                    + "&type=" + type[t] + type_num[tn];
                    var file_name = category[c] + "_" + type[t] + type_num[tn] + "_" + option[o] + "_" + value;
    
                    if (type[t] === "plain-domain-agnostic") {
                        url += "&color=purple";   
                        file_name += "_purple"; 
                    }
    
                    if (category[c] === "music") {
                        url += "&addi_value=Hamilton";   
                        file_name += "Hamilton"; 
                    }
                    
                    testObject.push({url: url, fileName: file_name});
                    // const file = fs.createWriteStream(file_name + ".gif");
                    // getRequest(file, file_name, url);
                }
            }
        }
    }
    // console.log(testObject);
    getRequest(0);
}

async function getRequest(index) {
    console.log(index);
    if (index > testObject.length - 1) {
        return;
    }
    var object = testObject[index];

    const request = await http.get(object.url, function(response) {
        const file = fs.createWriteStream(object.fileName + ".gif");
        response.pipe(file);
        console.log(object.fileName + " DOWNLOADED!")
        getRequest(index + 1);
    });
}


main();