/* Public domain project by Cloud Under (https://cloudunder.io).
 * Repository: https://github.com/CloudUnder/lambda-edge-nice-urls
 * Enjoy!
 */
exports.handler = function handler(event, context, callback) {
	const { request } = event.Records[0].cf;
	const { method, uri } = request;

	if (method === 'GET' && uri.match(/\/[^/.]+$/)) {
		request.uri = `${uri}.html`;
	}

	callback(null, request);
};
