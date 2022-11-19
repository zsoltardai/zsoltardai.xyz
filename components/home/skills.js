import React, {Fragment} from 'react';
import {default as ReactIcon} from "../icons/react";
import JavaScript from "../icons/javascript";
import Css from "../icons/css";
import NodeJs from "../icons/node-js";
import Card from '../ui/card';
import {Text} from '../ui';
import styles from './skills.module.css';

export default function Skills() {
    return (
        <Fragment>
            <Card>
                <div className={styles.container}>
                    <div className={styles.badge}>
                        <NodeJs color='#215732' size={26} marginBottom={10} />
                        <Text variant="name-text">Node.js</Text>
                    </div>
                    <div className={styles.badge}>
                        <ReactIcon color='#61DBFB' size={26} marginBottom={10} />
                        <Text variant="name-text">React</Text>
                    </div>
                    <div className={styles.badge}>
                        <JavaScript color='#F0DB4F' size={26} marginBottom={10} />
                        <Text variant="name-text">JavaScript</Text>
                    </div>
                    <div className={styles.badge}>
                        <Css color='#264de4' size={26} marginBottom={10} />
                        <Text variant="name-text">CSS</Text>
                    </div>
                </div>
            </Card>
        </Fragment>
    );
}
