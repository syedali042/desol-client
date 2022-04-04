const theme = {
    colors: {
        primary: "#1890ff",
        background: "#ffffff",
        border: "#f0f0f0",
        gray7: "#bfbfbf",
        gray8: "#8c8c8c",
        white: "#fff",
        black: "#000000d9",
    },
    font: {
        family: "Poppins, sans-serif",
        weight: {
            thin: 100,
            extraLight: 200,
            light: 300,
            regular: 400,
            medium: 500,
            semiBold: 600,
            bold: 700,
            extraBold: 800,
        },
    },
    media: {
        md: 768,
        sm: 500,
        lg: 968,
        xl: 1368,
    },

    utils: {
        toRgba: (hex, opacity = 1) => {
            hex = hex.slice(1, hex.length)

            if (hex.length !== 6) {
                throw new Error("Only six-digit hex colors are allowed.")
            }

            var aRgbHex = hex.match(/.{1,2}/g)
            var aRgb = [
                parseInt(aRgbHex[0], 16),
                parseInt(aRgbHex[1], 16),
                parseInt(aRgbHex[2], 16),
            ]
            return `rgba(${[...aRgb, opacity].join(",")})`
        },
    },
}

export default theme
