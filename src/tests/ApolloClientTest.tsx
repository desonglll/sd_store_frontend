import {ApolloClient, InMemoryCache, useQuery,} from '@apollo/client';
import {useEffect} from "react";
import httpLink from "../graphql/httplink/httplink.ts";
import {ToothType} from "../types/bucket.ts";
import {GetTeeth} from "../graphql/querys/GetTeeth.graphql"

const uri = httpLink("http://localhost:8000/graphql");

const client = new ApolloClient({
    link: uri,
    cache: new InMemoryCache(),
});

function ApolloClientTest() {
    const {data, loading, error} = useQuery(GetTeeth, {
        client,
        variables: {
            limit: 10,
            offset: 0,
        }
    });

    useEffect(() => {
        if (loading) console.log('Loading...');
        if (error) console.log('Error:', error);
        if (data) console.log('Data:', data);
    }, [loading, error, data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>{
            data.allTeeth.map((item: ToothType) => {
                return (<div key={item.id}>{item.name}</div>)
            })
        }</>
    );
}

export default ApolloClientTest;