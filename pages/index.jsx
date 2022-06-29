import {client} from "../utils";
import {useState} from "react";
import PostView from "../components/PostView";
import Head from "next/head";
import {groq} from "next-sanity";

const IndexPage = ({posts}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // generate random button handler
    const generateRandom = () => {
        // get a random integer between 0-[posts.length]
        const randomIndex = Math.floor(Math.random() * posts.length);
        if (randomIndex !== currentIndex) setCurrentIndex(randomIndex);
        else generateRandom();
    };

    return <>
        <Head>
            <title>Random Image</title>
            <meta name={"description"} content={"You can see images from photographers randomly!"}/>
        </Head>
        <PostView post={posts[currentIndex]} actions={true} randomFunc={generateRandom}/>
    </>
}

const query = groq`*[_type == "post" && defined(slug.current)][]{
    title,
    "slug": slug.current,
    "photographer": photographer->name,
    mainImage,
    publishedAt
}`

export const getStaticProps = async () => {
    const posts = await client.fetch(query);

    return {
        props: {
            posts,
        },
    }
}


export default IndexPage;
