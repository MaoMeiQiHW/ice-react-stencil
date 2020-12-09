import { request } from 'ice';

// interface IState {
//   name: string;
//   department: string;
//   avatar: string;
//   userid: number | null;
// }

export default {
  state: {
    name: 'default',
    department: '',
    avatar: '',
    userid: null,
  },

  effects: (dispatch) => ({
    async fetchUserProfile(value) {
      const res = await request({
        url: 'managesignin',
        method: 'post',
        data: {
          mobile: value.mobile,
          password: value.password,
          remeber: false,
        },
      });
      if (res.error.length === 0) {
        dispatch.user.update(res.data);
      }
      return res;
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
};
