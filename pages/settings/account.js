import { Button } from "@nextui-org/react";
import { withNavigation, withProtected } from "../../utilities/routes";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import styles from "../styles/Settings.module.scss";

export const Account = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const imageInputRef = useRef(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <section className={styles.account}>
      <form>
        {preview && <Image alt="preview" height={200} width={400} src={preview} />}
        <Button
          onPress={(e) => {
            imageInputRef.current.click();
          }}
        >
          Add image
        </Button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={imageInputRef}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.substring(0, 5) === "image") setImage(file);
            else setImage(null);
          }}
        />
      </form>
    </section>
  );
};

export default withProtected(withNavigation(Account));
