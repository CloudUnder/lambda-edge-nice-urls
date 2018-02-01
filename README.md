## What is this?

This is an **AWS Lambda@Edge** function to enable **static website hosting on AWS S3 via CloudFront** with beautiful page URLs without .html suffixes and without requiring other hacks.


## What scenarios are supported?

- Standard behaviour is adding a suffix like `.html` to URIs not ending width a slash (`/`).
- Append a suffix like `index.html` to origin requests if the non-root request URIs ends with a slash, e.g. `/some/directory/`.
- Redirect requests to non-root URIs ending with a slash (e.g. `/some/directory/`) to the same URI without the trailing slash (`/some/directory`).


## How does it work?

Build and upload your HTML pages as usual with `.html` suffixes to S3 and access them or link to them without the suffix via CloudFront.

Whenever CloudFront needs to request an object from the origin (e.g. S3 bucket), this Lambda function will dynamically rewrite the request URI before it is forwarded to the origin. If a redirect is required the Lambda function will respond with the redirect without hitting the origin.

If the object is already cached by the CloudFront edge this function will not be triggered.


## Configuration options

### `suffix` ['string' | '' | false | null]

**Recommended value:** `.html`

**Description:** If defined, the given string (e.g. ".html") will be appended to request URIs ending with a suffix-less word.

**Example:** If the config value is set to `.html` the URI `/some/page` will be requested from the origin as `/some/page.html`. URIs ending in "/" are not affected.


### `appendToDirs` ['string' | '' | false | null]

**Recommended value:** `index.html`

**Description:** If defined the given string will be appended to all non-root URIs ending with a slash.

**Example:**  If the value for is set to `index.html` the URI `/some/directory/` will be requested from the origin as `/some/directory/index.html`.


### `removeTrailingSlash` [boolean]

**Description:** If `true` trailing slashes in a non-root request URI will be removed by responding with a `301 Moved Permanently` redirect to the same URI without the trailing slash. The request will not hit the origin and the response may be cached.

**Example:** A request to `/some/directory/` will be answered directly by the Lambda function with a redirect to `/some/directory`.


> You can use either *appendToDirs* or *removeTrailingSlash* (or none of them). Using both options would not make sense. If `appendToDirs` is defined, `removeTrailingSlash` will be ignored.


## Setup (in short)

- Create a new Lambda function in the region us-east-1 (North Virginia) and a *Node.js 6.10* environment.
- Adjust the function code [lambdaRewrite.js](./lambdaRewrite.js) and/or its config options as required and upload (or copy-paste) it to your Lambda function.
- Publish the Lambda function as a new version.
- Add trigger "CloudFront", associate with the CloudFront distribution and the distribution's cache behaviour of your choice (e.g. "*") and select "Origin Request" as CloudFront event.


## More information

Find more information about AWS Lambda@Edge here: https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html


## License

Do whatever you want. A link back to this [repository](https://github.com/CloudUnder/lambda-edge-nice-urls), comments, feedback, contributions are appreciated, but not required.

[Cloud Under Ltd](https://cloudunder.io) is a small web engineering company based in Manchester, UK.
