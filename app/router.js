'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const PREFIX = '/api';

module.exports = app => {
  const { router, controller, jwt } = app;
  router.get(`${PREFIX}/`, controller.home.index);
  router.post(`${PREFIX}/upload`, jwt, controller.upload.upload);
  router.get(`${PREFIX}/upload/getUploadToken`, jwt, controller.upload.getUploadToken);

  router.get(`${PREFIX}/diary`, controller.diary.index);
  router.post(`${PREFIX}/diary/save`, jwt, controller.diary.save);
  router.post(`${PREFIX}/diary/del`, jwt, controller.diary.del);

  router.get(`${PREFIX}/soup`, jwt, controller.soup.index);
  router.get(`${PREFIX}/soup/getOne`, controller.soup.getOne);
  router.get(`${PREFIX}/soup/list`, controller.soup.list);
  
  router.get(`${PREFIX}/english/detail`, controller.english.detail);
  router.get(`${PREFIX}/english/list`, controller.english.list);
  router.post(`${PREFIX}/english/detail`, controller.english.detail);
 
  router.get(`${PREFIX}/user`, jwt, controller.user.index);
  router.post(`${PREFIX}/login`, controller.user.login);
};
