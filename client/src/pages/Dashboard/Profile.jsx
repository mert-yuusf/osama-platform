import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile, updateValues } from "../../features/userSlice";
import { useRef } from 'react';

const genderOptions = { male: "Male", female: "Female" }

function Profile() {
    const { user } = useSelector((store) => store.user);
    const [photo, setPhoto] = useState({ preview: user.avatar, data: null });
    const dispatch = useDispatch();

    const inputField = useRef(null);

    const openFileDialog = (e) => {
        inputField.current.click();
    }

    const onPhotoUpload = async (e) => {
        const photoObj = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setPhoto(photoObj)
        console.log(photoObj.data);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData(this);
        dispatch(updateProfile(user))
    }


    return (<>
        <div className="container page-section">
            <div className="row">
                <div className="col-12 col-md-11 col-lg-11 mx-auto  p-4">
                    <div className="section-header">
                        <h3>My Profile</h3>
                    </div>
                    <p className="fw-bold my-auto text-center section-label">Personal Data</p>

                    <div className="section-content mt-3">
                        <form onSubmit={onFormSubmit}>
                            <div className="row row-cols-md-2 row-cols-lg-2">
                                <div className="col-12 col-md-8 py-3 mx-auto">
                                    <div className="d-flex mb-3">
                                        <img src={photo.preview} alt="profile" className="img-fluid img-field-preview" />

                                        <input
                                            type="file"
                                            name="photo"
                                            id="photoField"
                                            onChange={onPhotoUpload}
                                            ref={inputField}
                                            hidden
                                        />
                                        <p className='btn btn-primary my-auto'
                                            onClick={openFileDialog}>Upload</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            className="form-control rounded-0"
                                            value={user.fullName}
                                            onChange={(e) => {
                                                dispatch(updateValues({ name: e.target.name, value: e.target.value }))
                                            }}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="fullName" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control rounded-0"
                                            value={user.email}
                                            onChange={(e) => {
                                                dispatch(updateValues({ name: e.target.name, value: e.target.value }))
                                            }}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="fullName" className="form-label">Position</label>
                                        <input
                                            type="text"
                                            name="position"
                                            id="positionField"
                                            className="form-control rounded-0"
                                            value={user.position}
                                            onChange={(e) => {
                                                dispatch(updateValues({ name: e.target.name, value: e.target.value }))
                                            }}
                                        />
                                    </div>

                                    {
                                        user.role !== "company" ?
                                            <div className="form-group mb-3">
                                                <label htmlFor="fullName" className="form-label">Gender</label>
                                                <select
                                                    name="gender"
                                                    id="genderField"
                                                    className="form-select rounded-0"
                                                    onChange={(e) => {
                                                        dispatch(updateValues({ name: e.target.name, value: e.target.value }))
                                                    }}
                                                    value={user.gender}
                                                >
                                                    <option value="*" defaultValue="Gender">Gender</option>
                                                    {
                                                        Object.entries(genderOptions).map((item, index) => {
                                                            const [key, value] = item;
                                                            return <option key={index} value={key}>{value}</option>
                                                        })
                                                    }
                                                </select>
                                            </div> :
                                            ""
                                    }



                                    <input type="submit" value="Save changes" className="btn btn-dark rounded-0" />
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Profile;