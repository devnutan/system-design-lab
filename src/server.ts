import express from 'express';

const app = express();
app.use(express.json());
const PORT = 3000;

type Order = {
  id: number;
  item: string;
  quantity: number;
  status: 'created' | 'shipped' | 'delivered';
};

const orders: Order[] = [
  {
    id: 1,
    item: 'Laptop',
    quantity: 1,
    status: 'created',
  },
  {
    id: 2,
    item: 'Keyboard',
    quantity: 2,
    status: 'shipped',
  },
];

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Order Management API is running',
  });
});

app.get('/orders', (_req, res) => {
  res.status(200).json(orders);
});

app.get('/orders/:id', (req, res) => {
  const orderId = Number(req.params.id);

  if (!Number.isSafeInteger(orderId) || orderId <= 0) {
    res.status(400).json({
      error: 'Invalid order ID. Must be a positive integer.',
    });
    return;
  }

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    res.status(404).json({
      error: 'Order not found',
    });
    return;
  }

  res.status(200).json(order);
});

app.post('/orders', (req, res) => {
  const { item, quantity } = req.body ?? {};

  if (
    typeof item !== 'string' ||
    item.trim().length === 0 ||
    !Number.isSafeInteger(quantity) ||
    quantity <= 0
  ) {
    res.status(400).json({
      error: 'Valid item and positive integer quantity are required',
    });
    return;
  }

  const nextId = Math.max(0, ...orders.map((o) => o.id)) + 1;

  const newOrder: Order = {
    id: nextId,
    item: item.trim(),
    quantity,
    status: 'created',
  };

  orders.push(newOrder);

  res.status(201).location(`/orders/${newOrder.id}`).json(newOrder);
});


app.put('/orders/:id', (req, res) => {
  const orderId = Number(req.params.id);

  if (!Number.isSafeInteger(orderId) || orderId <= 0) {
    res.status(400).json({
      error: 'Invalid order ID. Must be a positive integer.',
    });
    return;
  }

  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) {
    res.status(404).json({
      error: 'Order not found',
    });
    return;
  }

  const { item, quantity, status } = req.body ?? {};

  if (
    typeof item !== 'string' ||
    item.trim().length === 0 ||
    !Number.isSafeInteger(quantity) ||
    quantity <= 0 ||
    !['created', 'shipped', 'delivered'].includes(status)
  ) {
    res.status(400).json({
      error: 'Valid item, quantity, and status are required',
    });
    return;
  }

  const updatedOrder: Order = {
    id: orderId,
    item: item.trim(),
    quantity,
    status,
  };

  orders[orderIndex] = updatedOrder;

  res.status(200).json(updatedOrder);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
