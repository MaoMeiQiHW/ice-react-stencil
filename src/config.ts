export default {
  // 本地
  local: {
    baseURL: `http://localhost:${process.env.SERVER_PORT}/api`,
  },
  // 测试
  dailt: {
    baseURL: 'https://daily.example.com/api',
  },
  // 生产
  prod: {
    baseURL: 'https://example.com/api',
  },
};
