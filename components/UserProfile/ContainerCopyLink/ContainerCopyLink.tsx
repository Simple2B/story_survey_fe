import React, { ReactElement } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "./ContainerCopyLink.module.css";
import iconLink from "../../../styles/icons/icons8-link-64.png";

const ContainerCopyLink = ({isCopiedLink, copyLink, isPublic, uuid, title, published}): ReactElement => {

    return (
        <>
            {
                ((!isPublic || isPublic) && published) && (
                    <div className={styles.containerIconLink}>
                        <i
                            className={styles.iconLink}
                            title="copy link"
                            onClick={() => {copyLink(uuid, title, published)}}
                        >
                            <Image src={iconLink} height={30} width={30}/>
                        </i>

                        {
                            isCopiedLink.surveyUUID === uuid && (
                            <div className={styles.linkCopied}>
                                copied
                            </div>
                            )
                        }
                        <Link href={`/survey/${uuid}`}>
                            <a target="_blank" className="card-link">
                                survey
                            </a>
                        </Link>
                    </div>
                )
            }
            { !published && <div></div> }
            { !published && isPublic &&
                (
                    <div className={styles.containerIconLink}>
                        <i
                            className={styles.iconLink}
                            title="copy link"
                            onClick={() => {copyLink(uuid, title, published)}}
                        >
                            <Image src={iconLink} height={30} width={30}/>
                        </i>
                        {
                            isCopiedLink.surveyUUID === uuid && (
                            <div className={styles.linkCopied}>
                                copied
                            </div>
                            )
                        }

                        <Link
                            href={`/survey/not_public/${uuid}`}
                        >
                            <a
                            target="_blank"
                            className="card-link">
                                survey
                            </a>
                        </Link>
                    </div>
                )
            }
        </>
    )
}

export default ContainerCopyLink;
