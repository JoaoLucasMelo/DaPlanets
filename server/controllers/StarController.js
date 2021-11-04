import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from '../db/DbContext'
import { starService } from '../services/StarService'
import BaseController from '../utils/BaseController'

export class StarController extends BaseController {
  constructor() {
    super('api/stars')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    const query = req.query
    const stars = await starService.getAll(query)
    res.send(stars)
  }

  async getById(req, res, next) {
    try {
      const star = await starService.getById(req.params.id)
      res.send(star)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const star = await dbContext.Star.create(req.body)
      res.send(star)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await starService.edit(req.body)
      res.send(update)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await starService.remove(req.params.id, req.userInfo.id)
      return res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
