import { Dispatch, SetStateAction } from "react";
import { WP_Post } from "./wordpressInterfaces";

export enum ArticleTags {
    Tag1,
    Tag2,
    Tag3

}

export interface ArticleMetaData {
    id: number,
    articleName: string,
    articleDescription: string,
    articleDate: Date,
    articleTags: ArticleTags[],
    articleAddress?: string
}

export interface searchFilterStruct {
    tagParam: string,
    regionParam: string,
    searchWordParam: string,
    dateParam: Date
}

export interface searchContextStruct {
    currentSearchFilters: searchFilterStruct,
    UpdateCurrentFilters: (newFilters: searchFilterStruct) => void,
    allTags: tagStruct[],
    allCategories: categoryStruct[],
    selectedTags: tagStruct[],
    selectedCategories: categoryStruct[],
    setSelectedTags: Dispatch<SetStateAction<tagStruct[]>>,
    setSelectedCategories: Dispatch<SetStateAction<categoryStruct[]>>,
    filteredPosts: WP_Post[] //WP_Post[]
}

export interface tagStruct {
    count: number,
    description: string,
    id: number,
    name: string,
    slug: string
}

export interface categoryStruct {
    count: number,
    description: string,
    id: number,
    name: string,
    slug: string
}

export const testMetaData: ArticleMetaData[] = [
    { id: 1, articleName: "My article 1", articleDescription: "Some cool article", articleDate: new Date(), articleTags: [ArticleTags.Tag1] },
    { id: 2, articleName: "My Secret plans", articleDescription: "Don't look", articleDate: new Date(), articleTags: [ArticleTags.Tag2], articleAddress: "123 Main Street" },
    { id: 3, articleName: "Article 3", articleDescription: "The third article", articleDate: new Date(), articleTags: [ArticleTags.Tag1, ArticleTags.Tag2], articleAddress: "567 Lane" },
    { id: 4, articleName: "My article 4", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag1] },
    { id: 5, articleName: "My article 5", articleDescription: "Some more Data", articleDate: new Date(), articleTags: [ArticleTags.Tag2] },
    { id: 6, articleName: "My article 6", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag1, ArticleTags.Tag2], articleAddress: "Road Ave." },
    { id: 7, articleName: "My article 7", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag2] },
    { id: 8, articleName: "My article 8", articleDescription: "Some more Data", articleDate: new Date(), articleTags: [ArticleTags.Tag2] },
    { id: 9, articleName: "My article 9", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag1, ArticleTags.Tag2] },
    { id: 10, articleName: "My article 10", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag3] },
    { id: 11, articleName: "My article 11", articleDescription: "Some more Data", articleDate: new Date(), articleTags: [ArticleTags.Tag2] },
    { id: 12, articleName: "My article 12", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag1, ArticleTags.Tag2] },
    { id: 13, articleName: "My article 13", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag1] },
    { id: 14, articleName: "My article 14", articleDescription: "Some more Data", articleDate: new Date(), articleTags: [ArticleTags.Tag2] },
    { id: 15, articleName: "My article 15", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag1, ArticleTags.Tag2] },
    { id: 16, articleName: "My article 16", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag1] },
    { id: 17, articleName: "My article 17", articleDescription: "Some more Data", articleDate: new Date(), articleTags: [ArticleTags.Tag2] },
    { id: 18, articleName: "My article 18", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag1, ArticleTags.Tag3], articleAddress: "Some place" },
    { id: 19, articleName: "My article 19", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag3] },
    { id: 20, articleName: "My article 20", articleDescription: "Some more Data", articleDate: new Date(), articleTags: [ArticleTags.Tag2] },
    { id: 21, articleName: "My article 21", articleDescription: "Some Data", articleDate: new Date(), articleTags: [ArticleTags.Tag3, ArticleTags.Tag2] },
];

let searchTags = [
    { label: 'Tag1', value: 'tag1val' },
    { label: 'Tag2', value: 'tag2val' },
    { label: 'Tag3', value: 'tag3val' },
];

let searchRegions = [
    { label: 'region1', value: 'region1val' },
    { label: 'region2', value: 'region2val' },
    { label: 'region3', value: 'region3val' },
];

export{
    searchRegions,
    searchTags,
};

export interface dummyPostStruct {
    title: string,
    articleDate: Date,
    link?: string,
    articleDescription: string,
    tags: number[],
    categories: number[]
}