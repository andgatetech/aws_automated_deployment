import {useState, useEffect} from 'react';

const userAsyncRequest = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/v1/users`);
                const json = await response.json();
                setData(json, setLoading(false));
            } catch (err) {
                console.warn("Something went wrong fetching the API...", err);
                setLoading(false);
            }
        }
        
        fetchData();
       
    }, []);

    return [data, loading]
}

export default userAsyncRequest;