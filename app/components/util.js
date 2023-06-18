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
        return response.json();
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
        return response.json();
    },
    async addQuestionToAPI(id, question, username) {
        const response = await fetch("https://grotto-beasts-test.fly.dev/api/collections/securityQuestions/records", {   
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user: id, question: question, username: username})
        });
        return response;
    },
    async addAnswerToAPI(id, answer, username) {
        const response = await fetch("https://grotto-beasts-test.fly.dev/api/collections/securityAnswers/records", {   
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user: id, answer: answer, username: username})
        });
        return response;
    },
    async findUserByUsername(username) {
        const response = await fetch(`https://grotto-beasts-test.fly.dev/api/collections/users/records?filter=(username="${username}")`, {   
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.json();
    },
    async getUserQuestions(username) {
        const response = await fetch(`https://grotto-beasts-test.fly.dev/api/collections/securityQuestions/records?filter=(username="${username}")`, {   
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.json();
    },
    async submitUserAnswer(username, answer) {
        const response = await fetch(`https://grotto-beasts-test.fly.dev/api/collections/securityAnswers/records?filter=answer="${answer}"&&username="${username}"`, {   
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.json();
    },
    async updatePassword(username, password, passwordConfirm) {
        const response = await fetch("https://grotto-beasts-test.fly.dev/api/collections/users/records", {   
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, password: password, passwordConfirm: passwordConfirm})
        });
        return response.json();
    }
}

export default util