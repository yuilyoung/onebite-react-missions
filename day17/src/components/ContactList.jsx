import "./ContactList.css"
import ContactItem from "./ContactItem";
import { memo, useContext } from "react"
import { contactStateContext } from "../App";

const ContactList = () => {
    const contacts = useContext(contactStateContext);

    return (
        <div className="ContactList">
        <div className="title">Contact List</div>
        {contacts.map((contact) => {
            return <ContactItem 
            key={contact.id} 
            contact={contact}
            />;
        })}
        </div>
    )
}

export default memo(ContactList);