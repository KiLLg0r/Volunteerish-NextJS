import { useRouter } from "next/router";
import { Container, Button, Image, Input, Row, Col } from "@nextui-org/react";
import { BsChevronLeft } from "react-icons/bs";
import { db } from "../../config/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useWindowSize } from "../../utilities/hooks";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { BiSend } from "react-icons/bi";

import styles from "../styles/Messages.module.scss";

const MessagesBody = ({ id }) => {
  const router = useRouter();
  const size = useWindowSize();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uid, setUid] = useState("");
  const [message, setMessage] = useState("");
  const anchorRef = useRef(null);

  useEffect(() => {
    const getConversationData = async (ID) => {
      const conversationDoc = doc(db, "conversations", ID);
      const conversationSnap = await getDoc(conversationDoc);

      if (conversationSnap.exists()) {
        const data = conversationSnap.data();
        if (currentUser.uid === data.uid1) {
          setName(data.name2);
          setImage(data.img2);
          setUid(data.uid2);
        } else {
          setName(data.name1);
          setUid(data.uid1);
          setImage(data.img1);
        }
      }
    };

    const ID = !id ? router.query.id : id;
    if (ID) {
      getConversationData(ID);
      const conversationDoc = doc(db, "conversations", ID);
      const q = query(collection(conversationDoc, "messages"), orderBy("created"), limit(100));
      const unsubscribe = onSnapshot(q, (snapShot) => {
        const snapShotMessages = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages(snapShotMessages);
      });

      return unsubscribe;
    }
  }, [currentUser.uid, id, router.query.id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const sendingMessage = message;
    setMessage("");
    const ID = !id ? router.query.id : id;
    if (ID) {
      const conversationDoc = doc(db, "conversations", ID);
      const collectionRef = collection(conversationDoc, "messages");
      const messageRef = await addDoc(collectionRef, {
        created: serverTimestamp(),
        message: sendingMessage,
        receivedBy: uid,
        sentBy: currentUser.uid,
      });
    }

    anchorRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container className={styles.messagesBody}>
      <Row align="center" gap={1} className={styles.messageHeader}>
        {size.width < 960 && (
          <Col span={2}>
            <BsChevronLeft onClick={() => router.back()} />
          </Col>
        )}
        <Col span={size.width < 650 ? 4 : 1.5}>
          <Image
            alt="User image"
            height={64}
            width={64}
            src={image}
            objectFit="cover"
            showSkeleton
            maxDelay={5000}
            css={{ borderRadius: "0.657rem" }}
          />
        </Col>
        <Col>{name}</Col>
      </Row>
      <Row className={styles.messagesList}>
        <Col>
          {messages &&
            messages.map((message) => {
              return (
                <Row
                  className={styles.message}
                  key={message.id}
                  justify={message.sentBy === currentUser.uid && "flex-end"}
                >
                  <div
                    key={message.id}
                    className={message.sentBy === currentUser.uid ? styles.sentBy : styles.receivedBy}
                  >
                    {message.message}
                  </div>
                </Row>
              );
            })}
          <div ref={anchorRef}></div>
        </Col>
      </Row>

      <Row>
        <form style={{ width: "100%" }} onSubmit={sendMessage}>
          <Input
            contentRight={
              message.length > 0 && (
                <Button light auto css={{ padding: "0" }} onPress={sendMessage}>
                  <BiSend />
                </Button>
              )
            }
            className={styles.sendMessage}
            fullWidth
            placeholder="Write a message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            aria-label="Input field for message"
          />
        </form>
      </Row>
    </Container>
  );
};

export default MessagesBody;
