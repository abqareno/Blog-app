import Request from "request";
import publicIp from "public-ip";
import http from "http";

const PORT = process.env.PORT || 4000;
const server = http.createServer(async (req, res) => {
  //set the request route
  if (req.url === "/api/getLocation" && req.method === "GET") {
    //response headers
    res.writeHead(200, { "Content-Type": "application/json" });
    //set the response:
    const ipAddress = await publicIp.v4();
    const options = {
      uri: `https://geolocation-db.com/json/${ipAddress}`,
      method: "GET",
    };
    Request(options, (error, response, body) => {
      if (error) {
        res.statusCode = 500;
        res.write(error);
      }
      if (response.statusCode === 404) {
        console.log(error);
        console.log(response.statusCode);
        res.statusCode = 404;
        res.end({ message: "detection of location has been failed" });
      } else {
        res.end(body);
      }
    });
  }

  // If no route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
