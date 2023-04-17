class HTTP {
    async get(URL) {
        const response = await fetch(URL);
        return await response.json();
      }
    async post(URL, body) {
        const response = await fetch(URL, {
            body:JSON.stringify(body), 
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await response.json();
    }
}

export default new HTTP()