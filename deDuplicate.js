var leads = require('./leads.json');
var res = {}

leads.forEach((e) => {
    if (res[e.ID] === undefined) {
        res[e.ID] = e;
    }
    else {
        let prev = res[e.ID];
        if (prev.Date <= e.Date) {
            res[e.ID] = e
        }
    }
})

var fRes = {}

for (e in res) {
    let fEmail = res[e]['Email'];
    if (fRes[fEmail] === undefined) {
        fRes[fEmail] = res[e];
    }
    else {
        let prev = fRes[fEmail];
        if (prev.Date <= res[e].Date) {
            fRes[fEmail] = res[e];
        }
    }
}


console.log(fRes);