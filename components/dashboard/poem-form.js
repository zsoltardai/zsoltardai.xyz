import React, {useRef} from 'react';
import {Input, Button} from '../ui';
import styles from './poem-form.module.css';
import {useNotification} from "../../hooks";

const PoemForm = ({onPublishPoem}) => {
  const {set} = useNotification();
    const titleRef = useRef();
    const contentRef = useRef();
    const submitHandler = async (event) => {
        event.preventDefault();

        const title = titleRef.current.value;
        const content = contentRef.current.value;

        if (!title || title.trim() === '') {
            set({
                status: 'error',
                title: 'Error',
                message: 'The provided title was invalid!'
            });
            return;
        }

        if (!content || content.trim() === '') {
            set({
                status: 'error',
                title: 'Error',
                message: 'The provided content was invalid!'
            });
            return;
        }

        const result = await onPublishPoem(title, content, new Date().toISOString());

        if (result) {
            titleRef.current.value = '';
            contentRef.current.value = '';
        }
    }
    return (
      <form className={styles.form} onSubmit={submitHandler}>
          <h1>Publish a poem</h1>
          <label htmlFor="title">
            Title
          </label>
          <Input
            placeholder="e.g. Vak ábránd"
            ref={titleRef}
            type="text"
            id="title"
          />
          <label htmlFor="content">
            Content
          </label>
          <Input
              placeholder="Here goes the body of your poem..."
              ref={contentRef}
              id="content"
              type="text"
              textarea
          />
          <Button
            title="Publish"
            width="100%"
          />
      </form>
    );
}

export default PoemForm;
