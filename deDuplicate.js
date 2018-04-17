const fs = require('fs');
const leads = require('./leads.json');

function getResult(leads) {
    let changeValue = '';

    let resId = {}

    leads.forEach((e) => {
        if (resId[e.ID] === undefined) {
            resId[e.ID] = e;
        }
        else {
            let prev = resId[e.ID];
            if (prev.Date <= e.Date) {

                if (prev.Email != e.Email) {
                    changeValue += 'For ID : ' + e.ID + ' value of email changed from ' + prev.Email + ' to ' + e.Email + '\n';
                }
                if (prev.Name != e.Name) {
                    changeValue += 'For ID : ' + e.ID + ' value of name changed from ' + prev.Name + ' to ' + e.Name + '\n';
                }

                resId[e.ID] = e
            }
        }
    })

    let resEmail = {}

    for (e in resId) {
        let preEmail = resId[e]['Email'];
        let p = resId[e];
        if (resEmail[preEmail] === undefined) {
            resEmail[preEmail] = p;
        }
        else {
            let prev = resEmail[preEmail];
            if (prev.Date <= p.Date) {

                if (prev.ID != p.ID) {
                    changeValue += 'For Email : ' + p.Email + ' value of ID changed from ' + prev.ID + ' to ' + p.ID + '\n';
                }
                if (prev.Name != p.Name) {
                    changeValue += 'For Email : ' + p.Email + ' value of name changed from ' + prev.Name + ' to ' + p.Name + '\n';
                }

                resEmail[preEmail] = p;
            }
        }
    }

    let results = []
    for (e in resEmail) {
        results.push(resEmail[e]);
    }
    return [results, changeValue];
}

var res = getResult(leads);
//console.log(res);
fs.writeFile('results.json', JSON.stringify(res[0]), function (err) { if (err) console.log(err); else { console.log("Results Done"); } });
fs.writeFile('change.txt', res[1], function (err) { if (err) console.log(err); else { console.log("Log Saved"); } });
