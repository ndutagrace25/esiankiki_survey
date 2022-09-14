import { useHistory } from "react-router-dom";

import { ReactComponent as DetailIcon } from "assets/arrow-up.svg";
import { ReactComponent as DownloadIcon } from "assets/download.svg";
import { IconStyled } from "shared-ui/Input";

const OrderDetailsNavigation = () => {
  const history = useHistory();
  const navigate = () => history.push("/order-details");
  return (
    <div style={{ cursor: "pointer" }} onClick={navigate}>
      <IconStyled>
        <DetailIcon />
      </IconStyled>
    </div>
  );
};

const VendorDetailsNavigation = () => {
  const history = useHistory();
  const navigate = () => history.push("/vendor-details");
  return (
    <div style={{ cursor: "pointer" }} onClick={navigate}>
      <IconStyled>
        <DetailIcon />
      </IconStyled>
    </div>
  );
};

const VendorTransactionNavigation = () => {
  const history = useHistory();
  const navigate = () => history.push("/vendor-transaction");
  return (
    <div style={{ cursor: "pointer" }} onClick={navigate}>
      <IconStyled>
        <DetailIcon />
      </IconStyled>
    </div>
  );
};

const CustomerDetailsNavigation = () => {
  const history = useHistory();
  const navigate = () => history.push("/customer-details");
  return (
    <div style={{ cursor: "pointer" }} onClick={navigate}>
      <IconStyled>
        <DetailIcon />
      </IconStyled>
    </div>
  );
};

const CustomerOrderNavigation = () => {
  const history = useHistory();
  const navigate = () => history.push("/order-details");
  return (
    <div style={{ cursor: "pointer" }} onClick={navigate}>
      <IconStyled>
        <DetailIcon />
      </IconStyled>
    </div>
  );
};

const ReceiptDownload = () => {
  return (
    <div style={{ cursor: "pointer" }}>
      <IconStyled>
        <DownloadIcon />
      </IconStyled>
    </div>
  );
};

const order = {
  id: 270,
  date: "12/05/2021 12:04:00",
  name: "Said Henzano",
  status: "In Progress",
  sub_total: 140,
  discount: 14,
  total: 126,
  elapsed_time: "00:05:00",
};

const vendor = {
  name: "Water Kiosk Tudor",
  location: "Kisauni",
  description: "Tudor Water Kiost is a water treatment economy p...",
  status: "Open",
  a_status: "Approved",
};

const wallet = {
  date: "01/06/2021",
  order: 61,
  total: 350,
  commission: 35,
};

const vendor_tran = {
  date: "12/09/2021",
  tId: "123456788",
  tType: "Credit",
  order: 123,
  amount: 135,
  subtotal: 150,
  discount: 0,
  d_fee: 0,
  commission: 15,
  wallet: 630,
};

const customer = {
  name: "Olive Yew",
  phone: "+25412345678",
  email: "oliveyewe@gmail.com",
  location: "Mtwapa Luxury Apartments",
  order: 100,
};

const customerOrder = {
  order: 123,
  date: "12/08/2021",
  total: 300,
  status: "Completed",
  address: "Mtwapa Luxury Apartments",
};

const customerOrder_columns = [
  {
    Header: "Order #",
    accessor: "order",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Order Total",
    accessor: "total",
  },
  {
    Header: "Order Status",
    accessor: "status",
  },
  {
    Header: "Delivery Address",
    accessor: "address",
  },
  {
    Header: "Download",
    accessor: (props) => <ReceiptDownload />,
  },
  {
    Header: "Details",
    accessor: (props) => <CustomerOrderNavigation />,
  },
];

const customer_columns = [
  {
    Header: "Full Name",
    accessor: "name",
  },
  {
    Header: "Phone Number",
    accessor: "phone",
  },
  {
    Header: "Email Address",
    accessor: "email",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Total # of Orders",
    accessor: "order",
  },
  {
    Header: "Details",
    accessor: (props) => <CustomerDetailsNavigation />,
  },
];

const vendor_tran_columns = [
  {
    Header: "Date (d/m/y)",
    accessor: "date",
  },
  {
    Header: "Transaction id",
    accessor: "tId",
  },
  {
    Header: "Transaction Type",
    accessor: "tType",
  },
  {
    Header: "Order #",
    accessor: "order",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Subtotal",
    accessor: "subtotal",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Delivery Fee",
    accessor: "d_fee",
  },
  {
    Header: "Comission",
    accessor: "commission",
  },
  {
    Header: "Wallet Balance",
    accessor: "wallet",
  },
];

const w_columns = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Order #",
    accessor: "order",
  },
  {
    Header: "Order Total",
    accessor: "total",
  },
  {
    Header: "Commission",
    accessor: "commission",
  },
  {
    Header: "Details",
    accessor: (props) => <VendorTransactionNavigation />,
  },
];

const v_columns = [
  {
    Header: "Vendor Name",
    accessor: "name",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Approval Status",
    accessor: "a_status",
  },
  {
    Header: "Details",
    accessor: (props) => <VendorDetailsNavigation />,
  },
];

const columns = [
  {
    Header: "Order #",
    accessor: "id",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Customer Name",
    accessor: "name",
  },
  {
    Header: "Order Status",
    accessor: "status",
  },
  {
    Header: "Sub Total",
    accessor: "sub_total",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Total",
    accessor: "total",
  },
  {
    Header: "Elapsed time",
    accessor: "elapsed_time",
  },
  {
    Header: "Details",
    accessor: (props) => <OrderDetailsNavigation />,
  },
];

const orders = Array(15).fill(order);
const vendors = Array(15).fill(vendor);
const wallets = Array(10).fill(wallet);
const vendor_trans = Array(15).fill(vendor_tran);
const customers = Array(15).fill(customer);
const customerOrders = Array(15).fill(customerOrder);

const tableUtil = {
  orders,
  columns,
  vendors,
  v_columns,
  wallets,
  w_columns,
  vendor_trans,
  vendor_tran_columns,
  customers,
  customer_columns,
  customerOrder_columns,
  customerOrders,
};
export default tableUtil;
