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

export interface WP_Media {
    date: Date | null,
    date_gmt: Date | null,
    guid: WP_Post_Rendered,
    id: number,
    link: string,
    modified: Date | null,
    modified_gmt: Date | null,
    slug: string,
    status: string,
    type: string,
    permalink_template: string,
    generated_slug: string,
    title: WP_Post_Rendered,
    author: number,
    comment_status: 'open' | 'closed',
    ping_status: 'open' | 'closed',
    meta: any[],
    template: string,
    alt_text: string,
    caption: WP_Post_Rendered,
    description: WP_Post_Rendered,
    media_type: 'image' | 'file',
    mime_type: string,
    media_details: WP_Media_Details,
    post: number,
    source_url: string,
    missing_image_sizes: any[]
}

interface WP_Post_PageData {
    protected: boolean,
    rendered: string
}

interface WP_Post_Rendered {
    rendered: string
}

interface WP_Media_Details {
    file: string,
    height: number,
    image_meta: WP_Media_Details_Image_Meta,
    sizes: WP_Media_Details_Sizes,
    width: number
}

interface WP_Media_Details_Image_Meta {
    aperture: string,
    camera: string,
    caption: string,
    copyright: string,
    created_timestamp: string,
    credit: string,
    focal_length: string,
    iso: string,
    keywords: string[],
    orientation: string,
    shutter_speed: string,
    title: string
}

interface WP_Media_Details_Sizes {
    full: WP_Media_Details_Sizes_Detail,
    medium: WP_Media_Details_Sizes_Detail,
    medium_large: WP_Media_Details_Sizes_Detail,
    thumbnail: WP_Media_Details_Sizes_Detail
}

interface WP_Media_Details_Sizes_Detail {
    file: string,
    height: number,
    mime_type: string,
    source_url: string,
    width: number
}