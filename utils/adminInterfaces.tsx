export interface AdminFilesAddData {
    fileName: string,
    author: string,
    articleDate: Date | null,
    tags: number[],
    category: number[],
    file: any | null
}

export const defaultAdminFilesAddData: AdminFilesAddData = {
    fileName: '',
    author: '',
    articleDate: null,
    tags: [],
    category: [],
    file: null
}

export interface AdminLinkAddData {
    url: string,
    title: string,
    description: string,
    id?: number,
}

export interface AdminSaveLinkData {
    id: number,
    title: string,
    excerpt: string,
    content: string
}

export const defaultAdminLinkAddData: AdminLinkAddData = {
    url: '',
    title: '',
    description: ''
}
