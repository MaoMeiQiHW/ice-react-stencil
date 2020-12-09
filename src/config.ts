export default {
  // 本地
  local: {
    baseURL: `http://localhost:${process.env.SERVER_PORT}/api`,
  },
  // 测试
  dailt: {
    baseURL: 'http://uat.jishutao.com/',
  },
  // 生产
  prod: {
    baseURL: 'https://example.com/api',
  },
};
