import "./ContactList.css"
import ContactItem from "./ContactItem";
import { memo } from "react"

const ContactList = ({contacts, onDelete}) => {
    return (
        <div className="ContactList">
        <div className="title">Contact List</div>
        {contacts.map((contact) => {
            return <ContactItem 
            key={contact.id} 
            contact={contact}
            onDelete={onDelete}/>;
        })}
        </div>
    )
}

export default memo(ContactList);