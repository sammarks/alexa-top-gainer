'use strict';
const jsdom = require('jsdom').jsdom
const rp = require('request-promise')
const q = require('q')

module.exports.topGainer = (event, context, callback) => {

  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: ''
      }
    }
  }

  rp({
    method: 'GET',
    url: 'https://finance.yahoo.com/gainers'
  }).then((body) => {
    const promise = q.defer()
    const doc = jsdom(body)
    doc.addEventListener('load', () => {
      try {
        const window = doc.defaultView
        const name = window.App.main.context.dispatcher.stores.YFinListStore.lists.gainers.positions[0].name
        response.response.outputSpeech.text = 'The top gainer for today is ' + name
        callback(null, response)
        promise.resolve()
      } catch (err) {
        promise.reject(err)
      }
    })
    return promise.promise
  }).catch((err) => {
    console.error(err)
    response.response.outputSpeech.text = 'Sorry, there was an error fetching the data.'
    callback(null, response)
  }).finally(() => {
    process.exit(0) // We have to do this because Yahoo has a script running in the background.
  })

}
