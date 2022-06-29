import {client, urlFor} from "../../utils";
import PostView from "../../components/PostView";
import Head from "next/head";
import {groq} from "next-sanity";

const PostPage = ({post}) => {
    if (!post) return null;


    return <>
        <Head>
            <title>{`${post.title} - Random Image`}</title>
            <meta name={"description"}
                  content={`Here is a awesome image '${post.title}' published by ${post.photographer}`}/>
            <meta property={"og:title"} content={post.title}/>
            <meta property={"og:image"} content={urlFor(post.mainImage).url()}/>
        </Head>
        <PostView post={post}/>
    </>
}

export const getStaticPaths = async () => {
    const paths = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: false,
    }
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "photographer": photographer->name,
    mainImage,
    publishedAt
}`

export const getStaticProps = async ({params}) => {
    const {slug = ""} = params;
    const post = await client.fetch(query, {slug});

    return {
        props: {
            post
        },
        revalidate: 60,
    }
}

export default PostPage;
