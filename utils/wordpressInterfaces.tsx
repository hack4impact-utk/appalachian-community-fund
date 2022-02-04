export interface WP_Post {
    _links: any,
    author: number,
    categories: number[],
    comment_status: "open" | "closed",
    content: WP_Post_PageData,
    date: Date,
    date_gmt: Date,
    excerpt: WP_Post_PageData,
    featured_media: number,
    format: "standard" | "aside" | "chat" | "gallery" | "link" | "image" | "quote" | "status" | "video" | "audio",
    guid: WP_Post_Rendered,
    id: number,
    link: string,
    meta: any[],
    modified: Date,
    modified_gmt: Date,
    ping_status: "open" | "closed",
    slug: string,
    status: "publish" | "future" | "draft" | "pending" | "private",
    sticky: false,
    tags: number[],
    template: string,
    title: WP_Post_Rendered,
    type: string
}

interface WP_Post_PageData {
    protected: boolean,
    rendered: string
}

interface WP_Post_Rendered {
    rendered: string
}