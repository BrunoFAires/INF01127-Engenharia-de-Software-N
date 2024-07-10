import {colors} from "./colors";

const { colorPrimary, colorSecondary, colorTertiary, bgWhite, placeholder, bgBlack } = colors;
export const components = {
    Layout: {
        headerBg: colorPrimary,
        siderBg: colorSecondary,
    },
    Menu: {
        itemColor: colorPrimary,
        itemSelectedColor: bgWhite,
        itemHoverBg: colorTertiary,
        itemSelectedBg: colorTertiary,
        colorBgContainer: colorSecondary,
        itemBorderRadius: 20,
        colorIconHover: bgWhite,
        itemHoverColor: colorPrimary,
    },
    Button: {
        colorPrimary: colorPrimary,
        colorBgContainer: colorSecondary,
        colorBgBase: colorSecondary,
        colorText: bgWhite
    },
    Input: {
        colorText: bgBlack,
        colorTextPlaceholder: placeholder
    }
};