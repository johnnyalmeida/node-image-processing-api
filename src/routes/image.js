import express from 'express';
import ImageController from '../controllers/ImageController';
import ImageSchema from '../routes/schemas/ImageSchema';

export default (config) => {
  const router = express.Router({ mergeParams: true });
  const imageController = new ImageController(config);

  router.post('/', ImageSchema.post, (req, res) => {
    imageController.post(req, res);
  });

  return router;
};
