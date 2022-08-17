import { useEffect, useRef, useState } from 'react';
import Button from '../ui/button';
import styles from './poem-form.module.css';

export default function PoemForm({ notificationContext, onPublishPoem }) {
    const date = new Date();
    const [day, setDay] = useState(date.getDate());
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [yearSelection, setYearSelection] = useState([]);
    const [daySelection, setDaySelection] = useState([]);
    const monthLengths = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
    useEffect(() => {
        setYearSelection((function ()
        {
            let result = [];
            for (let i = date.getFullYear(); i > 2000; i--)
            { result.push(i); }
            return result;
        })());
        setDaySelection((function () {
            let result = [];
            for (let i = 1; i <= monthLengths[month]; i++)
            { result.push(i); }
            return result;
        })());
    }, [year, day, month]);
    const titleRef = useRef();
    const contentRef = useRef();
    const authorRef = useRef();
    const submitHandler = async (event) => {
        event.preventDefault();

        const title = titleRef.current.value;

        const content = contentRef.current.value;

        const author = authorRef.current.value;

        const _date = `${year}-${month.length === 1 ? '0' + month : month}-${day.length === 1 ? '0' + day : day}`;


        if (!title || title.trim() === '') {
            notificationContext.showNotification({
                status: 'error',
                title: 'Error',
                message: 'The provided title was invalid!'
            });
            return;
        }

        if (!content || content.trim() === '') {
            notificationContext.showNotification({
                status: 'error',
                title: 'Error',
                message: 'The provided content was invalid!'
            });
            return;
        }

        if (!author || author.trim() === '') {
            notificationContext.showNotification({
                status: 'error',
                title: 'Error',
                message: 'The provided author was invalid!'
            });
            return;
        }

        if (!_date || _date.trim() === '') {
            notificationContext.showNotification({
                status: 'error',
                title: 'Error',
                message: 'The provided date was invalid!'
            });
            return;
        }

        const result = await onPublishPoem(title, content, author, _date);

        if (result) {
            titleRef.current.value = '';
            contentRef.current.value = '';
            authorRef.current.value = '';
            setYear(date.getFullYear());
            setMonth(date.getMonth() + 1);
            setDay(date.getDate());
        }
    }
    return (
      <form className={styles.form} onSubmit={submitHandler}>
          <h1>Publish a poem</h1>
          <div className={styles.control}>
              <label htmlFor='title'>Title</label>
              <input id='title' type='text' ref={titleRef}
                     placeholder='Title of the poem' />
          </div>
          <div className={styles.control}>
              <label htmlFor='content'>Content</label>
              <textarea id='content' ref={contentRef}
                        placeholder='Body of the poem'>
              </textarea>
          </div>
          <div className={styles.control}>
              <label htmlFor='author'>Author</label>
              <input id='author' type='text' ref={authorRef}
                     placeholder='Author of the poem' />
          </div>
          <div className={styles.group}>
              <div className={styles.control}>
                  <label htmlFor='year'>Year</label>
                  <select id='year' value={year} onChange={(e) => setYear(e.target.value)}>
                      {yearSelection.map(year => {
                         return <option key={year} value={year}>{year}</option>;
                      })}
                  </select>
              </div>
              <div className={styles.control}>
                  <label htmlFor='month'>Month</label>
                  <select id='month' value={month} onChange={(e) => setMonth(e.target.value)}>
                      <option value={1}>January</option>
                      <option value={2}>February</option>
                      <option value={3}>March</option>
                      <option value={4}>April</option>
                      <option value={5}>May</option>
                      <option value={6}>June</option>
                      <option value={7}>July</option>
                      <option value={8}>August</option>
                      <option value={9}>September</option>
                      <option value={10}>October</option>
                      <option value={11}>November</option>
                      <option value={12}>December</option>
                  </select>
              </div>
              <div className={styles.control}>
                  <label htmlFor='day'>Day</label>
                  <select id='day' value={day} onChange={(e) => setDay(e.target.value)}>
                      {daySelection.map(day => {
                          return <option key={day} value={day}>{day}</option>;
                      })}
                  </select>
              </div>
          </div>
          <div className={styles.control}>
              <Button>Publish</Button>
          </div>
      </form>
    );
}
