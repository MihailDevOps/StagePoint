const SPFNft = artifacts.require('SPFNft');
const USDT = artifacts.require('USDT');

module.exports = function (deployer) {
    deployer.deploy(SPFNft)
}

// module.exports = function (deployer) {
//     deployer.deploy(USDT, 1000000000000)
// }