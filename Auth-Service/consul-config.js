import Consul from 'consul';
import 'dotenv/config';

function ConsulConfiguration(app) {
  const consul = new Consul();
  consul.agent.service.register({
    name: 'AuthService',
    address: process.env.DB_HOSTNAME,
    port: parseInt(process.env.HOST_PORT),
    check: {
      http: `http://${process.env.DB_HOSTNAME}:${process.env.HOST_PORT}/health`,
      interval: '10s',
      timeout: '5s',
    },
  });

  // Discovering the service by the name of the service
  app.get('/health', async (req, res) => {
    try {
      const result = await consul.catalog.service.nodes('AuthService');
      const serviceNode = result[0];
      const serviceUrl = `http://${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
      res.send(`Service discovered at: ${serviceUrl}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error occurred while discovering service');
    }
  });
}

export default ConsulConfiguration;
