//setup state
export const state = () => ({
  count: 0,
  account: {},
  user:{
    accessToken: null,
    userId: null,
  }
});

export const mutations = {
  increment(state) {
    state.count++;
  },
  setAccount(state, account) {
    state.account = account;
  },
  setUser(state, user) {
    state.user.accessToken = user.accessToken;
    state.user.userId = user.userId;
  },
  logOut(state) {
    state.user.accessToken = null;
    state.user.userId = null;
  }
};



