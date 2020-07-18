'use strict'
const Helpers = use('Helpers')
const Drive = use('Drive');
const fs = Helpers.promisify(require('fs'));

class BaseController {
    async fileUplaod({ request, response }) {
        try {
            let { data, name } = request.all();
            data = JSON.stringify(data);
            await Drive.put(name + ".json", Buffer.from(data))
            response.status(200).json({
                message: "File Ready for download!"
            })
        } catch (error) {
            response.status(400).json({
                error: error
            })
        }
    }

    async fileDownload({ request, response, params }) {
        try {
            const name = params.name + '.json';
            response.attachment(Helpers.tmpPath(name))
        } catch (error) {
            response.status(400).json({
                error: "File Ready for download!"
            })
        }

    }

    async filesDelete({ request, response, params }) {
        try {
            let name = params.name ? params.name + ".json" : "";
            const files = await fs.readdir(Helpers.tmpPath());
            
            if (files.length !== 0) {
                if (name) {
                    await Drive.delete(name);
                } else {
                    for (let i = 0; i < files.length; i++) {
                        const filename = files[i];
                        await Drive.delete(filename);
                    }
                }
            } else {
                if (name) {
                    response.status(400).json({
                        error: 'The file does not exist!'
                    })
                }
            }

            if (name) {
                response.status(200).json({
                    message: 'The file ' + name + ' has been deleted!'
                })
            }
        } catch (error) {
            response.status(400).json({
                error: error
            })
        }
    }
}

module.exports = BaseController
