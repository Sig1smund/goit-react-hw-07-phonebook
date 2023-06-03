import { useDispatch, useSelector } from 'react-redux';
import { input } from '../../redux/filterSlice';
import s from './filter.module.css';

export default function Filter() {
  const filter = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  const handleFilteredItems = e => {
    dispatch(input(e.currentTarget.value));
  };

  return (
    <label className={s.filter__label}>
      Find contacts by name
      <br />
      <input
        className={s.filter__form}
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilteredItems}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
    </label>
  );
};
