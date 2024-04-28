import CryptoWallet from "../assets/projects/Crypto_wallet_main.png";
import EslWeb from "../assets/projects/ESL_esports_main.png";
import FlexFiUpscale from "../assets/projects/FlexFi_upscale_main.png";
import { DetailedProjectInfoType } from "../pages/DetailedProjectInformation";
import FlexFiUpscaleMd from "./FlexFiUpscale.md";

export const detailedProjectsData: DetailedProjectInfoType[] = [
    {
        id: 1,
        name: "FlexFi Upscale",
        tags: [],
        preview_image: FlexFiUpscale,
        text: fetch(FlexFiUpscaleMd).then((res: any) => res.text()),
    },
    {
        id: 2,
        name: "ESL Esports",
        tags: [],
        preview_image: EslWeb,
        text: "# Hello gasdadasdasdasas",
    },
    {
        id: 3,
        name: "NeoNest Wallet",
        tags: [],
        preview_image: CryptoWallet,
        text: "[Testing video](https://youtube.com) \n\n # Hello guises \n\n ### Here is numero synco pa blo escabares del mundo \n\n Numero Synco: Normala del pabla escabares \n\n [![](https://markdown-videos-api.jorgenkh.no/youtube/IJ_sPvbqR6w)](https://youtu.be/IJ_sPvbqR6w)",
    },
];
