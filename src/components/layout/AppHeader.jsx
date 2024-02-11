import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import { CoinInfo } from "../CoinInfo";
import AddForm from "../AddForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleSelect(value) {
    setIsModalOpen(true);
    setCoin(crypto.find((c) => c.id == value));
  }

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => removeEventListener("keypress", keypress);
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{ alignItems: "center" }}>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.value}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button onClick={() => setIsDrawerOpen(true)} type="primary">
        Add asset
      </Button>
      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <CoinInfo coin={coin} />
      </Modal>

      <Drawer
        destroyOnClose
        width={600}
        title="Add asset"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <AddForm onClose={() => setIsDrawerOpen(false)}/>
      </Drawer>
    </Layout.Header>
  );
}
