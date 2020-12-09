import * as React from 'react';
import { runApp, IAppConfig, config,history } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';
import { Message } from '@alifd/next';
import Cookies from 'js-cookie';
import qs from 'qs';

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
      withCredentials: true,
      withFullResponse: false,
      baseURL: config.baseURL,
      // 拦截器
      interceptors: { 
        request: {
            onConfig: (config) => {
              // 发送请求前：可以对 RequestConfig 做一些统一处理
              console.log(config);
              if(config.method === 'get'){
                config.url = config.url + '?' + qs.stringify({
                  ...(config.data || {}),
                  token: Cookies.get('AFT_SID')
                });
              }else{
                config.data = qs.stringify({
                  ...(config.data || {}),
                  token: Cookies.get('AFT_SID')
                });
              }
              return config;
            },
            onError: (error) => {
              return Promise.reject(error);
            }
        },
        response: {
          onConfig: (response) => {
            // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
            if (response.data.error && response.data.error.length > 0 && response.data.error[0].field === "403") {
              Message.warning('登录超时请重新登录');
              history.push('/user/login');
            }
            Cookies.set('AFT_SID',response.data.token);
            return response;
          },
          onError: (error) => {
            // 请求出错：服务端返回错误状态码
            Message.warning('系统超时请稍后再试');
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
