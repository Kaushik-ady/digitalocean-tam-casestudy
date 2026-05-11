const express = require('express');
   const app = express();
   const port = process.env.PORT || 3000;

   app.get('/', (req, res) => {
     res.json({
       message: "DigitalOcean TAM Case Study: App is running flawlessly!",
       status: "Healthy",
       timestamp: new Date()
     });
   });

   app.get('/health', (req, res) => {
     res.status(200).send("OK");
   });

   app.listen(port, () => {
     console.log(`App listening on port ${port}`);
   });
