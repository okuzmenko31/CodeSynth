import { Controller } from "react-hook-form";

type MakeOrderFieldSectionProps = {
    control: any;
    sources?: any[];
    fieldLabel?: string;
    fieldName: string;
    fieldId?: string;
    fieldPlaceholder?: string;
    fieldType: string;
    defaultValue?: string;
    fieldRules?: any;
    fieldContainerCustomClass?: string;
    fieldContainerWrapperCustomClass?: string;
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
        (fieldType === "radio" || fieldType === "checkbox"
            ? "category-list"
            : "category-list-area");

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
            case "radio":
                return sources.map((source) => (
                    <div key={source.id} className="list-item">
                        <label
                            className={`form_checkbox ${
                                field.value === source.id ? "active" : ""
                            }`}
                        >
                            <input
                                {...field}
                                name={fieldName}
                                value={source.id}
                                type="radio"
                                className="radio-make-order"
                                checked={field.value === source.id}
                                onChange={() => field.onChange(source.id)}
                            />
                            {source.amount ?? source.name}
                        </label>
                    </div>
                ));
            case "checkbox":
                return sources.map((item) => (
                    <div key={item.id} className="list-item">
                        <label
                            className={`form_checkbox ${
                                field.value.includes(item.id) ? "active" : ""
                            }`}
                        >
                            <input
                                type="checkbox"
                                className="checkbox-make-order"
                                checked={field.value.includes(item.id)}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                        field.onChange([
                                            ...field.value,
                                            item.id,
                                        ]);
                                    } else {
                                        field.onChange(
                                            field.value.filter(
                                                (id: number | string) =>
                                                    id !== item.id
                                            )
                                        );
                                    }
                                }}
                            />
                            {item.name}
                        </label>
                    </div>
                ));
            case "date":
                return <input type="date" {...field} />;
            case "boolean":
                return (
                    <label
                        className={`form_checkbox ${
                            field.value ? "active" : ""
                        }`}
                    >
                        <input
                            type="checkbox"
                            className="checkbox-make-order"
                            checked={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.checked);
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
                            fieldRules && fieldRules.required ? "required" : ""
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
