import { NetworkType, Network, DAppClient } from '@airgap/beacon-sdk';
import React from 'react';
import { beaconWallet } from './tezos';

const useWallet = () => {
  const [activeAccount, setActiveAccount] = React.useState(null);
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    beaconWallet.client.getActiveAccount().then((acc) => {
      if (acc) {
        setActiveAccount(acc);
        setConnected(true);
      }
    });
  }, [activeAccount]);

  const connect = async () => {
    const currAcc = await beaconWallet.client.getActiveAccount();
    if (!currAcc) {
      const req = await beaconWallet.client.requestPermissions({
        network: {
          type: 'mainnet',
          rpcUrl: 'https://mainnet.smartpy.io',
        },
      });
      if (req) {
        setActiveAccount(req.accountInfo);
        setConnected(true);
        window.location.reload();
      }
    }
  };

  const disconnect = () => {
    beaconWallet.client.clearActiveAccount();
    setConnected(false);
    window.location.reload();
  };

  return { connect, disconnect, activeAccount, connected };
};

export { useWallet };
