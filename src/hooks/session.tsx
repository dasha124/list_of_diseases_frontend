import Cookies from "universal-cookie";

export function SsId() {
    const cookies = new Cookies()

    const session_id = cookies.get("session_id");

    const setSsId = (value: any) => {
        cookies.set("session_id", value,)
    }

    const resetSsId = () => {
        cookies.set("session_id", undefined)
    }

    return {
        session_id,
        setSsId,
        resetSsId,
    };
}