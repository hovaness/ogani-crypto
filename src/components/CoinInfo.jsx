import { Flex, Typography, Tag, Divider } from "antd";
import { RedditCircleFilled, TwitterCircleFilled } from "@ant-design/icons";
import { CoinTitle } from "./CoinTitle";

export function CoinInfo({ coin }) {
  return (
    <>
      <CoinTitle coin={coin} withSymbol/>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}%
        </Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price Btc: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Adresses: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
      <Typography.Paragraph style={{ alignItems: "center" }}>
        <RedditCircleFilled style={{ fontSize: 18, color: "#FF4500" }} />
        <Typography.Text strong> Reddit url: </Typography.Text>
        <a href={coin.redditUrl}>{coin.redditUrl}</a>
      </Typography.Paragraph>
      <Typography.Paragraph style={{ alignItems: "center" }}>
        <TwitterCircleFilled style={{ fontSize: 18, color: "#1D9BF0" }} />
        <Typography.Text strong> Twitter url: </Typography.Text>
        <a href={coin.twitterUrl}>{coin.twitterUrl}</a>
      </Typography.Paragraph>
    </>
  );
}
