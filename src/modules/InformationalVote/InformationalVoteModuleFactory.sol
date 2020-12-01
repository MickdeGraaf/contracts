// SPDX-License-Identifier: GPLv3
pragma solidity 0.7.2;
pragma experimental ABIEncoderV2;

import '../../core/ElasticDAO.sol';
import './Manager.sol';

contract InformationalVoteModuleFactory {
  event ManagerDeployed(address indexed managerAddress);

  function deployManager(
    address _ballotModelAddress,
    address payable _elasticDAOAddress,
    address _settingsModelAddress,
    address _voteModelAddress,
    address _votingToken,
    bool _hasPenalty,
    uint256[10] memory _settings
  ) public {
    // creates the manager of the informationalVote Module
    InformationalVoteManager manager = new InformationalVoteManager(
      _ballotModelAddress,
      _settingsModelAddress,
      _voteModelAddress
    );

    // initializes the informationalVoteModule via the manager
    manager.initialize(_votingToken, _hasPenalty, _settings);

    // register the module in ElasticDAO
    ElasticDAO elasticDAO = ElasticDAO(payable(_elasticDAOAddress));
    elasticDAO.initializeModule(address(manager), 'InformationalVoteModule');

    emit ManagerDeployed(address(manager));
  }
}