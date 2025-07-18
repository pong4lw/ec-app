/* eslint-disable @typescript-eslint/no-explicit-any */
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // 商品一覧取得API
  http.get('/api/products', async () => {
    return HttpResponse.json([
      { id: 'p1', name: 'テスト商品', price: 2000, imageUrl: '', description: 'テスト説明' },
      { id: 'p2', name: 'サンプルTシャツ', price: 2900, imageUrl: '', description: 'サンプル説明' },
    ]);
  }),

  // 商品詳細取得API
  http.get('/api/products/:id', async ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      name: 'テスト商品詳細',
      price: 2000,
      imageUrl: '',
      description: 'テスト説明詳細',
    });
  }),
];
