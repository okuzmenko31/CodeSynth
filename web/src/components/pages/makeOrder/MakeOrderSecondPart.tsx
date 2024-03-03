import { Controller } from "react-hook-form";

const MakeOrderSecondPart = ({ control }: any) => {
    return (
        <div className="make-order-second-part">
            <p className="mid-text">Contact Details</p>
            <div className="make-order-category-input">
                <div className="make-order-input-container">
                    <p className="small-text required">Full Name</p>
                    <Controller
                        name="full_name"
                        control={control}
                        defaultValue={""}
                        rules={{
                            required: "Please write your full name!",
                            validate: (value) =>
                                value.trim() !== "" ||
                                "Please write your full name!",
                        }}
                        render={({ field, fieldState }) => (
                            <div className="category-list-area">
                                <input
                                    className="order-input"
                                    placeholder="Name"
                                    {...field}
                                />
                                {fieldState.error && (
                                    <p className="error">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="make-order-input-container">
                    <p className="small-text required">Email Address</p>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue={""}
                        rules={{
                            required: "Please write your email!",
                            validate: (value) =>
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                "Enter a valid email!",
                        }}
                        render={({ field, fieldState }) => (
                            <div className="category-list-area">
                                <input
                                    className="order-input"
                                    placeholder="Email Address"
                                    {...field}
                                />
                                {fieldState.error && (
                                    <p className="error">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="make-order-input-container">
                    <p className="small-text">Company</p>
                    <div className="category-list-area">
                        <Controller
                            name="company"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => (
                                <input
                                    className="order-input"
                                    placeholder="Company Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="make-order-input-container">
                    <p className="small-text">Company website</p>
                    <Controller
                        name="company_website"
                        control={control}
                        defaultValue=""
                        rules={{
                            validate: (value) => {
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
                        render={({ field, fieldState }) => (
                            <div className="category-list-area">
                                <input
                                    className="order-input"
                                    placeholder="https://"
                                    {...field}
                                />
                                {fieldState.error && (
                                    <p className="error">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default MakeOrderSecondPart;
