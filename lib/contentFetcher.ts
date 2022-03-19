import {promises as fs} from "fs"
import {MDXRemoteSerializeResult} from "next-mdx-remote"
import matter from 'gray-matter'
// @ts-ignore
import {DateTime} from "luxon"

import path from "path"
import {serialize} from "next-mdx-remote/serialize";

const PROJECT_DIR = path.join(process.cwd(), "website", "projects")

export async function getProjects(): Promise<Project[]> {
    let files = await fs.readdir(PROJECT_DIR)
    let projects: Project[] = []
    for (const file of files) {
        let md: Buffer = await fs.readFile(path.join(PROJECT_DIR, file))
        let mdFile = await matter(md)
        let project: Project = {
            title: mdFile.data?.title ?? file,
            date: DateTime.fromISO(mdFile.data?.date),
            content: await serialize(mdFile.content),
            thumbnail: mdFile.data?.thumbnail,
            images: mdFile.data?.images ?? []
        }
        projects.push(project)
    }
    return projects
}

export type Project = {
    title: string
    date: DateTime
    content: MDXRemoteSerializeResult
    thumbnail?: string
    images?: string[]
}