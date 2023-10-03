export interface IGalleryItem {
    posterPath: string
    name: string
    link: string
    content?: {
        title: string
        subTitle? :string
    }
}

export interface iGalleryItemProps {
    item: IGalleryItem
    variant: 'vertical' | 'horizontal'
}