import { useAuth0 } from '@auth0/auth0-react';

export default function useUserID(){
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) return null;
    if (isAuthenticated) return user.sub
    return "anonymousUser";
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
