import React from 'react';
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import de from 'dayjs/locale/de';
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from 'classnames';

import {MessageStatus as Status} from 'types';
import faker from '@faker-js/faker';

export interface MessageProps {
    sender: string;
    receiver: string;
    timeDate: Date;
    message: string;
    status: Status;
    assignments?: String[];
}


dayjs.locale(de);
dayjs.extend(LocalizedFormat)

dayjs.extend(relativeTime);

function Message({sender,receiver,message,timeDate,status,assignments}:MessageProps) {

    let messageClassNames = classNames({
        message: true,
        'mb-2': true,
        'is-info': status === Status.Important,
        'is-warning': status === Status.New,
        'is-danger': status === Status.Important,
        'is-dark': status === Status.Triaged,
    });

    let assigmentsClassNames = classNames({
        column: true,
        'is-1': true,
        'is-hidden': !assignments || assignments.length === 0
    })
    return (
        <div className={messageClassNames}>
            <div className="message-body">
                <div className="columns">
                    <div className="column is-2">
                        <nav className="level is-block">
                            <div className="level-item has-text-centered">
                                <div className="mb-2">
                                <p className="heading is-size-7" >Sender</p>
                                <p className="subtitle is-size-7">{sender}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div className="mb-2">
                                <p className="heading is-size-7">Emfänger</p>
                                <p className="subtitle is-size-7">{receiver}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div className="mb-2">
                                <p className="heading is-size-7">Zeit</p>
                                <p className="subtitle is-size-7">{dayjs(timeDate).format("LLL")}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div className="">
                                <p className="heading is-size-7">Status</p>
                                <p className="subtitle is-size-7">{status.toString()}</p>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="column">
                        <div className="content has-text-weight-light has-text-dark has-text-left">
                            {message}
                        </div>
                    </div>
                    <div className={assigmentsClassNames}>
                        <div className="field is-grouped is-grouped-multiline">
                            <div className="tags">
                                { assignments && assignments.map( a => {return <span key={faker.datatype.number(10000)} className="tag is-grey is-light is-small">{a}</span> })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
