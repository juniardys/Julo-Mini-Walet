'use strict'

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

Route.group(() => {
    Route.post('init', 'WalletController.init')
}).prefix('api/v1')

Route.group(() => {
    Route.get('wallet', 'WalletController.wallet')
    Route.post('wallet', 'WalletController.enable')
    Route.patch('wallet', 'WalletController.disable')
    Route.post('wallet/deposits', 'WalletController.deposit')
    Route.post('wallet/withdrawals', 'WalletController.withdrawal')
}).prefix('api/v1').middleware('auth:api')
