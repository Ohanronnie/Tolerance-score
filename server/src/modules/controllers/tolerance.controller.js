import AppError from '../../common/utils/appError.js'
import { catchAsync } from '../../common/utils/errorHandler.js'
import { Tolerance } from '../schemas/portfolio.schema.js'

export const getTolerance = catchAsync(async (req, res) => {
    const tolerance = req.query.tolerance
    console.log(tolerance)
    const toleranceScore = await Tolerance.findOne({ tolerance })
    if (!toleranceScore) {
        throw new AppError('Risk tolerance not found', 404)
    }

    return res.status(200).json(toleranceScore)
})
