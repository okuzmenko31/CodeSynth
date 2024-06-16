import { Control } from "react-hook-form";
import MakeOrderFieldSection from "../../UI/MakeOrderFieldSection";

type MakeOrderSecondPartProps = {
    control: Control;
};

const MakeOrderSecondPart = ({ control }: MakeOrderSecondPartProps) => {
    return (
        <div className="make-order-second-part">
            <p className="pre-big-text bold">Contact Details</p>
            <div className="make-order-category-input">
                <MakeOrderFieldSection
                    control={control}
                    fieldName="full_name"
                    fieldType="default"
                    fieldLabel="Full Name"
                    fieldPlaceholder="Name"
                    fieldContainerWrapperCustomClass={
                        "make-order-input-container"
                    }
                    fieldRules={{
                        required: "Please write your full name!",
                        validate: (value: string) =>
                            value.trim() !== "" ||
                            "Please write your full name!",
                    }}
                />

                <MakeOrderFieldSection
                    control={control}
                    fieldName="email"
                    fieldType="default"
                    fieldLabel="Email Address"
                    fieldPlaceholder="Email Address"
                    fieldContainerWrapperCustomClass={
                        "make-order-input-container"
                    }
                    fieldRules={{
                        required: "Please write your email!",
                        validate: (value: string) =>
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                            "Enter a valid email!",
                    }}
                />

                <MakeOrderFieldSection
                    control={control}
                    fieldName="company"
                    fieldType="default"
                    fieldLabel="Company"
                    fieldPlaceholder="Company Name"
                    fieldContainerWrapperCustomClass={
                        "make-order-input-container"
                    }
                />

                <MakeOrderFieldSection
                    control={control}
                    fieldName="company_website"
                    fieldType="default"
                    fieldLabel="Company website"
                    fieldPlaceholder="https://"
                    fieldContainerWrapperCustomClass={
                        "make-order-input-container"
                    }
                    fieldRules={{
                        validate: (value: string) => {
                            if (!value) {
                                return true;
                            } else {
                                const regExp = /^https:\/\/\S+\.[^\s]+$/;
                                return (
                                    regExp.test(value) ||
                                    "The website URL is incorrect. It should be in the format 'https://example.com'"
                                );
                            }
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default MakeOrderSecondPart;
