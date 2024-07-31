import { Router } from 'express'
import { getTolerance } from '../controllers/tolerance.controller.js'

const router = Router()

export const toleranceRoutes = () => {
    /**
     * get user
     */
    router.get('/get', getTolerance)

    return router
}
