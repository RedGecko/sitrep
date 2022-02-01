import React, { useContext, useState } from 'react';

import {JournalMessage} from 'components';
import {MessageStatus as Status} from 'types';

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from 'classnames';

import {IncidentContext,JournalContext} from 'contexts';

// FIXME(daa): remove
import faker from "faker/locale/de";
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const getRandomStatus = () => { return _.sample(Object.values(Status)) as Status }

// FIXME(daa): remove
const ASSIGNMENTS = ["Pol", "Lage", "San", "FW", "Tech"]


function Editor() {
    let status = Status.New;
    let sender = "foobar";
    let receiver = "foobarbaz";
    let message = "adsfasd fasdf asdf asdfsf"
    let timeDate = new Date();

    let dayTime = dayjs(timeDate).subtract(4, "minutes");
   
    let messageClassNames = classNames({
        message: true,
        'is-warning': status == Status.New,
        // 'is-danger': status == Status.Important,
        // 'is-dark': status == Status.Triaged,
    });


    return (
        <div>
            <div className="columns">
                <div className="column is-half">
                    <h3 className="title is-3">Editor</h3>
                    <InputBox />
                </div>
                <div className="column">
                    <h3 className="title is-3">Journal</h3>
                    { _.times(faker.random.number(20), () => 
                            { 
                                return <JournalMessage assignments={ASSIGNMENTS.slice(0,faker.random.number(ASSIGNMENTS.length))} status={getRandomStatus()} sender={faker.name.findName()} receiver={faker.name.findName()} message={faker.lorem.paragraphs(2)}  timeDate={faker.date.recent(1)}/>
                            }
                        )
                    }
                </div> 
            </div>
        </div>
    );
}

enum Medium {
    Radio = "Funk",
    Phone = "Telefon",
    Email = "E-Mail",
};

interface IPropsInputBox {
    initialMedium?: Medium
}

function InputBox() {
    const incident = useContext(IncidentContext);
    const journal = useContext(JournalContext);

    const [medium, setMedium] = useState(Medium.Radio)

    const renderFormContent = () => {
        if (medium == Medium.Radio ) {
            return <RadioInput />
        }
        if (medium == Medium.Phone ) {
            return <PhoneInput />
        }
        if (medium == Medium.Email ) {
            return <EmailInput />
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        let selectMedium = e.currentTarget.value;
        if (selectMedium === Medium.Radio || selectMedium === Medium.Email || selectMedium === Medium.Phone) {
            setMedium(selectMedium);
        }
    }

    return (
        <div className="box" >
            <Link className="delete is-pulled-right is-small mb-2" to={"/incident/" + incident + "/journal/"+ journal } />
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Medium</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                            <div className="select is-fullwidth">
                            <select value={medium} onChange={handleChange}>
                                {Object.values(Medium).map( (medium: Medium) => (<option key={medium}>{medium}</option>))}
                            </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { renderFormContent() } 
        </div>
    );
}

function PhoneInput() {
    return (
        <>
            <p>Phone Form</p>
        </>
    )
}

function EmailInput() {
    return (
        <>
            <p>Email Input</p>
        </>
    )
}

function RadioInput() {
    return (
        <>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Empfänger</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder="Name" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Sender</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder="Name" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Zeit</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder="Zeit" />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Nachricht</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        <textarea className="textarea" placeholder="Was wurde übermittelt?" rows={10} />
                    </div>
                </div>
            </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Status</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                    <div className="control">
                        <div className="select is-fullwidth">
                        <select>
                            <option>{Status.New}</option>
                            <option>{Status.Triaged}</option>
                            <option>{Status.Important}</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Fachbereiche</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                    <div className="control">
                        <div className="select is-multiple">
                        <select multiple size={3}>
                            {ASSIGNMENTS.map(a => {return <option>{a}</option>})}
                        </select>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
            <div className="field-label">
            </div>
            <div className="field-body">
                <div className="field">
                <div className="control">
                    <button className="button is-primary">
                    Send message
                    </button>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Editor;