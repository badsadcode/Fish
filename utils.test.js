const test = require('node:test');
const assert = require('node:assert');
const { jitterColor, rgbStr, rgbaStr } = require('./utils.js');

test('jitterColor - basic functionality', (t) => {
    const originalRgb = [100, 150, 200];
    const amount = 15;
    const jittered = jitterColor(originalRgb, amount);

    assert.strictEqual(jittered.length, 3);
    jittered.forEach((c, i) => {
        assert(c >= originalRgb[i] - amount, `Value ${c} too small for original ${originalRgb[i]}`);
        assert(c <= originalRgb[i] + amount, `Value ${c} too large for original ${originalRgb[i]}`);
    });
});

test('jitterColor - clamping to [0, 255]', (t) => {
    const amount = 50;

    // Test clamping to 0
    const originalMathRandom = Math.random;
    Math.random = () => 0;
    const jitteredMin = jitterColor([10, 10, 10], amount);
    assert.deepStrictEqual(jitteredMin, [0, 0, 0]);

    // Test clamping to 255
    Math.random = () => 1;
    const jitteredMax = jitterColor([240, 240, 240], amount);
    assert.deepStrictEqual(jitteredMax, [255, 255, 255]);

    // Restore Math.random
    Math.random = originalMathRandom;
});

test('jitterColor - default amount', (t) => {
    const originalRgb = [100, 100, 100];
    const jittered = jitterColor(originalRgb); // amount=15
    jittered.forEach((c, i) => {
        assert(c >= 100 - 15);
        assert(c <= 100 + 15);
    });
});

test('rgbStr - formats correctly', (t) => {
    assert.strictEqual(rgbStr([255, 0, 128]), 'rgb(255, 0, 128)');
});

test('rgbaStr - formats correctly', (t) => {
    assert.strictEqual(rgbaStr([255, 0, 128], 0.5), 'rgba(255, 0, 128, 0.5)');
});
