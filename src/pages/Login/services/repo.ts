import { request } from 'ice';

export default {
  // 登录
  async login(username, password) {
    return await request({
      url: 'api/admin/selectMenuList',
      method: 'post',
      data: {
        userName: username,
        password: password,
      },
    });
  },

  // 简单场景
  async getUser1() {
    return await request({
      url: '/updateFile',
      instanceName: 'uploadFile',
    });
  },

  // 参数场景
  async getRepo(id) {
    return await request(`/api/repo/${id}`);
  },

  // 格式化返回值
  async getDetail(params) {
    const data = await request({
      url: '/api/detail',
      params,
    });

    return data.map((item) => {
      return {
        ...item,
        price: item.oldPrice,
        text: item.status === '1' ? '确定' : '取消',
      };
    });
  },
};
