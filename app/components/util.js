const util = {
    toStringInc(input) {
        var toStringCount = parseInt(input);
        toStringCount++;
        return toStringCount.toString();
    }
}

export default util