import "./ContactEditor.css"
import { useState, useRef, memo, useContext } from "react"
import { contactDispatchContext } from "../App"

const ContactEditor = () => {
    const {onCreate} = useContext(contactDispatchContext);

    const [contact, setContact] = useState({
        id : "",
        name : "",
        email : "",
    });

    const nameRef = useRef();
    const emailRef = useRef();

     const onChange = (e) => {
        setContact({
            ...contact,
            [e.target.name] : e.target.value,
        });
     }

    const onSubmit = () => {
        if(contact.name === "")
        {
            nameRef.current.focus();
            return;
        }

         if(contact.email === "")
         {
            emailRef.current.focus();
            return;
         }

        onCreate(contact);
    }

    return (
        <div className="ContactEditor">
            <div className="title">
            Add Contact
            </div>
            <div className="input_wrapper">
            <input 
            ref={nameRef}
            onChange={onChange}
            className="Inputname"
            name={"name"} 
            value={contact.name}
            placeholder="이름"
            />
            <input 
            ref={emailRef}
            onChange={onChange}
            className="InputContact"
            name={"email"}
            value={contact.email}
            placeholder="이메일"
            />
            </div>
            <button
            onClick={onSubmit} 
            name="Add"
            >Add</button>
        </div>
    )
}

export default memo(ContactEditor);