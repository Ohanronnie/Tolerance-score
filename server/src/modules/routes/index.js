import { Router } from 'express'

const router = Router()
import { toleranceRoutes } from './tolerance.route.js'

export const setRoutes = () => {
    router.use('/tolerance', toleranceRoutes())
    return router
}
