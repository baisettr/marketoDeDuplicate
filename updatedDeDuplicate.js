const fs = require('fs');
const leads = require('./leads.json');


//  function to get the de duplicate results
function getResult(leads) {
    let changeValue = '';

    //  Filtering and Updating the duplicate ID's
    let uniqueIds = {};
    leads.forEach((e) => {
        if (uniqueIds[e.ID] === undefined) {
            uniqueIds[e.ID] = e;
        }
        else {
            //  checking the date is greater or identical
            let prev = uniqueIds[e.ID];
            if (prev.Date <= e.Date) {
                if (prev.Email != e.Email) {
                    changeValue += 'For ID : ' + e.ID + ' value of email changed from ' + prev.Email + ' to ' + e.Email + '\n';
                }
                if (prev.Name != e.Name) {
                    changeValue += 'For ID : ' + e.ID + ' value of name changed from ' + prev.Name + ' to ' + e.Name + '\n';
                }
                uniqueIds[e.ID] = e;
            }
        }
    });

    //  Filtering and Updating the duplicate Emails
    let uniqueEmails = {};
    for (var e in uniqueIds) {       // or Object.keys(uniqueIds).forEach((e)=>{})
        if (uniqueIds.hasOwnProperty(e)) {
            let pEmail = uniqueIds[e].Email;
            let p = uniqueIds[e];

            if (uniqueEmails[pEmail] === undefined) {
                uniqueEmails[pEmail] = p;
            }
            else {
                //  checking the date is greater or identical
                let prev = uniqueEmails[pEmail];
                if (prev.Date <= p.Date) {
                    if (prev.ID != p.ID) {
                        changeValue += 'For Email : ' + p.Email + ' value of ID changed from ' + prev.ID + ' to ' + p.ID + '\n';
                    }
                    if (prev.Name != e.Name) {
                        changeValue += 'For Email : ' + p.Email + ' value of name changed from ' + prev.Name + ' to ' + p.Name + '\n';
                    }
                    uniqueEmails[pEmail] = p;
                }
            }
        }
    }

    //  output in the same format as input format
    let results = [];
    for (var i in uniqueEmails) {       // or Object.keys(uniqueEmails).forEach((e)=>{})
        if (uniqueEmails.hasOwnProperty(i)) {
            results.push(uniqueEmails[i]);
        }
    }
    return [results, changeValue];
}

var res = getResult(leads);         //  The solution runs in O(n) time

//  write the results to results.json file
fs.writeFile('results.json', JSON.stringify(res[0]), function (err) { if (err) console.log(err); else { console.log("Results Done"); } });
//  write the log changes to change.txt
fs.writeFile('change.txt', res[1], function (err) { if (err) console.log(err); else { console.log("Log Saved"); } });
