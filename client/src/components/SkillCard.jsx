import { getAllSkills, getOneSkill, removeSkill } from "../features/skillSlice";
import { useDispatch } from "react-redux";


function SkillCard({ skill }) {

    const dispatch = useDispatch();

    const handleRemove = async (e) => {
        await dispatch(removeSkill(skill?._id));
        await dispatch(getAllSkills())
    }

    const handleEdit = async (e) => {
        await dispatch(getOneSkill(skill?._id));
    }


    return (<>
        <div className="skill-card rounded-0 card">
            <div className="card-header d-flex align-items-center justify-content-between">
                <p className="fw-bold my-auto">
                    {skill?.title}
                </p>
                <p className="text-dark my-auto">
                    {
                        skill?.level
                    }
                </p>
            </div>
            <div className="card-body">
                <p className="lead">
                    {
                        skill?.description
                    }
                </p>
            </div>
            <div className="card-footer">
                <button
                    className="btn btn-indigo border-4 btn-sm border-dark rounded-0 me-2"
                    onClick={handleEdit}
                >
                    edit
                </button>

                <button
                    className="btn btn-danger border-4 btn-sm border-dark rounded-0"
                    onClick={handleRemove}
                >
                    delete
                </button>
            </div>
        </div>
    </>);
}

export default SkillCard;