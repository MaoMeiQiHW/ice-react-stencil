import * as React from 'react';
import { runApp, IAppConfig, config } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';

const locale = getLocale();

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    ),
    getInitialData: async () => {
      // 模拟服务端返回的数据
      // const data = await request('/api/auth');
      const data = {
        admin: true,
        guest: false,
      }

      // 约定权限必须返回一个 auth 对象
      // 返回的每个值对应一条权限
      return {
        auth: data
      }
    },
  },
  request: [
    // 默认请求
    {
      withFullResponse: false,
      baseURL: config.baseURL,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'token': sessionStorage.getItem('token'),
      },
      // 拦截器
      interceptors: {
        request: {
            onConfig: (config) => {
              // 发送请求前：可以对 RequestConfig 做一些统一处理
              config.headers = { a: 1 };
              return config;
            },
            onError: (error) => {
              return Promise.reject(error);
            }
        },
        response: {
          onConfig: (response) => {
            // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
            if (!response.data.status !== 1) {
              alert('请求失败');
            }
            return response;
          },
          onError: (error) => {
            // 请求出错：服务端返回错误状态码
            console.log(error,'app.js');
            return Promise.reject(error);
          }
        },
      }
    },
    // 上传文件使用的请求方法
    {
      instanceName: 'uploadFile',
      withFullResponse: false,
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'multipart/form-data',
        "token": sessionStorage.getItem('token'),
      },
      method: 'post',
      // 拦截器
      interceptors: {
        request: {
            onConfig: (config) => {
              // 发送请求前：可以对 RequestConfig 做一些统一处理
              config.headers = { instanceName: 'request2' };
              return config;
            },
            onError: (error) => {
              return Promise.reject(error);
            }
        },
        response: {
          onConfig: (response) => {
            // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
            if (!response.data.status !== 1) {
              alert('请求失败');
            }
            return response;
          },
          onError: (error) => {
            // 请求出错：服务端返回错误状态码
            console.log(error,'app.js====>instanceName:uploadFile');
            return Promise.reject(error);
          }
        },
      }
    }
  ]
};
runApp(appConfig);
