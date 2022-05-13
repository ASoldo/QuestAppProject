//setup state
export const state = () => ({
  count: 0,
  account: {
    address: null,
    nonce: null,
    signature: null,
  },
  data: null,
  web3: null,
});

export const mutations = {
  increment(state) {
    state.count++;
  }
};



