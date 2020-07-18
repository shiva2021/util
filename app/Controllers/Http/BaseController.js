'use strict'
const Helpers = use('Helpers')
const getStream = use('get-stream');
const Drive = use('Drive');
class BaseController {
    async fileUplaod({ request, response }) {
        try {
            let {data, name} = request.all();
            data = JSON.stringify(data);
            await Drive.put(name+".json", Buffer.from(data))
            // const fs = Helpers.promisify(require('fs'))
            // await fs.appendFile('newFile.json', data)
            // response.download(Helpers.tmpPath(''));
            // const file = await Drive.get('newFile.json')
            const stream = Drive.getStream(name+".json")
            debugger;
            response.status(200).json({
                message:"File Ready for download!"
            })
        } catch (error) {
            debugger;            
        }
    }

    async fileDownload({request, response, params}){
        const name = params.name+'.json';

    }
}

module.exports = BaseController
