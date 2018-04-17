const fs = require('fs');
const leads = require('./leads.json');

let resId = {}

leads.forEach((e) => {
    if (resId[e.ID] === undefined) {
        resId[e.ID] = e;
    }
    else {
        let prev = resId[e.ID];
        if (prev.Date <= e.Date) {
            resId[e.ID] = e
        }
    }
})

let resEmail = {}

for (e in resId) {
    let preEmail = resId[e]['Email'];
    if (resEmail[preEmail] === undefined) {
        resEmail[preEmail] = resId[e];
    }
    else {
        let prev = resEmail[preEmail];
        if (prev.Date <= resId[e].Date) {
            resEmail[preEmail] = resId[e];
        }
    }
}

var res = []
for (e in resEmail) {
    res.push(resEmail[e]);
}

//console.log(res);
fs.writeFile('results.json', JSON.stringify(res), function (err) { if (err) console.log(err); else { console.log("Done"); } });
