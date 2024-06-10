import {promises as fs} from "fs"
import {MDXRemoteSerializeResult} from "next-mdx-remote"
import matter from 'gray-matter'
// @ts-ignore

import path from "path"
import {serialize} from "next-mdx-remote/serialize";
import {DateTime, Interval} from "luxon";

const PROJECT_DIR = "/projects/"
const PROJECT_DIR_ABS = path.join(process.cwd(), "public", PROJECT_DIR)

export async function getProjects(): Promise<Project[]> {
    let files = await fs.readFile(path.join(PROJECT_DIR_ABS, "list.md"))
    let file_list = files.toString().replaceAll("\r", "").split('\n')
    console.log(file_list)


    let projects: Project[] = []

    for (const filename of file_list) {
        if (filename == '') continue;

        let md: Buffer = await fs.readFile(path.join(PROJECT_DIR_ABS, filename, filename + ".md"))
        let mdFile = matter(md)
        let thumbnail = mdFile.data?.thumbnail ? `${PROJECT_DIR}${filename}/media/${mdFile.data.thumbnail}` : mdFile.data?.thumbnail

        let images = mdFile.data?.images ? mdFile.data?.images.map((i: string) => `${PROJECT_DIR}${filename}/media/${i}`) : mdFile.data?.images

        let project: Project = {
            title: mdFile.data?.title ?? filename,
            description: mdFile.data?.description ?? null,
            slug: filename,
            content: await serialize(mdFile.content),
            thumbnail: thumbnail,
            images: images ?? []
        }
        projects.push(project)
    }

    return projects
}


export type Project = {
    title: string
    slug: string
    description: string
    content: MDXRemoteSerializeResult
    date?: string
    thumbnail?: string
    images?: string[]
}

export type ExperienceEntry = {
    title: string
    company: string
    dates: string
    content: string
    contentSerialized?: MDXRemoteSerializeResult
}

export function parseExperience(file: Buffer): ExperienceEntry[] {
    let entries: ExperienceEntry[] = []

    let lines = file.toString().split('\n')

    for (const line of lines) {
        if (line.startsWith("# ")) {
            entries.push({
                title: line.substring(2),
                company: "",
                dates: "",
                content: "",
            })
        } else if (line.startsWith("## ")) {
            entries[entries.length - 1].company = line.substring(3)
        } else if (line.startsWith("### ")) {
            entries[entries.length - 1].dates = line.substring(4)
        } else {
            entries[entries.length - 1].content += line + "\n"
        }
    }
    return entries
}