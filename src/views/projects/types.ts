export interface ProjectItem {
  text: string
  remark: string
  preview?: string
  npm?: string
  github?: string
}

export interface Project {
  title: string
  subTitle: string
  items: ProjectItem[]
}
