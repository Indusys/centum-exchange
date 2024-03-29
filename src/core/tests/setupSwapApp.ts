import SwapApp, { SwapInterface } from 'swap.app'

import swap from './../'

const constants = swap.constants

const SwapAuth = swap.auth
const SwapRoom = swap.room
const SwapOrders = swap.orders

const { EthSwap, EthTokenSwap, BtcSwap } = swap.swaps
const { ETH2BTC, BTC2ETH, ETHTOKEN2BTC, BTC2ETHTOKEN } = swap.flows

import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/1f4e1752f49b4ac8b691620c2ff29603'))
import bitcoin from 'bitcoinjs-lib'


import { LocalStorage } from 'node-localstorage'

import config from './config'

SwapApp.setup({
  network: 'testnet',

  env: {
    web3,
    bitcoin,
    storage: new LocalStorage('./.storage'),
  },

  services: [
    //@ts-ignore
    new SwapAuth({
      eth: null,
      btc: null,
    }),
    new SwapRoom(config.swapRoom),
    new SwapOrders(),
  ],

  swaps: [
    new EthSwap(config.ethSwap),
    new BtcSwap(config.btcSwap),
    new EthTokenSwap(config.noxonTokenSwap),
    new EthTokenSwap(config.swapTokenSwap),
  ],

  flows: [
    ETH2BTC,
    BTC2ETH,
    ETHTOKEN2BTC(constants.COINS.noxon),
    BTC2ETHTOKEN(constants.COINS.noxon),
  ],
})

export default SwapApp.shared()
