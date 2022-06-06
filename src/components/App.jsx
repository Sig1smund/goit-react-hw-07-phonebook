import ContactForm from "./contactForm";
import Filter from "./filter";
import ContactList from "./contactList";
// import ContactsItem from "./contactItem";
import s from './contactForm/contactForm.module.css'

export default function App() {

  return (
      <div className={s.container}>
        <h2>Phonebook</h2>
        <ContactForm/>
        <h2>Contacts</h2>
        <Filter/>
        <ContactList/>
      </div>
    )
}