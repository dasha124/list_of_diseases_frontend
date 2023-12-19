import {useState} from "react";
//import "./SearchBar.css"

const SearchBar = ({ fetchData }: { fetchData: (query: string) => void}) => {
    const [input, setInput] = useState<string>("")

    const handleChange = (value: string) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <form className="search-bar" action="/diseases/search" method="GET" onSubmit={(e) => e.preventDefault()} >

            <input
                type="text"
                placeholder="Поиск..."
                name="query"
                autoComplete="off"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </form>
    );
}

export default SearchBar;