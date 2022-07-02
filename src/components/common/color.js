const color = (dark = false) => {
    const whiteColor = [
        "#FCE4EC",
        "#FCE4EC",
        "#EDE7F6",
        "#E8EAF6",
        "#E3F2FD",
        "#E1F5FE",
        "#E0F7FA",
        "#E0F2F1",
        "#E8F5E9",
    ];
    const darkColor = [
        "#FF8A80",
        "#880E4F",
        "#4A148C",
        "#4A148C",
        "#1A237E",
        "#0D47A1",
        "#1565C0",
        "#0277BD",
        "#00695C",
        "#2E7D32",
    ];

    const whiteLength = whiteColor.length;
    const darkLength = darkColor.length;

    return dark
        ? darkColor[Math.floor(Math.random() * darkLength)]
        : whiteColor[Math.floor(Math.random() * whiteLength)];
};

export default color;
