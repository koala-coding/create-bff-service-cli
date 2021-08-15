import { Service } from 'egg';

export default class DemoService extends Service {
  async demo1() {
    return 'hello word';
  }

  async demo2({ apikey }) {
    const { ctx } = this;
    const metadata = await ctx.bffsdk.fetch('/metadata/v2.0/', {
      apiName: '获取元数据信息',
    });
    return {
      metadata,
    };
  }
}
