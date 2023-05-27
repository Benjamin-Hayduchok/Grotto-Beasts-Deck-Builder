const util = {
    toStringInc(input) {
        var toStringCount = parseInt(input);
        toStringCount++;
        return toStringCount.toString();
    },
    toStringDec(input) {
        var toStringCount = parseInt(input);
        toStringCount--;
        console.log('toStringCount', toStringCount)
        return toStringCount.toString();
    }
}

export default util