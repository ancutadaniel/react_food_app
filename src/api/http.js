export const fetchMeals = async () => {
    try {
        const response = await fetch('http://localhost:3000/meals');
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        if (response.status === 404) {
            throw new Error('Could not find meals!');
        }

        return await response.json();

    } catch (error) {
        throw error;

    }
}