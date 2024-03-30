export type ServiceType = {
    id: number;
    name: string;
    description: string;
};

export const servicesData: ServiceType[] = [
    {
        id: 1,
        name: "Custom Website Development",
        description:
            "Transform your digital presence with our custom website development service. Leveraging the latest technologies and your preferred stack, we craft seamless, dynamic websites that not only look stunning but also perform exceptionally across all devices.",
    },
    {
        id: 2,
        name: "Innovative Design Solutions",
        description:
            "Bring your digital dreams to life with our innovative design solutions. From concept to prototype, our design team works closely with you to create visually captivating designs in Figma that perfectly capture your brand's essence and engage your target audience.",
    },
    {
        id: 3,
        name: "Expert App Revision",
        description:
            "Elevate your app's performance and user experience with our expert revision service. Our team meticulously analyzes and refines your application, ensuring it operates flawlessly and stands out in the competitive digital landscape.",
    },
    {
        id: 4,
        name: "Advanced Data Parsing",
        description:
            "Unlock the full potential of your data with our advanced parsing services. Whether it's for data analysis, migration, or integration, our custom parsers are designed to handle complex data structures efficiently, providing you with clean, actionable insights.",
    },
    {
        id: 5,
        name: "Bespoke Bot Development",
        description:
            "Automate and innovate with our bespoke bot development service for Discord and Telegram. Tailored to your specific needs, our bots enhance engagement, streamline operations, and provide personalized user experiences.",
    },
    {
        id: 6,
        name: "Seamless Deployment Solutions",
        description:
            "Experience hassle-free deployment with our seamless solutions. Our team expertly navigates the complexities of deploying digital projects, ensuring a smooth transition from development to live environment in record time.",
    },
];
