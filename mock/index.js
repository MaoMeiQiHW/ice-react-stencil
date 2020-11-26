module.exports = {
  // 同时支持 GET 和 POST
  '/api/users/1': { data: {} },
  '/api/foo/bar': { data: {} },
  '/api/users1': { users: [22222, 2] },

  // 支持标准 HTTP
  'GET /api/users': { users: [1, 2] },
  'DELETE /api/users': { users: [1, 2] },

  // 支持参数
  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ id });
  },

  // 登录
  'POST /api/login': (req, res) => {
    const { userName, password } = req.body;
    if (userName === 'admin' && password === '123456') {
      res.send({
        status: 1,
        data: {
          token: new Date().getTime(),
        },
      });
    } else {
      res.send({ status: 2, message: '账号或密码错误' });
    }
  },

  // token过期的请求
  'POST /api/beOverdue': (req, res) => {
    res.send({ status: 302, message: '请重新登录' });
  },
};
