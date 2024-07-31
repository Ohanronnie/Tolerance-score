import { ENVIRONMENT } from './common/config/environment.js'
import express from 'express'
import AppError from './common/utils/appError.js'
import { setRoutes } from './modules/routes/index.js'
import {
    catchAsync,
    handleError,
    timeoutMiddleware,
} from './common/utils/errorHandler.js'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
//import { stream } from './common/utils/logger.js'
import morgan from 'morgan'
import { connectDb } from './common/config/database.js'
import csvParser from 'csv-parser'
import fs from 'fs'
import { Tolerance } from './modules/schemas/portfolio.schema.js'
connectDb()
/**
 * Default app configurations
 */
const app = express()
const port = ENVIRONMENT.APP.PORT
const appName = ENVIRONMENT.APP.NAME

/**
 * App Security
 */
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.disable('x-powered-by')
app.use(compression())

/**
 * w
Logger Middleware
 */
app.use(
    morgan(ENVIRONMENT.APP.ENV !== 'local' ? 'combined' : 'dev')
)

// append request time to all request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

/**
 * Initialize routes
 */
app.use('/', setRoutes())

// catch 404 and forward to error handler
app.all(
    '*',
    catchAsync(async (req, res) => {
        throw new AppError('route not found', 404)
    })
)

/**
 * Error handler middlewares
 */
app.use(timeoutMiddleware)
app.use(handleError)

/**
 * status check
 */
app.get('*', (req, res) =>
    res.send({
        Time: new Date(),
        status: 'running',
    })
)
async function AddToDatabase() {
    fs.createReadStream('t.csv')
        .pipe(csvParser())
        .on('data', async (row) => {
            //      const data = new Tolerance();
            let __row = { ...row, tolerance: row['Risk Score/Tolerence'] }
            console.log({ ...row, tolerance: row['Risk Score/Tolerence'] })
            await Tolerance.create(__row)
            //      await data.save()
        })
        .on('end', () => {
            console.log('CSV file successfully written to database.')
        })
}

/**
 * Bootstrap server
 */
app.listen(port, () => {
    console.log('=> ' + appName + 'app listening on port' + port + '!')
    ;(async () => {
        try {
            const tolerance = await Tolerance.find()

            if (tolerance.length == 0) {
                await AddToDatabase()
            }
        } catch (error) {}
    })()
})
export default app;
