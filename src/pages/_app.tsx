import { AppProps } from 'next/app'
import Link from 'next/link'
import { Header } from '../components/Header'
import { Session } from 'next-auth'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'

import { SessionProvider as NextAuthProvider } from 'next-auth/react'

import '../styles/global.scss'
import { repositoryName } from '../services/prismic'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PrismicProvider
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )}
      >
        <Header />
        <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </NextAuthProvider>
  )
}

export default MyApp
