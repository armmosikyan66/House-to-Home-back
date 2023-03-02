function generateUniqueNumber(min, max) {
    const uniqueNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return uniqueNum;
}

export default generateUniqueNumber;