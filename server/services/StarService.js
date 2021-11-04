import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class StarService {
  async getAll(query = {}) {
    const stars = await dbContext.Star.find({})
      .populate('creator', 'name')
      .populate('galaxy', 'name')
    return stars
  }

  async getById(id) {
    const star = await dbContext.Star.findById(id)
      .populate('creator', 'name')
      .populate('galaxy', 'name')
    return star
  }

  async create(body) {
    const star = await dbContext.Star.create(body)
    return star
  }

  async edit(body) {
    const found = await this.getById(body.id)
    if (found.creatorId.toString() !== body.creatorId) {
      throw new BadRequest('No Permition to Edit!')
    }
    const updated = await dbContext.Star.findOneAndUpdate({ id: body.id }, body, { new: true })
    return updated
  }

  async remove(id, userId) {
    const found = await this.getById(id)
    if (found.creatorId.toString() !== userId) {
      throw new Forbidden('No Permit to Delete!')
    }
    return await dbContext.Star.findByIdAndDelete(id)
  }
}
export const starService = new StarService()
