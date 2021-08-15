import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  // router.get(`/{{{urlPrefix}}}/demo/demo1`, controller.demo.demo1);
  // router.get(`/{{{urlPrefix}}}/demo/demo2`, controller.demo.demo2);
  router.get(`/demo/demo1`, controller.demo.demo1);
  router.get(`/demo/demo2`, controller.demo.demo2);
};
