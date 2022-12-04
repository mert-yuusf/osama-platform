import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import {
    getAllWorks,
    getOneWork,
    createWork,
    removeWork,
    updateWork,
    cancelEditing
} from "../../features/workSlice";


function Works() {
    const { user, isLoading } = useSelector((store) => store.user);
    const { works, selectedWork } = useSelector((store) => store.work);
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        title: "",
        company: "",
        from: "",
        to: "",
        current: false,
        description: "",
        user: user._id,
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleRemove = async (work) => {
        await dispatch(removeWork(work?._id));
        await dispatch(getAllWorks())
    }

    const handleEdit = async (work) => {
        await dispatch(getOneWork(work?._id));
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (selectedWork) {
            console.log("updating");
            await dispatch(updateWork({ workId: selectedWork._id, work: values }));
        } else {
            console.log("creating");
            await dispatch(createWork(values));
        }
        await dispatch(getAllWorks())
    }


    useEffect(() => {
        if (selectedWork) {
            setValues({
                title: selectedWork.title,
                description: selectedWork.description,
                company: selectedWork.company,
                from: selectedWork.from,
                to: selectedWork.to,
                user: user._id,
            })
        } else {
            setValues({
                title: "",
                company: "",
                from: "",
                to: "",
                current: false,
                description: "",
                user: user._id,
            })
        }

    }, [selectedWork, user._id,])


    useEffect(() => {
        dispatch(getAllWorks())
    }, [dispatch])


    if (isLoading) {
        return <>
            Loading...
        </>
    }

    return (<>
        <div className="container page-section">
            <div className="row">
                <div className="col-12 col-md-11 col-lg-11 mx-auto  p-4">
                    <div className="section-header">
                        <h3>Works</h3>
                    </div>
                    <p className="fw-bold my-auto text-center section-label">Personal works</p>

                    <div className="section-content mt-3">
                        <div className="row">
                            <div className="col-12 col-md-8 col-lg-8 mx-auto">
                                <form onSubmit={onFormSubmit}>

                                    <div className="form-group mb-3">
                                        <label htmlFor="titleField" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="titleField"
                                            className="form-control rounded-0"
                                            value={values.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="companyField" className="form-label">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            id="companyField"
                                            className="form-control rounded-0"
                                            value={values.company}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="row row-cols-md-2 mb-3">
                                        <div className="col-12 col-md-6 px-2">
                                            <div className="form-group">
                                                <label htmlFor="fromField" className="form-label">From</label>
                                                <input
                                                    type="date"
                                                    name="from"
                                                    id="fromField"
                                                    className="form-control rounded-0"
                                                    value={values.from}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 px-2">
                                            <div className="form-group">
                                                <label htmlFor="toField" className="form-label">To</label>
                                                <input
                                                    type="date"
                                                    name="to"
                                                    id="toField"
                                                    className="form-control rounded-0"
                                                    value={values.to}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="descriptionField" className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            id="descriptionField"
                                            cols="30"
                                            rows="5"
                                            className="form-control rounded-0"
                                            value={values.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <input
                                        type="submit"
                                        value={selectedWork ? "Update" : "Save"}
                                        className="btn btn-dark rounded-0"
                                    />


                                    {
                                        selectedWork &&
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark rounded-0 ms-3"
                                            onClick={() => { dispatch(cancelEditing()) }}
                                        >Cancel</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row mt-4">
                <div className="col-12 col-md-10 mx-auto">
                    {
                        !isLoading &&

                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Company</th>
                                        <th scope="col">From</th>
                                        <th scope="col">To</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        works.map((work, index) => {
                                            return <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{work.title}</td>
                                                <td>{work.company}</td>
                                                <td>{moment(work.from).format("MMMM Do YYYY")}</td>
                                                <td>{moment(work.to).format("MMMM Do YYYY")}</td>
                                                <td>{work.description}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-dark border-4 btn-sm border-dark rounded-0 me-2"
                                                        onClick={() => { handleEdit(work) }}
                                                    >
                                                        edit
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-dark border-4 btn-sm border-dark rounded-0"
                                                        onClick={() => { handleRemove(work) }}
                                                    >
                                                        delete
                                                    </button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    }
                </div>
            </div>
        </div>
    </>);
}

export default Works;