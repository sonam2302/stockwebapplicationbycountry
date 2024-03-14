import express from "express";
import httpProxy from "http-proxy";
import Consul from "consul";
const app = express();

const proxy = httpProxy.createProxyServer();

  app.all("/user/register", async (req, res) => {
    const consul = new Consul();
    let result = await consul.catalog.service
      .nodes("UserProfileService")
      .catch((err) => {
        console.log(err);
      });
    const serviceNode = result[0];
    const serviceUrl = `http://${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
    console.log(serviceUrl,'serviceUrl')
  proxy.web(req, res, { target: serviceUrl });
});

app.all("/auth/login", async (req, res) => {
  const consul = new Consul();
  let result = await consul.catalog.service
    .nodes("AuthService")
    .catch((err) => {
      console.log(err);
    });
  const serviceNode = result[0];
  const serviceUrl = `http://${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
  console.log(serviceUrl,'serviceUrl')
proxy.web(req, res, { target: serviceUrl });
});

app.all("/api/stocks/*", async (req, res) => {
  const consul = new Consul();
  let result = await consul.catalog.service
    .nodes("StockService")
    .catch((err) => {
      console.log(err);
    });
  const serviceNode = result[0];
  const serviceUrl = `http://${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
  console.log(serviceUrl,'serviceUrl')
proxy.web(req, res, { target: serviceUrl });
});

app.all("/api/wishlist/*", async (req, res) => {
  const consul = new Consul();
  let result = await consul.catalog.service
    .nodes("WishlistService")
    .catch((err) => {
      console.log(err);
    });
  const serviceNode = result[0];
  const serviceUrl = `http://${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
  console.log(serviceUrl,'serviceUrl')
proxy.web(req, res, { target: serviceUrl });
});



app.listen(8000, () => {
  console.log("Server running on port 8000");
});
