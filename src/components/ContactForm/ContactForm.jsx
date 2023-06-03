import { useReducer } from 'react';
import { isEqual } from 'lodash';
import {
  useAddContactMutation,
  useFetchContactsQuery,
} from '../../redux/contactSlice';
import { nanoid } from '@reduxjs/toolkit';
import s from './contactForm.module.css';

const initialState = {
  name: '',
  number: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'name': {
      return {
        ...state,
        name: action.payload,
      };
    }
    case 'number': {
      return {
        ...state,
        number: action.payload,
      };
    }
    case 'reset': {
      return initialState;
    }
    default:
      return state;
  }
};

export default function ContactForm() {
  const [state, dispatchAction] = useReducer(reducer, initialState);
  // const dispatch = useDispatch()
  // const contacts = useSelector(state => state.contacts.elements);
  const [addContact] = useAddContactMutation();
  const { data } = useFetchContactsQuery();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    dispatchAction({
      type: name,
      payload: value,
    });
  };

  const preventDublicate = (number) => {
    const result = data.find(user => {
      if (user.number === number) {
        return user
      }
      return false
    });
    return result.name;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = { id: nanoid(), name: state.name, number: state.number };

    const test = data.some(user => isEqual(newContact.number, user.number));
    !test
      ? addContact(newContact)
      : alert
        (`Number ${newContact.number} is already been used in "${preventDublicate(newContact.number)}"!`);
    dispatchAction({ type: 'reset' });
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.contacts__label}>
        Name
        <br />
        <input
          className={s.input}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          // pattern="[A-Za-zА-Яа-яЁё-]+"
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
          name="number"
          value={state.number}
          onChange={handleChange}
          // pattern="[0-9+-]+"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <button type="submit" className={s.button}>Add contact</button>
    </form>
  );
};
