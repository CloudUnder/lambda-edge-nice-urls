## What is this?

This is an AWS Lambda@Edge function to enable static website hosting such as AWS S3 via CloudFront with beautiful page URLs without .html suffixes without requiring other hacks.

## How does it work?

Upload your HTML pages as usual with ".html" suffixes to S3 and access them or link to them without the suffix via CloudFront.

Whenever CloudFront needs to request an object from the origin (e.g. S3 bucket), this Lambda function will dynamically add the suffix ".html" if the request is a GET request and the URI doesn't have any dot-suffix at all.

If the object is already cached by the CloudFront edge this function will not be triggered.

## Rewrite examples

- Request URI "/some/page" will request "/some/page.html" from the origin.
- Request URI "/some" will request "/some.html" from the origin.
- Request URI "/" will request "/" from the origin, unless you have a "Default Root Object" defined in your CloudFront distribution settings.
- Request URI "/some/image.jpg" will request "/some/image.jpg" from the origin.
- Request URI "/robots.txt" will request "/robots.txt" from the origin.

## Setup (in short)

- Create a new Lambda function in the region us-east-1 (North Virginia).
- Upload this code.
- Publish Lambda function as a new version.
- Add trigger "CloudFront", associate with the CloudFront distribution and the distribution's cache behaviour of your choice (e.g. "*") and select "Origin Request" as CloudFront event.

## More information

Find more information about AWS Lambda@Edge here: https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html

## License

Do whatever you want. A link back to this [repository](https://github.com/CloudUnder/lambda-edge-nice-urls), comments, feedback, contributions are appreciated, but not required.

[Cloud Under Ltd](https://cloudunder.io) is a small web engineering company based in Manchester, UK.
