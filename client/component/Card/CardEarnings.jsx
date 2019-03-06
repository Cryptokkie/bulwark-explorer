import blockchain from '../../../lib/blockchain';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';
import config from '../../../config.js';

const CardEarnings = ({coin}) => {
    const subsidy = blockchain.getMNSubsidy(coin.blocks, coin.mnsOn, coin.supply);
    const day = blockchain.getMNBlocksPerDay(coin.mnsOn) * subsidy;
    const week = blockchain.getMNBlocksPerWeek(coin.mnsOn) * subsidy;
    const month = blockchain.getMNBlocksPerMonth(coin.mnsOn) * subsidy;
    const year = blockchain.getMNBlocksPerYear(coin.mnsOn) * subsidy;

    const ticker = `${config.project.ticker}`;

    const ncoin = v => numeral(v).format('0,0');
    const nbtc = v => numeral(v).format('0,0.00000000');
    const nusd = v => numeral(v).format('$ 0,0.00');

    return (
        <Card title="Estimated Earnings">
            <table className="table_earnings">
                <thead >
                <tr>
                    <td scope="col">/</td>
                    <td scope="col">{ticker}</td>
                    <td scope="col">BTC</td>
                    <td scope="col">USD</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td scope="row">DAY</td>
                    <td>{ncoin(day)} </td>
                    <td>{nbtc(day * coin.btc)}</td>
                    <td>{nusd(day * coin.usd)}</td>
                </tr>
                <tr>
                    <td scope="row">WEEK</td>
                    <td>{ncoin(week)} </td>
                    <td>{nbtc(week * coin.btc)}</td>
                    <td>{nusd(week * coin.usd)}</td>
                </tr>
                <tr>
                    <td scope="row">MONTH</td>
                    <td>{ncoin(month)} </td>
                    <td>{nbtc(month * coin.btc)}</td>
                    <td>{nusd(month * coin.usd)}</td>
                </tr>
                <tr>
                    <td scope="row">YEAR</td>
                    <td>{ncoin(year)} </td>
                    <td>{nbtc(year * coin.btc)}</td>
                    <td>{nusd(year * coin.usd)}</td>
                </tr>
                </tbody>
            </table>
        </Card>
    );
};

/*
{<Card title="Estimated Earnings ( XXX / BTC / USD)">
    <div className="row">
        <div className="col-sm-12 col-md-3">
            DAILY
        </div>
        <div className="col-sm-12 col-md-9">
            { ncoin(day) } { ticker } / { nbtc(day * coin.btc) } BTC / { nusd(day * coin.usd) } USD
        </div>
    </div>
    <div className="row">
        <div className="col-sm-12 col-md-3">
            WEEKLY
        </div>
        <div className="col-sm-12 col-md-9">
            { ncoin(week) } { ticker } / { nbtc(week * coin.btc) } BTC / { nusd(week * coin.usd) } USD
        </div>
    </div>
    <div className="row">
        <div className="col-sm-12 col-md-3">
            MONTHLY
        </div>
        <div className="col-sm-12 col-md-9">
            { ncoin(month) } { ticker } / { nbtc(month * coin.btc) } BTC / { nusd(month * coin.usd) } USD
        </div>
    </div>
    <div className="row">
        <div className="col-sm-12 col-md-3">
            YEARLY
        </div>
        <div className="col-sm-12 col-md-9">
            { ncoin(year) } { ticker } / { nbtc(year * coin.btc) } BTC / { nusd(year * coin.usd) } USD
        </div>
    </div>
    <div className="row">
        <div className="col">
            <small className="u--text-gray">
                * Estimates based on current block subsidy and active masternodes.
            </small>
        </div>
    </div>
</Card>
}
*/


CardEarnings.propTypes = {
    coin: PropTypes.object.isRequired
};

export default CardEarnings;
