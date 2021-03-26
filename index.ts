import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create a public HTTP endpoint (using AWS APIGateway)
const endpoint = new awsx.apigateway.API("hello", {
  routes: [
    // Serve a simple REST API on `GET /name` (using AWS Lambda)
    {
      path: "/source",
      method: "GET",
      eventHandler: (req, ctx, cb) => {
        cb(undefined, {
          statusCode: 200,
          body: Buffer.from(JSON.stringify({ name: "AWS" }), "utf8").toString("base64"),
          isBase64Encoded: true,
          headers: { "content-type": "application/json" },
        });
      },
    },
  ],
});

// Export the public URL for the HTTP service
exports.url = endpoint.url;
