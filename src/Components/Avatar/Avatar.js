import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ENS } from 'ethereum-ens';
import { formatEther } from 'ethers/lib/utils';

const Avatar = () => {
  const { active, account, library } = useWeb3React();
  const [ensName, setEnsName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const resolveEnsName = async () => {
      if (active && account && library) {
        const provider = library.provider;
        const ens = new ENS(provider);
        
        try {
          const resolvedName = await ens.getName(account);
          setEnsName(resolvedName);
        } catch (error) {
          console.log('Error resolving ENS name:', error);
        }
      }
    };

    resolveEnsName();
  }, [active, account, library]);

  useEffect(() => {
    const fetchAvatar = async () => {
      // Replace this with your avatar resolution logic
      // Example: Fetch the avatar URL based on the ENS name or Ethereum address
      // You can use external APIs, IPFS, or any other method to fetch the avatar
      const fetchedAvatarUrl = 'https://example.com/avatar.jpg';
      
      setAvatarUrl(fetchedAvatarUrl);
    };

    if (ensName) {
      fetchAvatar();
    }
  }, [ensName]);

  return (
    <header>
      <nav>
        <div>
          {active ? (
            <>
              {avatarUrl && (
                <img src={avatarUrl} alt="Avatar" />
              )}
              {ensName ? (
                <span>{ensName}</span>
              ) : (
                <span>{account}</span>
              )}
              <span>{formatEther(accountBalance)}</span>
            </>
          ) : (
            <span>Not connected</span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Avatar;