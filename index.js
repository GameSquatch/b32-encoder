const charTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function b32Encode(str) {
    let b32Str = '', byteOffset = 0;
    const numOf5CharBlocks = parseInt(str.length / 5);
    const charsRemaining = str.length - (numOf5CharBlocks * 5);

    for (let i = 0; i < numOf5CharBlocks; ++i) {
        const char = i * byteOffset;
        b32Str += encodeBlock1(str.charCodeAt(char));
        b32Str += encodeBlock2(str.charCodeAt(char), str.charCodeAt(char + 1));
        b32Str += encodeBlock3(str.charCodeAt(char + 1));
        b32Str += encodeBlock4(str.charCodeAt(char + 1), str.charCodeAt(char + 2));
        b32Str += encodeBlock5(str.charCodeAt(char + 2), str.charCodeAt(char + 3));
        b32Str += encodeBlock6(str.charCodeAt(char + 3));
        b32Str += encodeBlock7(str.charCodeAt(char + 3), str.charCodeAt(char + 4));
        b32Str += encodeBlock8(str.charCodeAt(char + 4));

        byteOffset += 5;
    }

    if (charsRemaining >= 1) {
        b32Str += encodeBlock1(str.charCodeAt(byteOffset));
    }
    if (charsRemaining >= 2) {
        b32Str += encodeBlock2(str.charCodeAt(byteOffset), str.charCodeAt(byteOffset + 1));
        b32Str += encodeBlock3(str.charCodeAt(byteOffset + 1));
    }
    if (charsRemaining >= 3) {
        b32Str += encodeBlock4(str.charCodeAt(byteOffset + 1), str.charCodeAt(byteOffset + 2));
    }
    if (charsRemaining === 4) {
        b32Str += encodeBlock5(str.charCodeAt(byteOffset + 2), str.charCodeAt(byteOffset + 3));
        b32Str += encodeBlock6(str.charCodeAt(byteOffset + 3));
        b32Str += encodePartialBlock7(str.charCodeAt(byteOffset + 3)) + '=';
    }

    if (charsRemaining === 1) {
        b32Str += encodePartialBlock2(str.charCodeAt(byteOffset)) + '======';
    } else if (charsRemaining === 2) {
        b32Str += encodePartialBlock4(str.charCodeAt(byteOffset + 1)) + '====';
    } else if (charsRemaining === 3) {
        b32Str += encodePartialBlock5(str.charCodeAt(byteOffset + 2)) + '===';
    }

    return b32Str;
};
    
function encodeBlock1(byte1CharCode) {
    return charTable[(byte1CharCode >>> 3)];
}
function encodeBlock2(byte1CharCode, byte2CharCode) {
    return charTable[((byte1CharCode << 2 | byte2CharCode >>> 6) & 31)];
}
function encodePartialBlock2(byte1CharCode) {
    return charTable[((byte1CharCode << 2) & 31)];
}
function encodeBlock3(byte2CharCode) {
    return charTable[(byte2CharCode >>> 1) & 31];
}
function encodeBlock4(byte2CharCode, byte3CharCode) {
    return charTable[(((byte2CharCode << 4) & 31) | (byte3CharCode >>> 4))];
}
function encodePartialBlock4(byte2CharCode) {
    return charTable[((byte2CharCode << 4) & 31)];
}
function encodeBlock5(byte3CharCode, byte4CharCode) {
    return charTable[(((byte3CharCode << 1) | (byte4CharCode >>> 7)) & 31)];
}
function encodePartialBlock5(byte3CharCode) {
    return charTable[((byte3CharCode << 1) & 31)];
}
function encodeBlock6(byte4CharCode) {
    return charTable[((byte4CharCode >>> 2) & 31)];
}
function encodeBlock7(byte4CharCode, byte5CharCode) {
    return charTable[(((byte4CharCode << 3) | (byte5CharCode >>> 5)) & 31)];
}
function encodePartialBlock7(byte4CharCode) {
    return charTable[((byte4CharCode << 3) & 31)];
}
function encodeBlock8(byte5CharCode) {
    return charTable[(byte5CharCode & 31)];
}

exports.b32Encode = b32Encode;
