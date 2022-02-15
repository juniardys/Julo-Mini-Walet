'use strict'

const moment = use('moment')
const FormatData = exports = module.exports = {}

FormatData.walletFormat = async (wallet) => {
    return {
        id: wallet.id,
        owned_by: wallet.owned_by,
        status: wallet.status,
        enabled_at: moment(wallet.enabled_at).local().format(),
        balance: parseFloat(wallet.balance) || 0,
    }
}

FormatData.disabledWalletFormat = async (wallet) => {
    return {
        id: wallet.id,
        owned_by: wallet.owned_by,
        status: wallet.status,
        disabled_at: moment(wallet.disabled_at).local().format(),
        balance: parseFloat(wallet.balance),
    }
}

FormatData.depositFormat = async (deposit) => {
    return {
        id: deposit.id,
        deposited_by: deposit.deposited_by,
        status: deposit.status,
        deposited_at: moment(deposit.deposited_at).local().format(),
        amount: parseFloat(deposit.amount),
        reference_id: deposit.reference_id,
    }
}

FormatData.withdrawalFormat = async (withdrawal) => {
    return {
        id: withdrawal.id,
        withdrawn_by: withdrawal.withdrawn_by,
        status: withdrawal.status,
        withdrawn_at: moment(withdrawal.withdrawn_at).local().format(),
        amount: parseFloat(withdrawal.amount),
        reference_id: withdrawal.reference_id,
    }
}