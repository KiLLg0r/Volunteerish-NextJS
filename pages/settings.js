import Link from "next/link";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme, Link as NextUILink, Text, Row } from "@nextui-org/react";

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
        />
      </Row>
      <Text size={24}>
        <Link href="/">
          <NextUILink color="error">Go back to home</NextUILink>
        </Link>
      </Text>
    </div>
  );
}
