import nookies from "nookies";
import { Grid, Col, Row, Image, Modal, Button } from "@nextui-org/react";
import { withProtected, withNavigation } from "../../utilities/routes";
import { firebaseAdmin } from "../../config/firebaseAdmin";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { useWindowSize } from "../../utilities/hooks";
import { BsPlusCircleFill } from "react-icons/bs";
import MessagesBody from "./[id]";

import styles from "../styles/Messages.module.scss";

const Conversation = ({ imgURL, name, lastMessage, lastMessageSent, id }) => {
  const size = useWindowSize();

  const processesTheDay = (day) => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  };

  const showDate = () => {
    const date = new Date(lastMessageSent._seconds * 1000);
    const now = new Date();

    const hourInMS = 60 * 60 * 1000;

    const [minutes, hour, dayName, day, month, year] = [
      date.getMinutes(),
      date.getHours(),
      processesTheDay(date.getDay()),
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    ];

    const msBetweenDates = Math.abs(date.getTime() - now.getTime());
    const hoursBetweenDates = msBetweenDates / hourInMS;

    if (hoursBetweenDates < 24) return `${hour}:${minutes}`;
    else if (hoursBetweenDates > 24 && hoursBetweenDates < 48) return "Yesterday";
    else if (hoursBetweenDates > 48 && hoursBetweenDates < 168) return `${dayName}`;
    else return `${day}.${month < 10 ? "0" + month : month}.${year}`;
  };

  const LinkToMessages = ({ children, id }) => {
    return (
      <Link href={`/messages/${id}`}>
        <a style={{ width: "100%" }}>{children}</a>
      </Link>
    );
  };

  const ConversationBody = () => {
    return (
      <Grid.Container css={{ background: "$backgroundSecondary", padding: "0.5rem", borderRadius: "0.875rem" }}>
        <Grid xs={2.5} sm={2}>
          <Image
            alt="User image"
            height={64}
            width={64}
            src={imgURL}
            objectFit="cover"
            showSkeleton
            maxDelay={5000}
            css={{ borderRadius: "0.657rem" }}
          />
        </Grid>
        <Grid xs={8.5} sm={10}>
          <Col span={10} css={{ height: "100%", width: "100%", padding: "0.5rem" }}>
            <Row>{name}</Row>
            <Row>
              <Col span={9} css={{ overflow: "hidden" }}>
                {lastMessage}
              </Col>
              <Col span={3} css={{ textAlign: "right" }}>
                {showDate()}
              </Col>
            </Row>
          </Col>
        </Grid>
      </Grid.Container>
    );
  };

  if (size.width < 960)
    return (
      <LinkToMessages id={id}>
        <ConversationBody />
      </LinkToMessages>
    );
  return <ConversationBody />;
};

const Messages = ({ initialConversations }) => {
  const conversations = JSON.parse(initialConversations);
  const [conversationID, setConversationID] = useState("");
  const [sendNewMessageModal, setSendNewMessageModal] = useState(false);
  const { currentUser } = useAuth();

  const size = useWindowSize();

  return (
    <section className={styles.messages}>
      <Grid.Container gap={size.width > 650 && 1} css={{ height: "calc(100vh - 5rem)" }}>
        <Grid xs={12} sm={4}>
          <Col css={{ position: "relative" }}>
            <Row xs={12}>
              <h2 className={styles.title}>Messages</h2>
            </Row>
            <Col className={styles.conversationsList}>
              {conversations &&
                conversations.map((conversation) => {
                  return (
                    <Row
                      key={conversation.id}
                      onClick={() => setConversationID(conversation.id)}
                      className={styles.conversationItem}
                    >
                      <Conversation
                        imgURL={
                          conversation.data.uid1 === currentUser.uid ? conversation.data.img2 : conversation.data.img1
                        }
                        name={
                          conversation.data.uid1 === currentUser.uid ? conversation.data.name2 : conversation.data.name1
                        }
                        lastMessage={conversation.data.lastMessage}
                        lastMessageSent={conversation.data.lastMessageCreated}
                        id={conversation.id}
                      />
                    </Row>
                  );
                })}
            </Col>
            <div className={styles.sendNewMessage} onClick={() => setSendNewMessageModal(true)}>
              <BsPlusCircleFill />
            </div>
          </Col>
        </Grid>
        <Grid xs={0} sm={8}>
          {conversationID && <MessagesBody id={conversationID} />}
        </Grid>
      </Grid.Container>
      <Modal
        closeButton
        aria-labelledby="Send new message"
        open={sendNewMessageModal}
        onClose={() => setSendNewMessageModal(false)}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3 style={{ color: "var(--nextui-colors-red500)" }}>Send new message</h3>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ textAlign: "center" }}>{""}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1}>
            <Grid xs>
              <Button auto color="error" onPress={() => setSendNewMessageModal(false)} css={{ width: "100%" }}>
                Close
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default withProtected(withNavigation(Messages));

const getConversations = async (uid) => {
  const db = firebaseAdmin.firestore();
  const conversationsRef = db.collection("conversations");

  const person1ConversationsRef = conversationsRef.where("uid1", "==", uid).orderBy("lastMessageCreated", "desc").get();
  const person2ConversationsRef = conversationsRef.where("uid2", "==", uid).orderBy("lastMessageCreated", "desc").get();

  const [person1Snapshot, person2Snapshot] = await Promise.all([person1ConversationsRef, person2ConversationsRef]);

  const person1Conversations = person1Snapshot.docs;
  const person2Conversations = person2Snapshot.docs;

  const conversations = person1Conversations.concat(person2Conversations);

  return conversations;
};

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = user;

    let rawConversations = [];

    await getConversations(uid)
      .then((result) =>
        result.forEach((conversation) => {
          rawConversations.push({
            id: conversation.id,
            data: conversation.data(),
          });
          console.log(rawConversations);
        }),
      )
      .catch((error) => console.log(error));

    const initialConversations = JSON.stringify(rawConversations);

    return {
      props: { initialConversations },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
