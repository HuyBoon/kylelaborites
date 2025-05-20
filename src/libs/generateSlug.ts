import slugify from 'slugify';

export function generateSlug(title: string) {
    return slugify(title, {
        lower: true,
        locale: 'vi',
        remove: /[*+~.()'"!:@?]/g
    });
}
