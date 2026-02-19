export const decimalValidator = (value: string): boolean => {
    if (value === "" || value === "-") {
        return true;
    }

    const basicRegex = /^-?\d*[.,]?\d*$/;
    if (!basicRegex.test(value)) {
        return false;
    }

    const separatorIndex = Math.max(value.indexOf("."), value.indexOf(","));

    if (separatorIndex === -1) {
        return true;
    }

    const decimalsLength = value.length - separatorIndex - 1;

    if (decimalsLength > 2) {
        return false;
    }

    return true;
};
