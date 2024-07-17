interface IProps {
    variant: 'title2' | 'subtitle2'
    children: React.ReactNode
}

const Heading = ({ variant, children }: IProps) => {
    switch (variant) {
        case 'title2': return <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white">{children}</h2>
        case 'subtitle2': return <h2 className="mb-4 text-lg text-gray-600 mt-1 text-gray-900 dark:text-white">{children}</h2>
        default: return <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">{children}</h2>
    }
}

export default Heading