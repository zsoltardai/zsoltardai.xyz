import { Fragment } from 'react';
import React from "../icons/react";
import JavaScript from "../icons/javascript";
import Css from "../icons/css";
import NodeJs from "../icons/node-js";
import Card from '../ui/card';
import styles from './skills.module.css';

export default function Skills() {
    return (
        <Fragment>
            <Card>
                <div className={styles.container}>
                    <div className={styles.badge}>
                        <NodeJs color='#215732' />
                        <span>Node.js</span>
                    </div>
                    <div className={styles.badge}>
                        <React color='#61DBFB' />
                        <span>React</span>
                    </div>
                    <div className={styles.badge}>
                        <JavaScript color='#F0DB4F' />
                        <span>JavaScript</span>
                    </div>
                    <div className={styles.badge}>
                        <Css color='#264de4' />
                        <span>CSS</span>
                    </div>
                </div>
            </Card>
        </Fragment>
    );
}
