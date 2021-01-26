import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import * as React from "react"
import { getDocIndex, DocIndex, DocData } from '../lib/docs'
import { If } from '../components/conditional'

interface Props {
  readonly index: DocIndex
}

const DocElem: React.FC<{ doc: DocData }> = ({ doc }) => {
  return <>
    <Link href={`/docs/${doc.id}`}>
      <a>{doc.title}</a>
    </Link>
    <If condition={doc.abstract !== null}>
      <div>
        <small>
          {doc.abstract}
        </small>
      </div>
    </If>
  </>
}

export default function Home({ index }: Props) {
  const docs = [
    "loading",
    "gems",
    "collection",
    "faq",
    "cli",
    "prototype",
    "runtime_check",
    "tools",
    "contribution",
  ].map(id => index[id])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Introduction</h2>
        <ul>
          <li><Link href="/news">News</Link></li>
          <li><Link href="/syntax">Syntax</Link></li>
          <li><Link href="/syntax">API</Link></li>
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Guides</h2>
        <ul className={utilStyles.list}>
          {
            docs.map(doc =>
              <li className={utilStyles.listItem} key={doc.id}>
                <DocElem doc={doc} />
              </li>
            )
          }
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps(): Promise<{ readonly props: Props }> {
  const index = await getDocIndex()
  return {
    props: { index: index }
  }
}
