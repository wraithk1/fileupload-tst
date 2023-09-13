import mongoose, { ConnectOptions } from 'mongoose'
import dbconf from '../db/config'

mongoose.connect(dbconf.connect_url, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)

export default mongoose
