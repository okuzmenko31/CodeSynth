import CryptoWallet from "../assets/projects/Crypto_wallet_main.png";
import EslWeb from "../assets/projects/ESL_esports_main.png";
import FlexFiUpscale from "../assets/projects/FlexFi_upscale_main.png";
import { ProjectType } from "../components/pages/main/PortfolioBlock";

export const projectsData: ProjectType[] = [
    {
        id: 1,
        name: "FlexFi Upscale",
        tags: [],
        preview_image: FlexFiUpscale,
        colors: ["#645881", "#25203E"],
    },
    {
        id: 2,
        name: "ESL Esports",
        tags: [],
        preview_image: EslWeb,
        colors: ["#C9C814", "#747612"],
    },
    {
        id: 3,
        name: "NeoNest Wallet",
        tags: [],
        preview_image: CryptoWallet,
        colors: ["#42A9E9", "#8A54E6"],
    },
];
