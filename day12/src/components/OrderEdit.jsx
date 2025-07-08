import { useState, useRef } from "react";

const OrderEdit = () => {
  const [input, setInput] = useState({
    menu : "", 
    address : "", 
    request : ""
  });

  const inputRef = useRef();

  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value,
    });
  }

  const onSubmit = () => {
    if(input.address === "")
    {
      inputRef.current.focus();
    }
    else
    {
      const message =`주문이 완료 되었습니다. 메뉴 : ${input.menu}, 주소 : ${input.address}, 요청사항 : ${input.request}`;
      alert(message);
    }
  }

    return (
      <div
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <h2>배달의민족 주문</h2>
        <div>
          <div style={{ marginBottom: 5, fontSize: 14 }}>
            메뉴 선택
          </div>
          <select 
            name="menu"
            style={{ width: 300, padding: 5 }}
            value = {input.menu}
            onChange={onChangeInput}
          >
            <option value={"족발"}>족발</option>
            <option value={"떡볶이"}>떡볶이</option>
            <option value={"아이스크림"}>아이스크림</option>
            <option value={"샐러드"}>샐러드</option>
          </select>
        </div>
        <div>
          <div style={{ marginBottom: 5, fontSize: 14 }}>
            배달 주소
          </div>
          <input
            ref={inputRef}
            name="address"
            style={{ width: 300, padding: 5 }}
            placeholder="주소) 서울특별시 xx동 .."
            value = {input.address}
            onChange = {onChangeInput}
          />
        </div>
        <div>
          <div style={{ marginBottom: 5, fontSize: 14 }}>
            배달 요청사항
          </div>
          <textarea
            name="request"
            style={{ width: 300, padding: 5 }}
            placeholder="배달 요청사항을 써 주세요..."
            value={input.request}
            onChange = {onChangeInput}
          />
        </div>
        <div>
          <button
            onClick={onSubmit}
            style={{ width: 300, padding: 5 }}
          >
            주문 완료
          </button>
        </div>
      </div>
    );
  };
  
  export default OrderEdit;