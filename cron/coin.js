require('babel-polyfill');

const {exit, rpc} = require('../lib/cron');
const fetch = require('../lib/fetch');
const locker = require('../lib/locker');
const moment = require('moment');
// Models.
const Coin = require('../model/coin');
const config = require('../config');
/**
 * Get the coin related information including things
 * like price coinmarketcap.com data.
 */
async function syncCoin() {

    let currentPath = process.cwd();
    console.error('see this:', currentPath);//__dirname );

    const date = moment().utc().startOf('minute').toDate();
    // Setup the coinmarketcap.com api url.
    const config = require('../config');
    const url = `${config.coinMarketCap.api}${config.coinMarketCap.ticker}`;

    const info = await rpc.call('getinfo');
    const masternodes = await rpc.call('getmasternodecount');
    const nethashps = await rpc.call('getnetworkhashps');

    let market = await fetch(url);
    if (Array.isArray(market)) {
        market = market.length ? market[0] : {};
    }

    const coin = new Coin({
        cap: market.market_cap_usd,
        createdAt: date,
        blocks: info.blocks,
        btc: market.price_btc,
        diff: info.difficulty,
        mnsOff: masternodes.total - masternodes.stable,
        mnsOn: masternodes.stable,
        netHash: nethashps,
        peers: info.connections,
        status: 'Online',
        supply: market.available_supply, // TODO: change to actual count from db.
        usd: market.price_usd
    });

    await coin.save();
}

/**
 * Handle locking.
 */
async function update() {
    const type = 'coin';
    let code = 0;

    try {
        locker.lock(type);
        await syncCoin();
    } catch (err) {
        console.log(err);
        code = 1;
    } finally {
        try {
            locker.unlock(type);
        } catch (err) {
            console.log(err);
            code = 1;
        }
        exit(code);
    }
}

update();
