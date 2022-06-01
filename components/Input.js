import React from "react";
import styles from "./Input.module.scss";

function Input(props, ref) {
  return (
    <div className={styles.inputField}>
      <div className={styles.inputContent}>
        <div className={styles.inputLabel}>{props.name}</div>
        <input
          type={props.type}
          spellCheck="false"
          required
          ref={ref}
          defaultValue={props.value}
          readOnly={props.readOnly && true}
          onChange={() => {
            if (props.waitForChanges) props.changed(true);
          }}
        />
      </div>
    </div>
  );
}

const forwardedInput = React.forwardRef(Input);

export default forwardedInput;
