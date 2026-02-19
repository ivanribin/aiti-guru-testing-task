import ModalWindow from "@components/ModalWindow";
import CreateProductForm from "@components/CreateProductForm";
import PlusCircleIcon from "@assets/icons/plus-circle.svg?react";
import { ReactElement, useState, MouseEvent, Fragment } from "react";
import { Button } from "primereact/button";

const AddProductButton = (): ReactElement => {
    const [isAddProductModalOpened, setIsAddProductModalOpened] =
        useState<boolean>(false);

    const onClick = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();

        setIsAddProductModalOpened((prevState) => !prevState);
    };

    return (
        <Fragment>
            <Button onClick={onClick}>
                <PlusCircleIcon className="action-icon" />
                <span>{`Добавить`}</span>
            </Button>
            {isAddProductModalOpened && (
                <ModalWindow onClose={() => setIsAddProductModalOpened(false)}>
                    <CreateProductForm
                        onSubmit={() => setIsAddProductModalOpened(false)}
                    />
                </ModalWindow>
            )}
        </Fragment>
    );
};

export default AddProductButton;
