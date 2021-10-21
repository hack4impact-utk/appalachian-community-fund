export interface ArticleMetaData {
    id: number,
    articleName: string,
    articleDescription: string,
    articleDate: Date,
    articleTags: ArticleTags[]
}

export enum ArticleTags {
    Tag1,
    Tag2,
    Tag3
}

export const testMetaData: ArticleMetaData[] = [
    { id: 1, articleName: "My article 1", articleDescription: "Some cool article", articleDate: new Date(), articleTags: [ArticleTags.Tag1] },
    { id: 2, articleName: "My Secret plans", articleDescription: "Don't look", articleDate: new Date(), articleTags: [ArticleTags.Tag2] },
    { id: 3, articleName: "Article 3", articleDescription: "The third article", articleDate: new Date(), articleTags: [ArticleTags.Tag1, ArticleTags.Tag2] }
];