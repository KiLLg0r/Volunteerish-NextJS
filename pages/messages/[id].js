import { useRouter } from "next/router";
import { Container, Button, Image, Input, Row, Col } from "@nextui-org/react";
import { BsChevronLeft, BsFillArrowDownCircleFill } from "react-icons/bs";
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
  updateDoc,
} from "firebase/firestore";
import { useWindowSize } from "../../utilities/hooks";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { BiSend } from "react-icons/bi";
import { useOnScreen } from "../../utilities/hooks";

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
  const isBottom = useOnScreen(anchorRef);

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

    const ID = !id && !router.query?.name && !router.query?.uid && !router.query.imgURL ? router.query.id : id;
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
    } else {
      const newName = router.query.name;
      const newIMG = decodeURI(router.query.imgURL);
      setName(newName);
      setImage(newIMG);
      setUid(router.query.uid);
    }
  }, [currentUser.uid, id, router.query]);

  useEffect(() => {
    if (messages && isBottom) anchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isBottom, messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const sendingMessage = message;
    const timestamp = serverTimestamp();
    setMessage("");
    const ID = !id && !router.query?.name && !router.query?.uid && !router.query.imgURL ? router.query.id : id;
    if (ID) {
      const conversationDoc = doc(db, "conversations", ID);
      const collectionRef = collection(conversationDoc, "messages");
      await addDoc(collectionRef, {
        created: timestamp,
        message: sendingMessage,
        receivedBy: uid,
        sentBy: currentUser.uid,
      });
      await updateDoc(conversationDoc, {
        lastMessage: sendingMessage,
        lastMessageCreated: timestamp,
      });
    } else {
      const conversationRef = await addDoc(collection(db, "conversations"), {
        img1: currentUser.photoURL,
        img2: image,
        lastMessage: sendingMessage,
        lastMessageCreated: timestamp,
        name1: currentUser.displayName,
        name2: name,
        uid1: currentUser.uid,
        uid2: uid,
      });

      await addDoc(collection(conversationRef, "messages"), {
        created: timestamp,
        message: sendingMessage,
        receivedBy: uid,
        sentBy: currentUser.uid,
      });

      router.push(`/messages/${conversationRef.id}`);
    }

    anchorRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container className={styles.messagesBody}>
      <Row align="center" gap={1} className={styles.messageHeader}>
        {(size.width < 960 || router.query.id) && (
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
      <Row
        css={{
          height: router.query.id ? "calc(100vh - 11.5rem)" : "calc(100vh - 15rem)",
        }}
        className={styles.messagesList}
      >
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

      {!isBottom && (
        <BsFillArrowDownCircleFill
          onClick={() => anchorRef.current.scrollIntoView({ behavior: "smooth" })}
          className={styles.scrollDown}
        />
      )}
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
