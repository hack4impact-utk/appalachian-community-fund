export interface AdminFilesAddData {
    fileName: string,
    author: string,
    articleDate: Date | null,
    tags: number[],
    category: number[],
    file: any | null,
    stateId: string,
    address: string
}

export const defaultAdminFilesAddData: AdminFilesAddData = {
    fileName: '',
    author: '',
    articleDate: null,
    tags: [],
    category: [],
    file: null,
    stateId: '',
    address: ''
}

export interface AdminLinkAddData {
    url: string,
    title: string,
    description: string,
    state: string,
    address: string,
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
    description: '',
    address: '',
    state: ''
}
