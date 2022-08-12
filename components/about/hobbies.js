import { Fragment } from 'react';
import JavaScript from '../icons/javascript';
import Php from '../icons/php';
import styles from './hobbies.module.css';

export default function Hobbies() {
    return (
      <Fragment>
          <div className={styles.container}>
              <section>
                  In my free time I like to expand my knowledge, and learn 📚 things, that
                  maybe will be useful in the future, or sometimes I learn things just for fun.
                  e.g. I know the cyrill alphabet &lt;&lt;Венгрия&gt;&gt;.
              </section>
              <section>
                  I code a lot, but mainly in the field of web development. For my project I mainly
                  used PHP (vanilla) <Php height={25} width={25} color='#474A8A' /> and
                  JavaScript (Next.js framework). <JavaScript height={20} width={20} color='#F0DB4F' />
              </section>
              <section>
                  In the future I would like to try out myself in the field of robotics 🤖
                  and create my own self sustaining garden. 🌱
              </section>
              <section>
                  Just to be boring, I also like to watch Netflix in my free time, and my favourite shows are
                  mostly sci-fi movies, and comedies. Personally I think that the best serial it had, was the
                  Star Trek: Discovery. Unfortunately they have removed it.
              </section>
          </div>
      </Fragment>
    );
}
