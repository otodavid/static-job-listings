class JobPosting {
    async getJobs() {
        const response = await fetch('./data.json');

        const responseData = await response.json();

        return responseData;
    } 
}