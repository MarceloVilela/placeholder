import { createConnections } from 'typeorm';

// create a connection using modified connection options
const create = async () => {
  const connection = await createConnections([
    {
      "name": "mongo_staging",
      "type": "mongodb",
      "url": process.env.DB_MONGO_URL,
      "useUnifiedTopology": true,
      "ssl": true,
      "entities": [
        String(process.env.DB_MONGO_ENTITIES)
      ],
      "logging": "all"
    }
  ]);
}

create();
