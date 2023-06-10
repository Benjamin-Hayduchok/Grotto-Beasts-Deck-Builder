const util = {
    toStringInc(input) {
        var toStringCount = parseInt(input);
        toStringCount++;
        return toStringCount.toString();
    },
    toStringDec(input) {
        if (input === "0") return "0";
        var toStringCount = parseInt(input);
        toStringCount--;
        return toStringCount.toString();
    }
}

export default util