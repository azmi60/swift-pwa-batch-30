/* eslint-disable indent */
// eslint-disable-next-line import/prefer-default-export
export const frontendConfig = (pwaConfig) => {
    if (pwaConfig) {
        let button_text_color = pwaConfig.button_text_color || pwaConfig.font_color || '#FFFFFF';
        const button_background_color = pwaConfig.button_background_color || '#000000';
        const button_disabled_text_color = pwaConfig.button_disabled_text_color || '#FFFFFF';
        if (button_text_color === button_background_color) {
            button_text_color = button_background_color === '#FFFFFF' ? '#000000' : '#FFFFFF';
        }
        return `
            body {
                background-color: ${pwaConfig.background_color || '#ffffff'};
                color: ${pwaConfig.font_color || '#000000'};
            }
            main {
                background-color: ${pwaConfig.background_color || '#ffffff'};
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .nav > li > a {
                background-color: ${pwaConfig.background_color || '#ffffff'};
                color: ${pwaConfig.primary_color || '#000000'};
            }
            .checkout-button {
                background-color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            main a {
                color: ${pwaConfig.link_color || '#000000'} !important;
                text-decoration: ${pwaConfig.link_font_decoration || 'none'} !important;
            }
            main a:hover {
                color: ${pwaConfig.link_hover_color || '#000000'} !important;
                text-decoration: ${pwaConfig.link_font_hover_decoration || 'none'} !important;
            }

            .MuiAlert-standardWarning {
                background-color: ${pwaConfig.warning_msg_color || '#ffc107'} !important;
            }

            .MuiAlert-standardError {
                background-color: ${pwaConfig.error_color || '#f44336'} !important;
            }

            .MuiAlert-standardSuccess {
                background-color: ${pwaConfig.success_msg_color || '#4caf50'} !important;
            }

            // PAPER SECTION
            .MuiPaper-root {
                color: ${pwaConfig.font_color || '#000000'} !important;
            }

            // BUTTON SECTION
            .MuiButton-root {
                color: ${button_text_color} !important;
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .MuiButton-label {
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .MuiButtonBase-root.MuiButton-root.MuiButton-text {
                color: ${pwaConfig.primary_color || '#000000'} !important;
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .MuiButton-root:hover {
                background-color: ${pwaConfig.button_background_hover_color || '#FFFFFF'} !important;
            }
            .MuiButton-root.Mui-disabled {
                color: ${button_disabled_text_color} !important;
            }
            .MuiButton-root.Mui-disabled .MuiButton-label .MuiTypography-root {
                color: ${button_disabled_text_color} !important;
            }
            .MuiButton-textPrimary > span.MuiButton-label > span {
                color: ${pwaConfig.button_border_color || '#000000'} !important;
            }
            .MuiButton-textSecondary {
                color: ${button_text_color} !important;
            }
            .MuiButton-outlined {
                border: 1px solid ${pwaConfig.button_border_color || '#000000'} !important;
            }
            .MuiButton-outlined.Mui-disabled {
                border: 1px solid ${pwaConfig.button_disabled_background_color || '#DEDEDE'} !important;
            }
            .MuiButton-outlinedPrimary {
                border: 1px solid ${pwaConfig.button_border_color || '#000000'} !important;
            }
            .MuiButton-outlinedPrimary > span.MuiButton-label > p.MuiTypography-root {
                color: ${pwaConfig.button_border_color || '#000000'} !important;
            }
            .MuiButton-outlinedPrimary > span.MuiButton-label > span {
                color: ${pwaConfig.button_border_color || '#000000'} !important;
            }
            .MuiButton-outlinedPrimary:hover {
                border: 1px solid ${pwaConfig.button_border_hover_color || '#000000'} !important;
                background-color: ${pwaConfig.button_background_hover_color || '#FFFFFF'} !important;
            }
            .MuiButton-outlinedSecondary {
                color: ${pwaConfig.button_text_hover_color || '#000000'} !important;
                border: 1px solid ${pwaConfig.button_border_color || '#000000'} !important;
            }
            .MuiButton-outlinedSecondary:hover {
                border: 1px solid ${pwaConfig.button_border_hover_color || '#000000'} !important;
                background-color: ${pwaConfig.button_background_hover_color || '#FFFFFF'} !important;
            }
            .MuiButton-outlinedSecondary.Mui-disabled {
                border: 1px solid rgba(0, 0, 0, 0.26);
            }
            .MuiButton-contained {
                color: ${button_text_color} !important;
                background-color: ${button_background_color} !important;
            }
            .MuiButton-contained:hover {
                color: ${pwaConfig.button_text_hover_color || '#FFFFFF'} !important;
                background-color: ${pwaConfig.button_background_hover_color || '#DEDEDE'} !important;
            }
            .MuiButton-contained.Mui-disabled {
                color: ${button_disabled_text_color} !important;
                background-color: ${pwaConfig.button_disabled_background_color || '#DEDEDE'} !important;
            }
            .MuiButton-contained:hover.Mui-disabled {
                background-color: ${pwaConfig.button_disabled_background_color || '#DEDEDE'} !important;
            }
            .MuiButton-containedPrimary {
                color: ${button_text_color} !important;
                background-color: ${button_background_color} !important;
            }
            .MuiButton-containedPrimary:hover {
                background-color: ${pwaConfig.button_background_hover_color || '#DEDEDE'} !important;
                color: ${pwaConfig.button_text_hover_color || '#FFFFFF'} !important;
            }
            .MuiButton-containedSecondary {
                color: ${button_text_color} !important;
                background-color: ${button_background_color} !important;
            }
            .MuiButton-containedSecondary:hover {
                background-color: ${pwaConfig.button_background_hover_color || '#DEDEDE'} !important;
                color: ${pwaConfig.button_text_hover_color || '#FFFFFF'} !important;
            }
            .MuiButton-root .MuiButton-label > span {
                color: ${button_text_color} !important;
            }
            .MuiButton-root .MuiButton-label > p.MuiTypography-root {
                color: ${button_text_color} !important;
            }
            .MuiButton-root:hover .MuiButton-label > span {
                color: ${pwaConfig.button_text_hover_color || '#000000'} !important;
            }


            // BADGE SECTION
            .MuiBadge-colorPrimary {
                color: ${button_text_color} !important;
                background-color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiBadge-colorSecondary {
                color: ${button_text_color} !important;
                background-color: ${pwaConfig.primary_color || '#000000'} !important;
            }

            // SVG Section
            .MuiSvgIcon-colorPrimary {
                color: ${pwaConfig.primary_color || button_text_color || '#FFFFFF'} !important;
            }
            .MuiSvgIcon-colorSecondary {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiSvgIcon-colorDisabled {
                color: ${pwaConfig.button_disabled_background_color || '#DEDEDE'} !important;
            }

            // Icon Section
            .MuiIconButton-root {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiIconButton-root.Mui-disabled {
                color: ${pwaConfig.button_disabled_background_color || '#DEDEDE'} !important;
            }
            .MuiIconButton-colorPrimary {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiIconButton-colorSecondary {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }

            // TYPOGRAPHY SECTION
            .MuiTypography-root {
                color: ${pwaConfig.font_color || '#000000'};
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .MuiTypography-button {
                color: ${button_text_color};
            }
            .MuiTypography-h1 {
                font-family: ${pwaConfig.heading_font || 'Montserrat'} !important;
            }
            .MuiTypography-h2 {
                font-family: ${pwaConfig.heading_font || 'Montserrat'} !important;
            }
            .MuiTypography-h3 {
                font-family: ${pwaConfig.heading_font || 'Montserrat'} !important;
            }
            .MuiTypography-h4 {
                font-family: ${pwaConfig.heading_font || 'Montserrat'} !important;
            }
            .MuiTypography-h5 {
                font-family: ${pwaConfig.heading_font || 'Montserrat'} !important;
            }
            .MuiTypography-h6 {
                font-family: ${pwaConfig.heading_font || 'Montserrat'} !important;
            }
            .MuiTypography-colorPrimary {
                color: ${pwaConfig.font_color || '#000000'};
            }
            .MuiTypography-colorSecondary {
                color: ${pwaConfig.font_color || '#000000'};
            }
            .MuiTypography-colorTextPrimary {
                color: ${pwaConfig.font_color || '#000000'};
            }
            .MuiTypography-colorTextSecondary {
                color: ${pwaConfig.font_color || '#000000'};
            }
            .MuiTypography-colorError {
                color: ${pwaConfig.font_color || '#000000'};
            }
            .MuiListItem-root .MuiListItemText-root .MuiTypography-root {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }

            // Input Section
            .MuiInputBase-root {
                color: ${pwaConfig.primary_color || '#000000'} !important;
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .MuiInputBase-input {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiInputBase-input::-webkit-input-placeholder {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiInputBase-input::-moz-placeholder {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiInputBase-input:-ms-input-placeholder {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiInputBase-input::-ms-input-placeholder {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiFormLabel-root {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiInput-underline:hover:not(.Mui-disabled):before {
                border-bottom: 2px solid ${pwaConfig.font_color || '#000000'} !important;
            }
            @media (hover: none) {
                .MuiInput-underline:hover:not(.Mui-disabled):before {
                border-bottom: 1px solid ${pwaConfig.primary_color || '#000000'} !important;
                }
            }
            .MuiFormLabel-root {
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }
            .MuiFormControl-root {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }


            // TextField Section
            .MuiTextField-root {
                color: ${pwaConfig.primary_color || '#000000'} !important;
            }

            // Table Section
            .MuiTable-root {
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .MuiTable-root caption {
                color: ${pwaConfig.primary_color || '#000000'} !important;
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .MuiTableCell-root {
                font-family: ${pwaConfig.default_font || 'Montserrat'} !important;
            }
            .MuiTableCell-head {
                color: ${pwaConfig.font_color || '#000000'} !important;
            }
            .MuiTableCell-body {
                color: ${pwaConfig.font_color || '#000000'} !important;
            }
            .MuiTableCell-footer {
                color: ${pwaConfig.font_color || '#000000'} !important;
            } 
  
        `;
    }
    return `
        body {
            background-color: #FFFFFF !important;
            color: #000000 !important;
        }

        main {
            background-color: #FFFFFF !important;
        }
        .nav > li > a {
            background-color: #FFFFFF !important;
            color: #000000 !important;
        }
        a {
            color: #000000 !important;
        }
        a:hover {
            color: #000000 !important;
        }


        // BUTTON SECTION
        .MuiButton-root {
            color: #000000 !important;
        }
        .MuiButton-root:hover {
            background-color: #FFFFFF !important;
        }
        .MuiButton-root.Mui-disabled {
            color: #DEDEDE !important;
        }
        .MuiButton-textPrimary {
            color: #000000 !important;
        }
        .MuiButton-textSecondary {
            color: #000000 !important;
        }
        .MuiButton-outlined {
            border: #000000 !important;
        }
        .MuiButton-outlined.Mui-disabled {
            border: 1px solid #DEDEDE !important;
        }
        .MuiButton-outlinedPrimary {
            color: #000000 !important;
            border: 1px solid #000000 !important;
        }
        .MuiButton-outlinedPrimary:hover {
            border: 1px solid #000000 !important;
            background-color: rgba(22, 191, 9, 0.04);
        }
        .MuiButton-outlinedSecondary {
            color: #000000 !important;
            border: 1px solid #000000 !important;
        }
        .MuiButton-outlinedSecondary:hover {
            border: 1px solid #000000 !important;
            background-color: rgba(22, 191, 9, 0.04);
        }
        .MuiButton-outlinedSecondary.Mui-disabled {
            border: 1px solid rgba(0, 0, 0, 0.26);
        }
        .MuiButton-contained {
            color: #FFFFFF !important;
            background-color: #000000 !important;
        }
        .MuiButton-contained:hover {
            background-color: #DEDEDE !important;
        }
        .MuiButton-contained.Mui-disabled {
            color: #000000 !important;
            background-color: #DEDEDE !important;
        }
        .MuiButton-contained:hover.Mui-disabled {
            background-color: #DEDEDE !important;
        }
        .MuiButton-containedPrimary {
            color: #FFFFFF !important;
            background-color: #000000 !important;
        }
        .MuiButton-containedPrimary:hover {
            background-color: #DEDEDE !important;
            color: #FFFFFF !important;
        }
        .MuiButton-containedSecondary {
            color: #FFFFFF !important;
            background-color: #000000 !important;
        }
        .MuiButton-containedSecondary:hover {
            background-color: #DEDEDE !important;
            color: #FFFFFF !important;
        }


        // BADGE SECTION
        .MuiBadge-colorPrimary {
            color: #FFFFFF !important;
            background-color: #000000 !important;
        }
        .MuiBadge-colorSecondary {
            color: #FFFFFF !important;
            background-color: #000000 !important;
        }

        // SVG Section
        .MuiSvgIcon-colorPrimary {
            color: #FFFFFF !important;
        }
        .MuiSvgIcon-colorSecondary {
            color: #000000 !important;
        }
        .MuiSvgIcon-colorDisabled {
            color: #DEDEDE !important;
        }

        // Icon Section
        .MuiIconButton-root {
            color: #000000 !important;
            transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
        .MuiIconButton-root.Mui-disabled {
            color: #DEDEDE !important;
        }
        .MuiIconButton-colorPrimary {
            color: #000000 !important;
        }
        .MuiIconButton-colorSecondary {
            color: #000000 !important;
        }

        // TYPOGRAPHY SECTION
        .MuiTypography-root {
            color: #000000 !important;
            font-family: Montserrat !important;
        }
        .MuiTypography-button {
            color: #000000 !important;
        }
        .MuiTypography-h1 {
            font-family: Montserrat !important;
        }
        .MuiTypography-h2 {
            font-family: Montserrat important;
        }
        .MuiTypography-h3 {
            font-family: Montserrat !important;
        }
        .MuiTypography-h4 {
            font-family: Montserrat !important;
        }
        .MuiTypography-h5 {
            font-family: Montserrat !important;
        }
        .MuiTypography-h6 {
            font-family: Montserrat !important;
        }
        .MuiTypography-colorPrimary {
            color: #000000 !important;
        }
        .MuiTypography-colorSecondary {
            color: #000000 !important;
        }
        .MuiTypography-colorTextPrimary {
            color: #000000 !important;
        }
        .MuiTypography-colorTextSecondary {
            color: #000000 !important;
        }
        .MuiTypography-colorError {
            color: #000000 !important;
        }

        // Input Section
        .MuiInputBase-root {
            color: #000000 !important;
        }
        .MuiInputBase-input {
            color: #000000 !important;
        }
        .MuiInputBase-input::-webkit-input-placeholder {
            color: #000000 !important;
        }
        .MuiInputBase-input::-moz-placeholder {
            color: #000000 !important;
        }
        .MuiInputBase-input:-ms-input-placeholder {
            color: #000000 !important;
        }
        .MuiInputBase-input::-ms-input-placeholder {
            color: #000000 !important;
        }
        .MuiFormLabel-root {
            color: #000000 !important;
        }

        // TextField Section
        .MuiTextField-root {
            color: #000000 !important;
        }
    `;
};
