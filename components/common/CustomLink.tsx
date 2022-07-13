import React, { ReactElement } from "react";
import Link from "next/link";


export const CustomLink = ({text, href, style}): ReactElement => {
    return (
        <Link href={href}>
            <a className={style}>{text}</a>
        </Link>
    )
}
