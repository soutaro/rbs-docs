import Layout from '../../components/layout'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { withRouter, Router } from "next/router"
import { GetStaticPaths, GetStaticProps } from 'next'

const setupLinkClick: (router: Router) => ((node: HTMLDivElement | undefined) => void) = (router) => {
  return (node) => {
    if (node) {
      node.querySelectorAll("a[href^='/']").forEach(node => {
        const url = node["href"]
        node.addEventListener("click", (event: any) => {
          if (event.button === 0) {
            if (!event.altKey && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
              event.preventDefault()
              router.push(url)
            }
          }
        })
      })
    }
  }
}

interface Props {
  readonly postData: PostData
}

const Post: React.FC<Props & { readonly router: Router }> = ({ postData, router }) => {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} ref={setupLinkClick(router)} />
      </article>
    </Layout>
  )
}

export default withRouter(Post)

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (typeof params.id === "string") {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }
}
