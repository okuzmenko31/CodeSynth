export type ServiceType = {
    id: number;
    name: string;
    description: string;
};

export const servicesData: ServiceType[] = [
    {
        id: 1,
        name: "Bots",
        description: "We can create Discord or Telegram bots.",
    },
    {
        id: 2,
        name: "Designs",
        description:
            "After agreement with you, we will recreate you dreamed website in Figma first to know that you wanna.",
    },
    {
        id: 3,
        name: "Parsers",
        description: "We can create you a parser.",
    },
    {
        id: 4,
        name: "Deployment",
        description:
            "Deploying is very hard process but we would do it in few moments!",
    },
    {
        id: 5,
        name: "Revision",
        description: "We can do a revision of your app.",
    },
    {
        id: 6,
        name: "Website development",
        description:
            "After creating a design we would create you your website with preferred stack.",
    },
];
