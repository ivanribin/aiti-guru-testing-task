import FormField from "@components/FormField";
import NumberInput from "@components/NumberInput";
import useNotifications from "@hooks/useNotifications";
import ServerResponseParser from "@services/ServerResponseParser";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { IProduct, TCreateProductData } from "@domains/Product";
import { decimalValidator } from "@utils/validators";
import { productsApi } from "@store/api/Products";
import { InputText } from "primereact/inputtext";
import { AlertMessages } from "@utils/constants";
import { AlertTypes } from "@components/Alert";
import { isComplete } from "@utils/typeGuards";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";

const numberKeys: (keyof IProduct)[] = ["price"];

export interface ICreateProductFormProps {
    onSubmit: () => void;
}

const CreateProductForm = ({
    onSubmit,
}: ICreateProductFormProps): ReactElement => {
    const dispatch = useDispatch();

    const { createAlert } = useNotifications();

    const [fieldsValues, setFieldsValues] = useState<
        Partial<TCreateProductData>
    >({});

    const [isSending, setIsSending] = useState<boolean>(false);

    const updateFieldData = <K extends keyof TCreateProductData>(
        key: K,
        value: string | boolean,
    ) => {
        setFieldsValues((previousValues) => {
            if (typeof value === "boolean") {
                return {
                    ...previousValues,
                    [key]: value,
                };
            }

            const parsedValue: string | number = !numberKeys.includes(key)
                ? value
                : Number(value);

            return {
                ...previousValues,
                [key]: parsedValue,
            };
        });
    };

    const handleFormChange = (event: ChangeEvent<HTMLFormElement>): void => {
        const key = event.target.name as keyof TCreateProductData;

        updateFieldData(key, event.target.value);
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        setIsSending(true);

        try {
            createAlert({
                type: AlertTypes.INFO,
                message: AlertMessages.PRODUCT_CREATED,
            });

            dispatch(productsApi.util.invalidateTags(["products"]));

            if (!onSubmit) {
                return;
            }

            onSubmit();
        } catch (error: unknown) {
            const serverErrorMessage: string =
                ServerResponseParser.getErrorMessage(error);

            createAlert({
                type: AlertTypes.ERROR,
                message: serverErrorMessage,
            });
        } finally {
            setIsSending(false);
        }
    };

    const isValid = isComplete<TCreateProductData>(fieldsValues, [
        "title",
        "price",
        "brand",
        "sku",
    ]);

    return (
        <div className="create-event-form">
            <h1 className="centered-text">Create Event</h1>
            <form
                className="entity-form"
                onChange={handleFormChange}
                onSubmit={handleSubmit}
            >
                <div className="fields">
                    <div className="field-wrapper">
                        <FormField label={"Введите название"}>
                            <InputText
                                type="text"
                                value={fieldsValues?.title ?? ""}
                                name={"title"}
                                placeholder="Введите название"
                            />
                        </FormField>
                    </div>
                    <div className="field-wrapper">
                        <FormField label={"Введите цену"}>
                            <NumberInput
                                type="text"
                                value={fieldsValues?.price ?? 0}
                                onChange={(newPrice: number) =>
                                    updateFieldData("price", String(newPrice))
                                }
                                name={"price"}
                                placeholder="Введите название"
                                isFloat
                                validator={decimalValidator}
                            />
                        </FormField>
                    </div>
                    <div className="field-wrapper">
                        <FormField label={"Введите вендор"}>
                            <InputText
                                type="text"
                                value={fieldsValues?.brand ?? ""}
                                name={"brand"}
                                placeholder="Введите вендор"
                            />
                        </FormField>
                    </div>
                    <div className="field-wrapper">
                        <FormField label={"Введите артикул"}>
                            <InputText
                                type="text"
                                value={fieldsValues?.sku ?? ""}
                                name={"sku"}
                                placeholder="Введите артикул"
                            />
                        </FormField>
                    </div>
                </div>
                <Button
                    label="Добавить товар"
                    type="submit"
                    disabled={!isValid}
                    loading={isSending}
                />
            </form>
        </div>
    );
};

export default CreateProductForm;
