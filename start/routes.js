'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')

Route.post('/api/fileupload', 'BaseController.fileUplaod')
Route.get('/api/getfile/:name', 'BaseController.fileDownload')
Route.get('/api/delete/files/:name?', 'BaseController.filesDelete')

Route.any('*', ({view}) =>  view.render('app'))