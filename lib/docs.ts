import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'docs')

export interface DocData {
  readonly id: string
  readonly title: string
  readonly abstract: string | null
  readonly contentHtml: string
}

export type DocIndex = { [id: string]: DocData }

export async function getDocIndex(): Promise<DocIndex> {
  const index: DocIndex = {}

  const fileNames = fs.readdirSync(postsDirectory)

  for (const fileName of fileNames) {
    const id = fileName.replace(/\.md$/, '')
    const post = await getPostData(id)
    index[id] = post
  }

  return index
}

export function getAllPostIds(): { readonly params: { readonly id: string } }[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string): Promise<DocData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    title: matterResult.data["title"],
    abstract: matterResult.data["abstract"] || null
  }
}
