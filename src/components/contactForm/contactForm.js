import { useState } from 'react';
// import { isEqual } from 'lodash';
import {
  useAddContactMutation,
  useFetchContactsQuery,
} from '../../redux/contactsSlice';
// import { useDispatch, useSelector } from 'react-redux';
import s from './contactForm.module.css';
// import { addContact } from 'redux/contactsSlice';
import { nanoid } from '@reduxjs/toolkit';

function ContactForm() {
  const [addContact] = useAddContactMutation();
  const { data } = useFetchContactsQuery();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // const contacts = useSelector(state => state.contacts.elements);

  // const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = { id: nanoid(), name: name, phone: phone };
    console.log(data);

    const test = data.some(user => newContact.phone === user.phone);
    !test
      ? addContact(newContact)
      : alert(`Number ${newContact.phone} is already been used in contacts!`);

    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={s.contacts__label}>
        Name
        <br />
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <br />
      <label className={s.contacts__label}>
        Number
        <br />
        <input
          className={s.input}
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <button type="submit">Add contact</button>
    </form>
  );
}

// class ContactForm extends Component {
//   state = { name: '', number: '' };

//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { name, number } = this.state;
//     const newObject = { name: name, number: number };
//     this.props.data(newObject);

//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label className={s.contacts__label}>
//           Name
//           <br />
//           <input
//             className={s.input}
//             type="text"
//             name="name"
//             value={this.state.name}
//             onChange={this.handleChange}
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>
//         <br />
//         <label className={s.contacts__label}>
//           Number
//           <br />
//           <input
//             className={s.input}
//             type="tel"
//             name="number"
//             value={this.state.number}
//             onChange={this.handleChange}
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">Add contact</button>
//       </form>
//     );
//   }
// }

export default ContactForm;
