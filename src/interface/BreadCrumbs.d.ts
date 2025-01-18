interface ILink {
    link_name: string
    link_to: string
}

interface IBreadCrumbsProps {
    loading?: boolean
    links?: ILink[]
}