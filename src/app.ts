import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(express.json());

// app.use('/authors', authorRoutes);
// app.use('/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
