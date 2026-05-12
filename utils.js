function jitterColor(rgb, amount=15) {
    return rgb.map(c => Math.max(0, Math.min(255, c + (Math.random() * amount * 2 - amount))));
}
function rgbStr(rgb) { return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`; }
function rgbaStr(rgb, a) { return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`; }

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { jitterColor, rgbStr, rgbaStr };
}
