import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export default function useUserID(){
    //generate guid for not authenticated user
    const [anonymousUserID,] = useState(getAnonymousUserID())
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) return null;
    if (isAuthenticated) return user.sub
    return anonymousUserID;
}

function getAnonymousUserID(){
    let id = localStorage.getItem('anonymousUserID');
    if (!id){
        id = uuidv4()
        localStorage.setItem('anonymousUserID', id);
    }
    return id;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
    });
}

/*
function useMetadata(){
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-934u86xf.eu.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [isAuthenticated, isLoading, user]);

    return userMetadata
}
*/
