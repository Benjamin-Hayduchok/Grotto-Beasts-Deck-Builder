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
    },
    async loginToAPI(username, password) {
        const response = await fetch("https://grotto-beasts-test.fly.dev/api/collections/users/auth-with-password", {   
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({identity: username, password: password})
        });
        console.log('response', response)
        return response;
    },
    async registerToAPI(username, password, passwordConfirm) {
          const response = await fetch("https://grotto-beasts-test.fly.dev/api/collections/users/records", {   
              method: "POST",
              cache: "no-cache",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({username: username, password: password, passwordConfirm: passwordConfirm})
          });
        return response;
    }
}

export default util