import { Controller } from 'egg';

export default class DemoController extends Controller {
  async demo1() {
    const r = await this.service.demo.demo1();
    this.ctx.body = {
      status: 200,
      data: {
        r,
      },
    };
  }

  async demo2() {
    const { ctx } = this;
    const { apikey } = ctx.query;
    const r = await this.service.demo.demo2({ apikey });
    // TODO 未进行ctx.body 返回，给出 demo1 的例子，这里正常应该返回到response中间件去统一处理
    this.ctx.body = {
      status: 200,
      data: {
        r,
      },
    };
  }
}
