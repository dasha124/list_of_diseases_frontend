import Cookies from "universal-cookie";

export function useSession() {
    const cookies = new Cookies()

    const access_token = cookies.get("access_token");
    const refresh_token = cookies.get("refresh_token");


    const setSession = (value: any) => {
        cookies.set("access_token", value, {path: "/diseases", expires: new Date(Date.now()+25920000)})
    }

    const setRefreshSession = (value: any) => {
        cookies.set("refresh_token", value, {path: "/diseases", expires: new Date(Date.now()+25920000)})
    }

    const resetSession = () => {
        cookies.set("access_token", undefined, {path: "/diseases", expires: new Date(Date.now()+25920000)})
    }

    return {
        access_token,
        refresh_token,
        setSession,
        setRefreshSession,
        resetSession,
    };
}
