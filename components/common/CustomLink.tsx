import React from "react";
import Link from "next/link";

{/* <Link href="/">
    <a className="nav-header-logo">
        LOGO
    </a>
</Link> */}

export const CustomLink = ({text, href, style}) => {
    return (
        <Link href={href}>
            <a className={style}>{text}</a>
        </Link>
    )
}
