// mocks/handlers.ts
import { rest } from 'msw/node';

export const handlers = [
  // 商品一覧取得API
  rest.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 'p1', name: 'テスト商品', price: 2000, imageUrl: '', description: 'テスト説明' },
        { id: 'p2', name: 'サンプルTシャツ', price: 2900, imageUrl: '', description: 'サンプル説明' },
      ])
    );
  }),

  // 商品詳細取得API
  rest.get('/api/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({ id, name: 'テスト商品', price: 2000, imageUrl: '', description: 'テスト詳細' })
    );
  }),
];
