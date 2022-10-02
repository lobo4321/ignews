import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'

import sm from '../../sm.json'

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint)

/** @type {prismic.ClientConfig['routes']} **/
const routes = [
  {
    type: 'publication',
    path: '/',
  },
  {
    type: 'publication',
    path: '/posts',
  },
  {
    type: 'publication',
    path: '/posts/:uid',
  },
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    routes,
    ...config,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}
