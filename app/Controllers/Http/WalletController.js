'use strict'

const FormatData = use('App/FormatData')
const { validate } = use('Validator')
const Customer = use('App/Models/Customer')
const Wallet = use('App/Models/Wallet')
const Deposit = use('App/Models/Deposit')
const Withdrawal = use('App/Models/Withdrawal')
const moment = use('moment')

class WalletController {

    async init({ request, response, auth }) {
        if (!request.input('customer_xid')) {
            return response.status(400).json({
                data: {
                    error: {
                        customer_xid: [
                            'Missing data for required field.'
                        ],
                    },
                },
                status: 'fail',
            })
        } else {
            const customer = await Customer.find(request.input('customer_xid'))

            if (customer.id) {
                const token = await auth.authenticator('api').generate(customer)
                return response.status(201).json({
                    data: {
                        token: token.token
                    },
                    status: 'success',
                })
            } else {
                return response.status(400).json({
                    data: {
                        error: 'Data not found',
                    },
                    status: 'fail',
                })
            }
        }
    }

    async enable({ response, auth }) {
        var customer = null

        try {
            customer = await auth.getUser()
        } catch (error) {
            return response.status(400).json({
                status: 'fail',
                data: {
                    error: 'Missing or invalid api token',
                },
            })
        }

        var wallet = await Wallet
            .query()
            .where('owned_by', customer.id)
            .first()
        
        if (wallet && wallet.status == 'enabled') {
            return response.status(400).json({
                status: 'fail',
                data: {
                    error: 'Already enabled',
                },
            })
        } else {
            if (wallet) {
                wallet.status = 'enabled'
                wallet.enabled_at = moment().format('YYYY-MM-DD HH:mm:ss')

                await wallet.save()
            } else {
                wallet = new Wallet()

                wallet.owned_by = customer.id
                wallet.status = 'enabled'
                wallet.enabled_at = moment().format('YYYY-MM-DD HH:mm:ss')

                await wallet.save()
            }

            return response.status(201).json({
                status: 'success',
                data: {
                    wallet: await FormatData.walletFormat(wallet),
                },
            })
        }
    }

    async wallet({ response, auth }) {
        var customer = null

        try {
            customer = await auth.getUser()
        } catch (error) {
            return response.status(400).json({
                status: 'fail',
                data: {
                    error: 'Missing or invalid api token',
                },
            })
        }

        var wallet = await Wallet
            .query()
            .where('owned_by', customer.id)
            .first()
        
        if (!wallet || (wallet && wallet.status == 'disabled')) {
            return response.status(404).json({
                status: 'fail',
                data: {
                    error: 'Disabled',
                },
            })
        } else {
            return response.status(200).json({
                status: 'success',
                data: {
                    wallet: await FormatData.walletFormat(wallet),
                },
            })
        }
    }

    async disable({ response, auth }) {
        var customer = null

        try {
            customer = await auth.getUser()
        } catch (error) {
            return response.status(400).json({
                status: 'fail',
                data: {
                    error: 'Missing or invalid api token',
                },
            })
        }

        var wallet = await Wallet
            .query()
            .where('owned_by', customer.id)
            .first()

        if (wallet) {
            wallet.status = 'disabled'
            wallet.disabled_at = moment().format('YYYY-MM-DD HH:mm:ss')

            await wallet.save()
        } else {
            wallet = new Wallet()

            wallet.owned_by = customer.id
            wallet.status = 'disabled'
            wallet.disabled_at = moment().format('YYYY-MM-DD HH:mm:ss')

            await wallet.save()
        }

        return response.status(200).json({
            status: 'success',
            data: {
                wallet: await FormatData.disabledWalletFormat(wallet),
            },
        })
    }

    async deposit({ request, response, auth }) {
        var customer = null

        try {
            customer = await auth.getUser()
        } catch (error) {
            return response.status(400).json({
                status: 'fail',
                data: {
                    error: 'Missing or invalid api token',
                },
            })
        }

        var wallet = await Wallet
            .query()
            .where('owned_by', customer.id)
            .first()
        
        if (!wallet || (wallet && wallet.status == 'disabled')) {
            return response.status(404).json({
                status: 'fail',
                data: {
                    error: 'Disabled',
                },
            })
        } else {
            const deposit = new Deposit()

            deposit.wallet_id = wallet.id
            deposit.deposited_by = customer.id
            deposit.status = 'success'
            deposit.deposited_at = moment().format('YYYY-MM-DD HH:mm:ss')
            deposit.amount = request.input('amount', 0)
            deposit.reference_id = request.input('reference_id')

            await deposit.save()

            wallet.balance += parseFloat(deposit.amount)

            await wallet.save()

            return response.status(200).json({
                status: 'success',
                data: {
                    deposit: await FormatData.depositFormat(deposit),
                },
            })
        }
    }

    async withdrawal({ request, response, auth }) {
        var customer = null

        try {
            customer = await auth.getUser()
        } catch (error) {
            return response.status(400).json({
                status: 'fail',
                data: {
                    error: 'Missing or invalid api token',
                },
            })
        }

        var wallet = await Wallet
            .query()
            .where('owned_by', customer.id)
            .first()
        
        if (!wallet || (wallet && wallet.status == 'disabled')) {
            return response.status(404).json({
                status: 'fail',
                data: {
                    error: 'Disabled',
                },
            })
        } else {
            const withdrawal = new Withdrawal()

            withdrawal.wallet_id = wallet.id
            withdrawal.withdrawn_by = customer.id
            withdrawal.status = 'success'
            withdrawal.withdrawn_at = moment().format('YYYY-MM-DD HH:mm:ss')
            withdrawal.amount = request.input('amount', 0)
            withdrawal.reference_id = request.input('reference_id')

            await withdrawal.save()

            wallet.balance -= parseFloat(withdrawal.amount)

            await wallet.save()

            return response.status(200).json({
                status: 'success',
                data: {
                    withdrawal: await FormatData.withdrawalFormat(withdrawal),
                },
            })
        }
    }
}

module.exports = WalletController
