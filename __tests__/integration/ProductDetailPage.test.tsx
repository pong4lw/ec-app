import { render, screen, waitFor } from '@testing-library/react';
import ProductDetailPage from '@/app/products/[id]/page'; // pathは環境に応じて変更
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// APIモック用のハンドラー（getProductByIdを置き換える代わり）
const server = setupServer(
  rest.get('/api/products/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'p1',
        name: 'モック商品',
        price: 3000,
        imageUrl: 'https://example.com/mock.png',
        description: 'モックの説明文',
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('商品詳細ページが正しくレンダリングされる', async () => {
  render(<ProductDetailPage params={{ id: 'p1' }} />);

  await waitFor(() => {
    expect(screen.getByText('モック商品')).toBeInTheDocument();
  });

  expect(screen.getByText('¥3,000')).toBeInTheDocument();
  expect(screen.getByText('モックの説明文')).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/mock.png');
});
