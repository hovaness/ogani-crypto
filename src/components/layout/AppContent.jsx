import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { PortfolioChart } from "../content/PortfolioChart";
import { AssetsTable } from "../content/AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();
  const cryptoPriceMap = crypto.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc;
  }, {});
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, val) => (acc += val), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart/>
      <AssetsTable/>
    </Layout.Content>
  );
}
