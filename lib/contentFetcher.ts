
import {promises as fs} from "fs"
import {MDXRemoteSerializeResult} from "next-mdx-remote";

const PROJECT_DIR = path.join(process.cwd(), "website", "projects")
export async function getProjects(): Project[] {
    let files = await fs.readdir(PROJECT_DIR)



    return []
}
export type Project = {
    name: string
    date: Date
    content: MDXRemoteSerializeResult
    thumbnail: string | null
    images: string[]
}