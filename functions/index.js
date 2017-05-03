var functions = require('firebase-functions')

exports.addAuthor = functions.database.ref('gradients')
                                 .onWrite(event => {
                                   return event.data.ref.parent.child('author').set(functions.auth.user().uid)
                                 })
