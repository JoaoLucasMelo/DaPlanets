import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId
export const PlanetSchema = new Schema(
  {
    name: { type: String, required: true },
    starId: { type: ObjectId, required: true, ref: 'Star' },
    creatorId: { type: ObjectId, required: true, ref: 'Profile' }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
PlanetSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
PlanetSchema.virtual('star', {
  localField: 'starId',
  foreignField: '_id',
  justOne: true,
  ref: 'Star'
})
