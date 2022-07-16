function colorGeneration(dark = false) {
    const whiteColor = ["#FFCDD2", "#E1BEE7"];
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
}

export default colorGeneration;
