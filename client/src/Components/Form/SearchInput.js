import React from "react";
import { useSearch } from "../../Context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
    const navigate = useNavigate();
    const [values, setValues] = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data });
            navigate("/search")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center justify-center">
                <input type="search" className="p-1 text-black" placeholder="search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button type="submit" className="text-1xl font-semibold  
                bg-black p-1">
                    <IoMdSearch size={20} />

                </button>
            </form>
        </div>
    )
};

export default SearchInput;
