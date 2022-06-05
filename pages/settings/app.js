import { withProtected } from "../../utilities/routes";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme, Switch, Spacer, Row } from "@nextui-org/react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

const App = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <>
      <Row align="center" gap={1}>
        <span>Dark mode: </span>
        <Spacer x={0.5} />
        <Switch
          checked={isDark}
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light");
          }}
          color="error"
          iconOn={<BsMoonFill />}
          iconOff={<BsFillSunFill />}
        />
      </Row>
    </>
  );
};

export default withProtected(App);
