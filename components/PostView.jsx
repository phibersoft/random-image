import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {timeHandler, urlFor} from "../utils";
import {CopyToClipboard} from "react-copy-to-clipboard";
import Image from "next/image";

const PostView = ({post, actions, randomFunc}) => {
    const [currentUrl, setCurrentUrl] = useState('');
    const imageUrl = urlFor(post.mainImage).width(600).url();

    const shareButtonRef = useRef(null);

    useEffect(() => {
        setCurrentUrl(`${window.location.href}post/${post.slug}`)
    }, [post]);

    return (
        <div className={"main-container"}>
            {actions && <a href={currentUrl} target={"_blank"} rel={"noopener noreferrer"}>Open in new tab</a>}
            <div className={"image-wrapper"}>
                <Image
                    src={imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                />
            </div>
            <div className="description">
                <h2 className={"title"}>{post.title} by <span className={"photographer"}>{post.photographer}</span></h2>
                {post.publishedAt && <p>{timeHandler(post.publishedAt)}</p>}
            </div>
            {
                actions && (
                    <div className={"button-group"}>
                        <button className={"random-generator"} onClick={randomFunc} type={"button"}>Get Random</button>
                        <CopyToClipboard text={currentUrl} onCopy={() => {
                            shareButtonRef.current.textContent = 'Copied!';
                            shareButtonRef.current.disabled = true;

                            setTimeout(() => {
                                shareButtonRef.current.textContent = 'Share';
                                shareButtonRef.current.disabled = false;
                            }, 2000);
                        }}>
                            <button className={"share"} ref={shareButtonRef}>Share</button>
                        </CopyToClipboard>
                    </div>
                )
            }
        </div>
    )
}

PostView.proptypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.bool,
    randomFunc: PropTypes.func
}

export default PostView;
