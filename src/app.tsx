import * as React from 'react';
import { runApp, IAppConfig } from 'ice';
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
};
runApp(appConfig);
