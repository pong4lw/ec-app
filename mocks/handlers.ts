/* eslint-disable @typescript-eslint/no-explicit-any */
// mocks/handlers.ts
import { http } from 'msw';

export const handlers = [
  // 商品一覧取得API
  http.get('/api/products', () => {
    return (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 'p1', name: 'テスト商品', price: 2000, imageUrl: '', description: 'テスト説明' },
          { id: 'p2', name: 'サンプルTシャツ', price: 2900, imageUrl: '', description: 'サンプル説明' },
        ])
      );
    };
  }),

  // 商品詳細取得API
  http.get('/api/products/:id', () => {
    return (req, res, ctx) => {
      const { id } = req.params;
      return res(
        ctx.status(200),
        ctx.json({
          id,
          name: 'テスト商品',
          price: 2000,
          imageUrl: '',
          description: 'テスト詳細',
        })
      );
    };
  }),
];
