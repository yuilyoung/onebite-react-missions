import { useParams } from "react-router-dom";

const Diary = () => {
    const params = useParams();
  
    return <dive>{params.id}번 일기입니다.</dive>
}

export default Diary;