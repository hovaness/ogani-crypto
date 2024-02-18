import { Table } from "antd";
import { useCrypto } from "../../context/crypto-context";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }))


  return (
    <>
      <Table
        //style={{display:'flex', marginBottom:'1rem', justifyContent:'center'}}
        pagination={false}
        columns={columns}
        dataSource={data}
      />
    </>
  );
}
