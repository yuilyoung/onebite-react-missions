import "./ContactList.css"
import ContactItem from "./ContactItem";

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

export default ContactList;