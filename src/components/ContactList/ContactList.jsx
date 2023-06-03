import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../../redux/contactSlice';
import s from './contactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.value);
  const contacts = useSelector(state => state.contacts.elements);

    const filteredItems = () => {
    const loweredFilter = filter.toLowerCase();
    return contacts.filter(elem => elem.name.toLowerCase().includes(loweredFilter));
  }

  const list = <ul className={s.list__block}>
  {filteredItems().map(elem => {
        return (
          <li key={elem.id} className={s.contacts__item}>
            {elem.name}: {elem.number}
            <button
              className={s.button}
              type="button"
              onClick={() => dispatch(removeContact(elem.id))}
            >
              Delete
            </button>
          </li>
        );
  })}
  </ul>;
  return list;
};
