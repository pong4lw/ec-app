/* eslint-disable @typescript-eslint/no-explicit-any */
// mocks/handlers.ts
import { http } from 'msw';

export const handlers = [
  http.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 'p1', name: 'テスト商品', price: 2000, imageUrl: '', description: 'テスト説明' },
        { id: 'p2', name: 'サンプルTシャツ', price: 2900, imageUrl: '', description: 'サンプル説明' },
      ])
    );
  }),

  http.get('/api/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        name: 'テスト商品詳細',
        price: 2000,
        imageUrl: '',
        description: 'テスト説明詳細',
      })
    );
  }),
];