import { setupServer } from 'msw/node';
import { rest } from 'msw';

import defaultApiIndex from './data/defaultProfileApiIndex.json';
import defaultArticles from './data/defaultProfileArticles.json';
import defaultPreview from './data/defaultProfilePreview.json';
import exampleSearchResultsDefaultIndex from './data/exampleSearchResultsDefaultIndex.json';
import exampleSearchResultsAltIndex from './data/exampleSearchResultsAltIndex.json';

import oauthToken from './data/oauthToken.json';

const defaultProfileHandlers = [
	{
		endpoint: 'https://default/jsonapi/',
		mockData: defaultApiIndex,
		method: 'get',
		status: 200,
	},
	{
		endpoint: 'https://default/jsonapi/node/article',
		mockData: defaultArticles,
		method: 'get',
		status: 200,
	},
	{
		endpoint: 'https://default/jsonapi/node/x',
		mockData: {},
		method: 'get',
		status: 200,
	},
	{
		endpoint:
			'https://default/jsonapi/decoupled-preview/1_d4b52b83-e92a-4a4f-b2de-647ecb9fb6d0',
		mockData: defaultPreview,
		method: 'get',
		status: 200,
	},
	{
		endpoint: 'https://default/jsonapi/decoupled-preview/xxxx',
		method: 'get',
		status: 404,
	},
	{
		endpoint: `https://default/oauth/token`,
		mockData: oauthToken,
		method: 'post',
		status: 200,
	},
];

const drupalSearchResultHandlers = [
	{
		endpoint:
			'https://default/en/jsonapi/index/articles_index?filter[fulltext]=milk',
		// Base endpoint without query parameters to satisfy MSW `redundant usage of query parameters` warnings
		baseEndPoint: 'https://default/en/jsonapi/index/articles_index',
		mockData: exampleSearchResultsDefaultIndex,
		method: 'get',
		status: 200,
	},
	{
		endpoint:
			'https://default/en/jsonapi/index/invalid_index?filter[fulltext]=chocolate',
		baseEndPoint: 'https://default/en/jsonapi/index/invalid_index',
		method: 'get',
		status: 400,
	},
	{
		endpoint:
			'https://default/en/jsonapi/index/example_index?filter[fulltext]=chocolate',
		baseEndPoint: 'https://default/en/jsonapi/index/example_index',
		mockData: exampleSearchResultsAltIndex,
		method: 'get',
		status: 200,
	},
];
//construct restHandlers
export const restHandlers = [
	...defaultProfileHandlers,
	...drupalSearchResultHandlers,
].map(({ endpoint, mockData, method, status, baseEndPoint }) => {
	return rest[method](
		baseEndPoint ? baseEndPoint : endpoint,
		(req, res, ctx) => {
			return res(ctx.status(status), ctx.json(mockData));
		},
	);
});

process.env = {
	...process.env,
	__NEXT_IMAGE_OPTS: {
		deviceSizes: [320, 420, 768, 1024, 1200],
		imageSizes: [],
		domains: ['default'],
		path: '/_next/image',
		loader: 'default',
	},
};

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
