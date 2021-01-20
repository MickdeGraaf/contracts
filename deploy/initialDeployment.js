const { ethers } = require('ethers');
const hre = require('hardhat').ethers;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { log } = deployments;
  const { agent } = await getNamedAccounts();

  const Balance = await deployments.get('Balance');
  const BalanceMultipliers = await deployments.get('BalanceMultipliers');
  const Configurator = await deployments.get('Configurator');
  const Dao = await deployments.get('DAO');
  const Ecosystem = await deployments.get('Ecosystem');
  const ecosystemStorage = new ethers.Contract(
    Ecosystem.address,
    Ecosystem.abi,
    hre.provider.getSigner(agent),
  );
  const Token = await deployments.get('Token');
  const TokenHolder = await deployments.get('TokenHolder');

  const ecosystemStructArray = [
    ethers.constants.AddressZero,
    // Models
    Balance.address,
    BalanceMultipliers.address,
    Dao.address,
    Ecosystem.address,
    TokenHolder.address,
    Token.address,
    // Services
    Configurator.address,
    // Tokens
    ethers.constants.AddressZero,
  ];

  console.log('Ecosystem', ecosystemStructArray);

  await ecosystemStorage.functions.serialize(ecosystemStructArray);

  log('##### ElasticDAO: Initialization Complete');
};
module.exports.tags = ['initialDeployment'];
module.exports.dependencies = [
  'Balance',
  'BalanceMultipliers',
  'Configurator',
  'DAO',
  'Ecosystem',
  'ElasticDAOFactory',
  'Token',
  'TokenHolder',
];
