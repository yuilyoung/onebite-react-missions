import { useSearchParams } from "react-router-dom";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button"
import DiaryList from "../components/DiaryList";

const getMonthlyData = (pivotDate, data)=>{
    const beginTime = new Date(
        pivotDate.getFullYear(), 
        pivotDate.getMonth(),
        1,
        0,
        0,
        0,).getTime();

     const EndTime = new Date(
        pivotDate.getFullYear(), 
        pivotDate.getMonth()+1,
        0,
        23,
        59,
        59,).getTime();
    
    return data.filter((item)=> beginTime <= item.createdDate && item.createdDate <= EndTime)
}

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());

    const monthlyDate = getMonthlyData(pivotDate, data);

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
        );
    };
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
        );
    };

    return (
    <div>
        <Header 
        title={`${pivotDate.getFullYear()}년 ${
            pivotDate.getMonth() + 1
        }월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
        />
        <DiaryList data={monthlyDate}/>
        
    </div>
    );
}

export default Home;