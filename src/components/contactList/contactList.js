import { useSelector } from 'react-redux';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsSlice';
// import { removeContact } from 'redux/contactsSlice';
import s from './contactList.module.css';

export default function ContactList() {
  const { data } = useFetchContactsQuery();
  const [deleteContacts] = useDeleteContactMutation();

  // const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.value);
  // const contacts = useSelector(state => state.contacts.elements);

  const getFilteredItems = () => {
    const loweredFilter = filter.toLowerCase();
    const filtered = data.filter(elem =>
      elem.name.toLowerCase().includes(loweredFilter)
    );
    return filtered;
  };

  const visibleItems = data ? getFilteredItems(data) : null;

  return (
    <ul className={s.list__block}>
      {data &&
        visibleItems.map(elem => {
          return (
            <li key={elem.id} className={s.contacts__item}>
              {elem.name}: {elem.phone}
              <button type="button" onClick={() => deleteContacts(elem.id)}>
                Delete
              </button>
            </li>
          );
        })}
    </ul>
  );
}
