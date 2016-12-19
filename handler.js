'use strict';
import jsdom from 'jsdom'

module.exports.topGainer = (event, context, callback) => {
  jsdom.env(
    'https://finance.yahoo.com/gainers',
    (err, window) => {

      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'PlainText',
            text: ''
          }
        }
      }

      let error = null
      if (err) {
        error = err
      } else {
        try {
          const name = window.App.main.context.dispatcher.stores.YFinListStore.lists.gainers.positions[0].name
          response.response.outputSpeech.text = `The top gainer for today is ${name}`
        } catch (e) {
          error = e
        }
      }

      if (error) {
        console.error(error)
        response.response.outputSpeech.text = 'Sorry, there was an error fetching the data.'
      }

      callback(null, response)

    }
  )
}
