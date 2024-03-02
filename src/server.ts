import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.get('/houses', async (req: Request, res: Response) => {
  const { name } = req.query as { name?: string }; // Type assertion for query parameter
  
  try {
    // Fetch data from the external API
    const response = await axios.get('https://wizard-world-api.herokuapp.com/houses');
    let houses: any[] = response.data; // Type assertion for houses array
    
    // Filter houses if name query parameter is provided
    if (name) {
      houses = houses.filter(house => house.name.toLowerCase().includes(name.toLowerCase()));
    }
    
    // Send filtered data back to the client
    res.json(houses);
  } catch (error) {
    res.status(500).send('Error fetching houses data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
