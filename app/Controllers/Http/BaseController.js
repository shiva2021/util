'use strict'
const Helpers = use('Helpers')
const getStream = use('get-stream');
class BaseController {
    async fileUplaod({ request, response }) {
        try {
            let data = request._raw;
            const fs = Helpers.promisify(require('fs'))
            await fs.appendFile('newFile.json', data)
            debugger;
            response.download(Helpers.tmpPath(''));
        } catch (error) {
            debugger;            
        }
    }
}

module.exports = BaseController
