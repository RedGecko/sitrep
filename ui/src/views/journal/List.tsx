import { memo, useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { faArrowsToEye, faBell, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Spinner } from "components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Message, MessageListData, MessageListVars, PriorityStatus, TriageStatus } from "types";
import { GetJournalMessages } from "./graphql";
import { default as JournalMessage } from "./Message";
import MessageTable from "./Table";

function List(props: {
  showControls: boolean;
  autoScroll?: boolean;
  setEditorMessage?: (message: Message | undefined) => void;
  setTriageMessage?: (message: Message | undefined) => void;
}) {
  const { t } = useTranslation();
  const { journalId } = useParams();
  const [triageFilter, setTriageFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assignmentFilter, setAssignmentFilter] = useState("all");
  const { autoScroll = false } = props;

  const { loading, error, data } = useQuery<MessageListData, MessageListVars>(GetJournalMessages, {
    variables: { journalId: journalId || "" },
    pollInterval: 10000,
  });

  // on new messages scale to top
  useEffect(() => {
    if (autoScroll) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [data?.messages, error, autoScroll]);

  if (error) {
    return (
      <div className="notification is-danger is-light">
        <div className="block has-text-weight-semibold">Ups, da ging was schief:</div>
        <div className="block">{error.message}</div>
      </div>
    );
  }

  if (loading) return <Spinner />;
  const divisions = data?.journalsByPk.incident.divisions.flat() || [];

  const messages =
    data?.messages
      .filter((message) => triageFilter === "all" || message.triageId === triageFilter)
      .filter((message) => priorityFilter === "all" || message.priorityId === priorityFilter)
      .filter(
        (message) => assignmentFilter === "all" || message.divisions?.find((d) => d.division.name === assignmentFilter),
      ) || [];

  return (
    <div>
      <div className="is-print">
        {props.showControls ? (
          <></>
        ) : (
          <MessageTable
            messages={messages}
            triageFilter={triageFilter}
            priorityFilter={priorityFilter}
            assignmentFilter={assignmentFilter}
          />
        )}
      </div>
      <div className="is-hidden-print">
        <h3 className="title is-3 is-capitalized">{t("journal")}</h3>

        <div className="columns">
          <div className="column is-narrow">
            <div className="control has-icons-left">
              <div className="select is-small is-rounded">
                <select
                  value={triageFilter}
                  onChange={(e) => {
                    e.preventDefault();
                    setTriageFilter(e.target.value);
                  }}
                >
                  <option label={t("all") as string}>all</option>
                  {Object.values(TriageStatus).map((status: TriageStatus) => (
                    <option key={status} label={t([`triage.${status}`, `triage.${TriageStatus.Pending}`]) as string}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="icon is-small is-left">
                <FontAwesomeIcon icon={faArrowsToEye} />
              </div>
            </div>
          </div>
          <div className="column is-narrow">
            <div className="control has-icons-left">
              <div className="select is-small is-rounded">
                <select
                  value={priorityFilter}
                  onChange={(e) => {
                    e.preventDefault();
                    setPriorityFilter(e.target.value);
                  }}
                >
                  <option label={t("all") as string}>all</option>
                  {Object.values(PriorityStatus).map((prio: PriorityStatus) => (
                    <option key={prio} label={t([`priority.${prio}`, `priority.${PriorityStatus.Normal}`]) as string}>
                      {prio}
                    </option>
                  ))}
                </select>
              </div>
              <div className="icon is-small is-left">
                <FontAwesomeIcon icon={faBell} />
              </div>
            </div>
          </div>
          <div className="column is-narrow">
            <div className="control has-icons-left">
              <div className="select is-small is-rounded">
                <select
                  value={assignmentFilter}
                  onChange={(e) => {
                    e.preventDefault();
                    setAssignmentFilter(e.target.value);
                  }}
                >
                  <option label={t("all") as string}>all</option>
                  {divisions.map((element) => (
                    <option key={element.id} value={element.name}>
                      {element.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="icon is-small is-left">
                <FontAwesomeIcon icon={faUserGroup} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-multiline is-hidden-print mb-3">
        {data ? (
          <MemoMessages
            messages={messages}
            showControls={props.showControls}
            setTriageMessage={props.setTriageMessage}
            setEditorMessage={props.setEditorMessage}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const MemoMessages = memo(Messages);

function Messages(props: {
  showControls: boolean;
  setEditorMessage?: (message: Message | undefined) => void;
  setTriageMessage?: (message: Message | undefined) => void;
  messages: Message[];
}) {
  return (
    <>
      {props.messages.map((message) => {
        return (
          <div key={message.id} className="column is-full is-gapless">
            <JournalMessage
              key={message.id}
              id={message.id}
              assignments={message.divisions.map((d) => d.division.name)}
              triage={message.triageId}
              priority={message.priorityId}
              sender={message.sender}
              receiver={message.receiver}
              message={message.content}
              timeDate={new Date(message.time)}
              showControls={props.showControls}
              origMessage={message}
              setEditorMessage={props.setEditorMessage}
              setTriageMessage={props.setTriageMessage}
            />
          </div>
        );
      })}
    </>
  );
}

export default memo(List);
