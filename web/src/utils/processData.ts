import { ApplicationData } from "../pages/MakeOrder";

export const processData = (data: ApplicationData) => {
    const currentDate = new Date().toISOString().split("T")[0];

    const { services, budget, referral_source, start_date, deadline_date } =
        data;

    if (Array.isArray(services)) {
        data.services = services
            .filter((item) => item != null)
            .map((strId) => Number(strId));
    }

    if (budget) {
        data.budget = Number(budget);
    }

    if (referral_source) {
        data.referral_source = Number(referral_source);
    }

    if (start_date && start_date < currentDate) {
        data.start_date = currentDate;
    }

    if (deadline_date) {
        if (deadline_date < currentDate) {
            data.deadline_date = currentDate;
        } else if (start_date && deadline_date < start_date) {
            data.deadline_date = start_date;
        }
    }

    data.referral_source =
        referral_source === null || isNaN(Number(referral_source))
            ? ""
            : Number(referral_source);
};
