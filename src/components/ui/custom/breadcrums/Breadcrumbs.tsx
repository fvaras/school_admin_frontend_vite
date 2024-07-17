import {
    Breadcrumb,
    BreadcrumbItem,
    // BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"
import { Link } from "react-router-dom"

interface IBreadcrumbItem {
    text: string
    link?: string
}

interface IProps {
    items: IBreadcrumbItem[]
}

const Breadcrumbs = ({ items }: IProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, key) => (
                    <React.Fragment key={key}>
                        {item.link &&
                            <BreadcrumbItem>
                                {/* <BreadcrumbLink> */}
                                    <Link to={item.link}>{item.text}</Link>
                                {/* </BreadcrumbLink> */}
                            </BreadcrumbItem>
                        }
                        {!item.link && <BreadcrumbItem>
                            <BreadcrumbPage>{item.text}</BreadcrumbPage>
                        </BreadcrumbItem>
                        }
                        {(key < items.length - 1) && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default Breadcrumbs