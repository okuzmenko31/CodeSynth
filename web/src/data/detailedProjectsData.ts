import CryptoWallet from "../assets/projects/Crypto_wallet_main.png";
import EslWeb from "../assets/projects/ESL_esports_main.png";
import FlexFiUpscale from "../assets/projects/FlexFi_upscale_main.png";
import { DetailedProjectInfoType } from "../pages/DetailedProjectInformation";
import EslEsportsMd from "./markdown/EslEsports.md";
import FlexFiUpscaleMd from "./markdown/FlexFiUpscale.md";
import NeoNestWalletMd from "./markdown/NeoNestWallet.md";

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
        text: fetch(EslEsportsMd).then((res: any) => res.text()),
    },
    {
        id: 3,
        name: "NeoNest Wallet",
        tags: [],
        preview_image: CryptoWallet,
        text: fetch(NeoNestWalletMd).then((res: any) => res.text()),
    },
];
