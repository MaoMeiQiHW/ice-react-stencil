// 定义全局数据请求
import { request } from 'ice';

export default {
  // 获得一级导航
  async getPrimaryNavigation() {
    return await request({
      url: 'api/admin/selectNavList',
      method: 'get',
    });
  },
};
