import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { filter } from '../../redux/filterSlice';
import { useFetchContactsQuery, useDeleteContactMutation } from '../../redux/contactApi';
import { ToastContainer, toast } from 'react-toastify';
import s from './contactList.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactList() {
  const { data } = useFetchContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const filtered = useSelector(filter)

  const getContacts = useMemo(
    () => () => {
      if (!data) {
        return;
      }

      const normalizedFilter = filtered.toLowerCase().trim();

      return data
        .filter(
          contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        )
    },
    [data, filtered]
  );

  return (<ul className={s.list__block}>
    {data && getContacts().map(elem => {
      return (

        <li key={elem.id} className={s.contacts__item}>
          {elem.name}: {elem.number}
          <button
            disabled={isDeleting}
            className={s.button}
            type="button"
            onClick={() => deleteContact(elem.id) && toast.success(`Contact ${elem.name} deleted`)}
          >
            Delete
          </button>
        </li>
      );
    })}
    {isDeleting && <ToastContainer
      position="top-center"
      autoClose={1500} />}
  </ul>);
};
