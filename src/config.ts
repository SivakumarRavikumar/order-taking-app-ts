const config = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    jwtSecret: process.env.JWT_SECRET || 'secret123',
    Memory: true,
    IP: '127.0.0.1',
    Port: '27017',
    Database: 'test'
};
export default config;
