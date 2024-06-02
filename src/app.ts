import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swaggerConfig';
import { ConnectOptions } from 'mongoose';
import auth from './middlewares/auth';
// import './types/express'; 
// Load environment variables
dotenv.config();

import authRoutes from './routes/auth';
import restaurantRoutes from './routes/restaurant';
import menuRoutes from './routes/menu';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/order';

const app = express();

// Middleware
app.use(bodyParser.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', auth,restaurantRoutes);
app.use('/api/menu', auth,menuRoutes);
app.use('/api/cart', auth,cartRoutes);
app.use('/api/orders',auth, orderRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Database connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;