import Cookies from "universal-cookie";

export function useSession() {
    const cookies = new Cookies()

    const session_id = cookies.get("session_id");

    const setSession = (value: any) => {
        cookies.set("session_id", value,)
    }

    const resetSession = () => {
        cookies.set("session_id", undefined)
    }

    return {
        session_id,
        setSession,
        resetSession,
    };
}