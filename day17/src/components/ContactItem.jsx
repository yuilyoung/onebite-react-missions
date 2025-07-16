import "./ContactItem.css"
import { memo, useContext } from "react"
import { contactDispatchContext } from "../App"

const ContactItem = ({contact}) => {
    const {onDelete} = useContext(contactDispatchContext);

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

export default memo(ContactItem);