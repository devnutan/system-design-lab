import express from 'express';

const app = express();
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
