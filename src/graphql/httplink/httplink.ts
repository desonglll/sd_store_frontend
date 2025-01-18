import {createHttpLink} from "@apollo/client";
import Cookies from "js-cookie";

const httpLink = (uri: string = "http://localhost:8000/graphql") => createHttpLink({
    uri: uri,
    credentials: 'include',
    headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || "",
    }
});
export default httpLink;