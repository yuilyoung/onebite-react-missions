import "./ContactItem.css"

const ContactItem = ({contact, onDelete}) => {
    const onDeleteButtion = () => {
        onDelete(contact.id);
    }

    return (
        <div className="ContactItem">
            <div className="name">{contact.name}</div>
            <div className="email">{contact.email}</div>
            <button 
            onClick={onDeleteButtion}
            name="remove"
            >🗑️ Remove</button>
        </div>
    )
}

export default ContactItem;