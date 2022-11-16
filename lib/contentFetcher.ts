import {promises as fs} from "fs"
import {MDXRemoteSerializeResult} from "next-mdx-remote"
import matter from 'gray-matter'
// @ts-ignore

import path from "path"
import {serialize} from "next-mdx-remote/serialize";
import {DateTime, Interval} from "luxon";

const PROJECT_DIR = "/website/projects/"
const PROJECT_DIR_ABS = path.join(process.cwd(), "public", PROJECT_DIR)
const POST_DIR = "/website/posts/"
const POST_DIR_ABS = path.join(process.cwd(), "public", POST_DIR)

export async function getProjects(): Promise<Project[]> {
    let files = await fs.readdir(PROJECT_DIR_ABS)
    let projects: Project[] = []

    for (const file of files) {
        let filename = path.parse(file).name
        if (!(file.endsWith(".md") || file.endsWith(".mdx"))) continue;

        let md: Buffer = await fs.readFile(path.join(PROJECT_DIR_ABS, file))
        let mdFile = await matter(md)
        let thumbnail = mdFile.data?.thumbnail ? `${PROJECT_DIR}${filename}/${mdFile.data.thumbnail}` : mdFile.data?.thumbnail

        let images = mdFile.data?.images ? mdFile.data?.images.map((i: string) => `${PROJECT_DIR}${filename}/${i}`) : mdFile.data?.images

        let project: Project = {
            title: mdFile.data?.title ?? file,
            date: mdFile.data?.date?.toISOString() ?? "Undated",
            importance: mdFile.data?.importance ?? 1,
            description: mdFile.data?.description ?? null,
            status: mdFile.data?.status,
            featured: mdFile.data?.featured ?? false,
            slug: filename,
            content: await serialize(mdFile.content),
            thumbnail: thumbnail,
            images: images ?? []
        }
        projects.push(project)
    }

    projects.sort(sortWeighted)
    console.log(projects.map(p => [p.date, p.importance]))
    return projects
}

let IMPORTANCE_WEIGHT = 100
let ONGOING_WEIGHT = 10000
let FEATURED_WEIGHT = 1000000

function sortWeighted(a: Project, b: Project): number {
    let interval = Interval.fromDateTimes(DateTime.fromISO(a.date), DateTime.fromISO(b.date))
    let intervalDays = !isNaN(interval.length("days")) ? interval.length("days") :
        -Interval.fromDateTimes(DateTime.fromISO(b.date), DateTime.fromISO(a.date)).length("days")

    let importanceDiff = ((a.importance ?? 0) * IMPORTANCE_WEIGHT) - ((b.importance ?? 0) * IMPORTANCE_WEIGHT)

    let ongoing = (a.status == "Ongoing" ? ONGOING_WEIGHT : 0) - (b.status == "Ongoing" ? ONGOING_WEIGHT : 0)
    let featured = (a.featured ? FEATURED_WEIGHT : 0) - (b.featured ? FEATURED_WEIGHT : 0)

    return intervalDays - importanceDiff - ongoing - featured
}


export async function getPosts(): Promise<Post[]> {
    let files = await fs.readdir(POST_DIR_ABS)
    let posts: Post[] = []

    for (const file of files) {
        let filename = path.parse(file).name
        if (!(file.endsWith(".md") || file.endsWith(".mdx"))) continue;

        let md: Buffer = await fs.readFile(path.join(POST_DIR_ABS, file))
        let mdFile = await matter(md)
        let thumbnail = mdFile.data?.thumbnail ? `${POST_DIR}${filename}/${mdFile.data.thumbnail}` : mdFile.data?.thumbnail

        let images = mdFile.data?.images ? mdFile.data?.images.map((i: string) => `${POST_DIR}${filename}/${i}`) : mdFile.data?.images

        let post: Post = {
            title: mdFile.data?.title ?? file,
            date: mdFile.data?.date?.toISOString() ?? "Undated",
            importance: mdFile.data?.importance ?? 0,
            description: mdFile.data?.description ?? "",
            slug: filename,
            content: await serialize(mdFile.content),
            thumbnail: thumbnail ?? null,
            images: images ?? null
        }
        posts.push(post)
    }
    return posts
}

type ProjectStatus = "Ongoing" | "Completed" | "On Hold"
export type Project = {
    title: string
    date: string
    status: ProjectStatus
    slug: string
    featured: true
    description: string
    importance: number
    content: MDXRemoteSerializeResult
    thumbnail?: string
    images?: string[]
}

export interface IDateSortable {
    date: string
    importance?: number
}

export type Post = {
    title: string
    date: string
    slug: string
    description: string
    importance?: number
    content: MDXRemoteSerializeResult
    thumbnail?: string
    images?: string[]
}
