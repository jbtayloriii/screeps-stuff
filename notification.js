module.exports.sendNotification = function(notificationObj, header) {
    if (Array.isArray(notificationObj)) {
        return sendArray(notificationObj);
    } else if(typeof notificationObj ===  'object') {
        return sendObject(notificationObj);
    } else {
        return false;
    }
}

function sendObject(obj, header) {
    console.log('sending object messages not implemented');
    return false;
}

function sendArray(arr, header) {
    var notificationArr = [];
    var charCount;
    var arrayStart = 0;
    var headerStr;

    if(header) {
        charCount = header.length + 2;
        headerStr = header + '\n\n';
    } else {
        charCount = 0;
        headerStr = "";
    }

    var notificationStr = "";
    for(var i = 0; i < arr.length; i++) {
        if(charCount + arr[i].length > 950) {
            notificationArr.push(headerStr + arr.slice(arrayStart, i).join('\n'));
            arrayStart = i;
            if(header) {
                charCount = header.length + 2;
            } else {
                charCount = 0;
            }
        } else {
            charCount += arr[i].length + 1;
        }
    }

    for(var j = 0; j < notificationArr.length; j++) {
        Game.notify(notificationArr[j] + '\n' + 'Message ' + j + ' of ' + notificationArr.length);
    }
    return true;
}