const GetAuth = (): string => {
    return `Basic ${btoa('acfadmin:'+process.env.NEXT_PUBLIC_WORDPRESS_TOKEN)}`;
}

export { GetAuth };