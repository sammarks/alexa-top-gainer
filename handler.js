'use strict';

module.exports.topGainer = (event, context, callback) => {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Here\'s some text.'
      }
    }
  }

  callback(null, response)
}
