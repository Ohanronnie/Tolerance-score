import * as mongoose from 'mongoose'

const ToleranceSchema = new mongoose.Schema({
    tolerance: {
        type: String,
        required: true,
    },
    'Nigerian Stocks': {
        type: String,
        required: true,
    },
    'Foriegn Stocks': {
        type: String,
        required: true,
    },
    'Tech Stocks': {
        type: String,
        required: true,
    },
    'Emerging Stocks': {
        type: String,
        required: true,
    },
    'Nigerian Bonds': {
        type: String,
        required: true,
    },
    'Foriegn Bonds': {
        type: String,
        required: true,
    },
    Commodities: {
        type: String,
        required: true,
    },
    'Real Estate': {
        type: String,
        required: true,
    },
    'T-Bills': {
        type: String,
        required: true,
    },
    Alternative: {
        type: String,
        required: true,
    },
})
export const Tolerance = mongoose.model('Tolerance', ToleranceSchema)
