import { useParams } from "react-router-dom";

const Edit = () => {
    const params = useParams();

    return <div>Edit 페이지는 {params.id}번 일기입니다.</div>
}

export default Edit;