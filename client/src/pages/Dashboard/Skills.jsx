import React from 'react';

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllSkills, createSkill, updateSkill, cancelEditing } from "../../features/skillSlice";
import SkillCard from "../../components/SkillCard";
const skillsLevels = { beginner: "beginner", intermediate: "intermediate", expert: "expert" }


function Skills() {
    const { user, isLoading } = useSelector((store) => store.user);
    const { skills, selectedSkill } = useSelector((store) => store.skill);
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        title: "",
        description: "",
        level: "beginner",
        user: user._id,
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (selectedSkill) {
            console.log("updating");
            await dispatch(updateSkill({ skillId: selectedSkill._id, skill: values }));
        } else {
            console.log("creating");
            await dispatch(createSkill(values));
        }
        await dispatch(getAllSkills());
    }


    useEffect(() => {
        if (selectedSkill) {
            setValues({
                title: selectedSkill.title,
                level: selectedSkill.level,
                description: selectedSkill.description,
                user: user._id,
            })
        } else {
            setValues({
                title: "",
                description: "",
                level: "beginner",
                user: user._id,
            })
        }
        return async () => {
            await dispatch(getAllSkills());
        }
    }, [isLoading, selectedSkill, dispatch, user._id])

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
                        <h3>Skills</h3>
                    </div>
                    <p className="fw-bold my-auto text-center section-label">Personal Skills</p>

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
                                        <label htmlFor="levelField" className="form-label">How much do you know in this skill as Percent?</label>
                                        <div className="form-group mb-3">
                                            <select
                                                name="level"
                                                id="levelField"
                                                className="form-select rounded-0"
                                                onChange={handleChange}
                                                value={values.level}
                                            >
                                                {
                                                    Object.entries(skillsLevels).map((item, index) => {
                                                        const [key, value] = item;
                                                        return <option key={index} value={key}>{value}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>


                                    <div className="form-group mb-3">
                                        <label htmlFor="descriptionField" className="form-label">Describe your knowledge</label>
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
                                        value={selectedSkill ? "Update" : "Save"}
                                        className="btn btn-dark rounded-0"
                                    />


                                    {
                                        selectedSkill &&
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


            <div className="row row-cols-md-3 row-cols-lg-3  mt-4">
                {
                    !isLoading &&
                    skills?.map((skill, index) => {
                        return <div key={index} className="col-12 col-md-4 col-lg-4 p-3 skill-card-container">
                            <SkillCard skill={skill} ></SkillCard>
                        </div>
                    })
                }
            </div>
        </div>
    </>);
}

export default Skills;