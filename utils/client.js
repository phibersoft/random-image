import {createClient} from "next-sanity";

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
    apiVersion: '2022-06-28'
};

['dataset', 'projectId'].forEach((key) => {
    if(!config[key]){
        throw new Error(`The ${key} is not set. Check the environment variables.`)
    }
});

export const client = createClient(config);
