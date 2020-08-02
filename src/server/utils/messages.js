const moment = require('moment');

function formatMessage(id, username, text, isSystemMsg, room){
    return {
        id: id,
        username: username,
        text: text,
        isSystemMsg: isSystemMsg,
        room: room,
        time: moment().format('hh:mm a')
    }
}

module.exports = formatMessage;