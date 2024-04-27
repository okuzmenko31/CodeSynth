import { DetailedProjectInfoType } from "../pages/DetailedProjectInformation";

export const detailedProjectsData: DetailedProjectInfoType[] = [
    {
        id: 1,
        name: "Test",
        tags: [],
        preview_image: "string",
        source_link: "string",
        text: "[Testing video](https://youtube.com) \n\n # Hello guises \n\n ### Here is numero synco pa blo escabares del mundo \n\n Numero Synco: Normala del pabla escabares \n\n [![](https://markdown-videos-api.jorgenkh.no/youtube/IJ_sPvbqR6w)](https://youtu.be/IJ_sPvbqR6w)",
    },
    {
        id: 2,
        name: "Test 2",
        tags: [
            {
                id: 1,
                name: "testTag",
                img: "https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png",
            },
        ],
        preview_image: "https://string.com",
        source_link: "https://string.com",
        text: "# Hello gasdadasdasdasas",
    },
];
