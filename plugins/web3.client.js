import Web3 from 'web3';

export default async ({app, store, $axios}) => {

    if (process.client) {
      let instance;
        try {
            instance = new Web3(window.web3.currentProvider);
        } catch (e) {
            try {
                instance = new Web3(Web3.givenProvider);
            } catch (e) {
                try {
                    new Web3.providers.HttpProvider(`https://mainnet.infura.io/`)
                } catch (e) {
                    console.log("No Metamask detected!");
                }
            }
        }
      window.$web3 = instance;
      // store.state.web3 = instance;

      window.$web3.eth.getAccounts().then(accounts => {
        if (accounts.length && accounts[0]) {
            // just get the account address and balance
            window.$web3.eth.getBalance(accounts[0]).then(balance => {
                const data = {
                    account: accounts[0],
                    balance: Number(window.$web3.utils.fromWei(balance)).toFixed(3).toLocaleString(),
                };

                console.log(data);

                // store.state.account.address = data.account;
            });
        } else if (window.ethereum) {
            // privacy mode on
            window.ethereum.enable().then(accounts => {
                window.$web3.eth.getBalance(accounts[0]).then(balance => {
                    const data = {
                        account: accounts[0],
                        balance: Number(window.$web3.utils.fromWei(balance)).toFixed(3).toLocaleString(),
                    };

                    console.log(data);

                    // store.state.account.address = data.account;
                });
            });
        }
    });

    //get network
    window.$web3.eth.net.getId().then(network => {
        console.log(network);
        // store.state.network = network;
    }
    );

    //get network name
    window.$web3.eth.net.getNetworkType().then(network => {
        console.log(network);
    });



      return instance;
    }

}
