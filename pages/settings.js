import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme, Text, Row } from "@nextui-org/react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

export default function Home() {
  const { setTheme } = useNextTheme();
  const { isDark, type, theme } = useTheme();

  return (
    <div>
      <h1 style={{ color: theme.colors.red500.value }}>Change theme</h1>
      <Row align="center" gap={1}>
        <Text size={18}>
          The current theme is: <span style={{ color: theme.colors.cyan700.value }}>{type}</span>
        </Text>
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
    </div>
  );
}
