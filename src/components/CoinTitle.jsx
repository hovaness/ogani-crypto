import { Flex, Typography, Divider } from "antd";

export function CoinTitle({ coin, withSymbol }) {
  return (
    <>
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.id}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {withSymbol && <span>({coin.symbol})</span>} {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
    </>
  );
}
