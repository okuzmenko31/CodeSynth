import { Controller, InputValidationRules } from "react-hook-form";
import { addClassOnChangeState } from "../../utils/addClassOnChangeState";

type MakeOrderFieldSectionProps = {
    control: any;
    sources?: any[];
    fieldLabel?: string;
    fieldName: string;
    fieldId?: string;
    fieldPlaceholder?: string;
    fieldType: string;
    defaultValue?: string;
    fieldRules?: object;
    fieldContainerCustomClass?: any;
    fieldContainerWrapperCustomClass?: any;
};

const MakeOrderFieldSection = ({
    control,
    sources = [],
    fieldLabel,
    fieldName,
    fieldId,
    fieldPlaceholder = "",
    fieldType,
    defaultValue = "",
    fieldRules = {},
    fieldContainerCustomClass,
    fieldContainerWrapperCustomClass,
}: MakeOrderFieldSectionProps) => {
    const allowedFieldTypes = [
        "file",
        "radio",
        "checkbox",
        "boolean",
        "textarea",
        "default",
        "date",
    ];

    const effectiveFieldType = allowedFieldTypes.includes(fieldType)
        ? fieldType
        : "default";

    const fieldContainerClass =
        fieldContainerCustomClass ??
        (fieldType === "radio" || fieldType === "checkbox")
            ? "category-list"
            : "category-list-area";

    const renderField = (field: any) => {
        switch (effectiveFieldType) {
            case "textarea":
                return (
                    <textarea
                        {...field}
                        id={fieldId}
                        placeholder={fieldPlaceholder}
                    />
                );
            case "file":
                return <input {...field} type="file" />;
            case "radio":
                return sources.map((source) => (
                    <div key={source.id} className="list-item">
                        <label className="form_checkbox">
                            <input
                                {...field}
                                name={fieldName}
                                value={source.id}
                                type="radio"
                                className="radio-make-order"
                                onChange={addClassOnChangeState}
                            />
                            {source.name}
                        </label>
                    </div>
                ));
            case "checkbox":
                return sources.map((item) => (
                    <div key={item.id} className="list-item">
                        <Controller
                            name={`project_services[${item.id}]`}
                            control={control}
                            rules={{
                                required:
                                    "You must choose at least one service!",
                            }}
                            render={({ field: { onChange, value } }) => (
                                <label className="form_checkbox">
                                    <input
                                        type="checkbox"
                                        className="checkbox-make-order"
                                        checked={value || false}
                                        onChange={(e) => {
                                            onChange(e.target.checked);
                                            addClassOnChangeState(e);
                                        }}
                                    />
                                    {item.name}
                                </label>
                            )}
                        />
                    </div>
                ));
            case "date":
                return <input type="date" {...field} />;
            case "boolean":
                return (
                    <label className="form_checkbox">
                        <input
                            type="checkbox"
                            className="checkbox-make-order"
                            checked={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.checked);
                                addClassOnChangeState(e);
                            }}
                        />
                        This is hard deadline
                    </label>
                );
            default:
                return (
                    <input
                        {...field}
                        className="order-input"
                        placeholder={fieldPlaceholder}
                    />
                );
        }
    };

    return (
        <>
            <div
                className={
                    fieldContainerWrapperCustomClass ?? "make-order-category"
                }
            >
                {fieldLabel && (
                    <p
                        className={`small-text ${
                            (fieldRules as InputValidationRules).required
                                ? "required"
                                : ""
                        }`}
                    >
                        {fieldLabel}
                    </p>
                )}
                <div className={fieldContainerClass}>
                    <Controller
                        name={fieldName}
                        control={control}
                        defaultValue={defaultValue}
                        rules={fieldRules}
                        render={({ field, fieldState }) => (
                            <>
                                {renderField(field)}
                                {fieldState.error && (
                                    <p className="error">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default MakeOrderFieldSection;
