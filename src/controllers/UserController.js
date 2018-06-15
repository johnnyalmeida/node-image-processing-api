import Logger from '../helpers/Logger';
import UserService from '../services/UserService';

class UserController {
  static async list(req, res) {
    try {
      const rows = await UserService.list();

      res.send({ success: true, data: rows });
    } catch (err) {
      Logger.throw(res, '3272358416', err);
    }
  }

  static async get(req, res) {
    try {
      const user = await UserService.get(req.params);

      if (user === null) {
        res.send({
          success: false,
          code: '7731668134',
          message: req.__('api.user.notFound'),
        });
        return;
      }

      res.send({ success: true, data: user });
    } catch (err) {
      Logger.throw(res, '6001059324', err);
    }
  }

  static async post(req, res) {
    const data = {
      name: req.body.name.trim(),
    };

    try {
      const [id] = await UserService.post(data);
      res.send({ success: true, data: { id } });
    } catch (err) {
      Logger.throw(res, '2365958507', err);
    }
  }

  static async put(req, res) {
    const data = {
      userId: req.params.userId,
      name: req.body.name.trim(),
    };

    try {
      const success = await UserService.put(data);

      if (success === false) {
        res.send({
          success: false,
          code: '7502749763',
          message: req.__('api.user.notFound'),
        });
        return;
      }

      res.send({ success: true });
    } catch (err) {
      Logger.throw(res, '5768905470', err);
    }
  }

  static async delete(req, res) {
    const data = {
      userId: req.params,
    };

    try {
      const success = await UserService.delete(data);

      if (success === false) {
        res.send({
          success: false,
          code: '9517673561',
          message: req.__('api.user.notFound'),
        });
        return;
      }

      res.send({ success: true });
    } catch (err) {
      Logger.throw(res, '5768005470', err);
    }
  }
}

export default UserController;
