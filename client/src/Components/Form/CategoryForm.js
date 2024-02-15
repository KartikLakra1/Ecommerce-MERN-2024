import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {

    return (
        <>
            <>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new category"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn">
                        Submit
                    </button>
                </form>
            </>

        </>
    )
};

export default CategoryForm;
