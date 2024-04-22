
declare type Item = {
    id: number,
    name: string,
    image: string,
    ingredients: string,
    price: number,
    additions: string[],
    comments: string,
    count: number
};

export { Item };